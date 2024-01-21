import { Router } from "express";
import { Trivia } from "../controllers/trivia.js";
import bcrypt, { hash } from "bcrypt";
import {userSchema} from "../controllers/validation.js"
export const routerTrivia = Router();

routerTrivia.get("/question/", async (req, res) => {
    if (req.session.user) {
        const {id} = req.session.user
        const data = await Trivia.getQuestion({user: id});
        res.json(data);
    }else{
    res.render("login")
}
});

routerTrivia.get("/home/", async (req, res) => {
    if (!req.session.user) {
        res.render("login");
    }else{
        res.render("mainpage",{user:req.session.user})
    }
    
});

routerTrivia.get("/game/", async (req, res) => {
    if (req.session.user) {
        const {id} = req.session.user
        res.render("index", {user:req.session.user, points: await Trivia.getPoints({id})});
    }else{
    res.render("login")}
});

routerTrivia.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await Trivia.login({email});

        if (user) {
            const passwordHash = user.password;
            const compare = await bcrypt.compare(password, passwordHash);

            if (compare) {
                req.session.user = user;
                res.json({ success: true, message: "Inicio de sesión exitoso", user });
            } else {
                res.json({ success: false, message: "*Usuario o contraseña incorrectos" });
            }
        } else {
            res.json({ success: false, message: "*Usuario no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error en el servidor" });
    }
});


routerTrivia.post("/question/:idquestion", async (req, res) => {
    const { idquestion } = req.params;
    const { userresponse } = req.body;
    const {id} = req.session.user
    const data = await Trivia.getTrueQuestion({ iduser:id, userresponse, id: idquestion });
    res.json(data);
});
routerTrivia.get("/question/:idquestion", async (req, res) => {
    const { idquestion } = req.params;
    const data = await Trivia.getEspesificQuestion({ id: idquestion });
    res.json(data);
});

routerTrivia.get("/mainpage/", (req, res) => {
    if (req.session.user) {
        res.render("mainpage", {user:req.session.user})
    } else {
        res.render("login")
    }
});

routerTrivia.get("/mainpage/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Error al cerrar la sesión" });
        } else {
            res.redirect("/home");
        }
    });
});
routerTrivia.get("/mainpage/userpoints/", async(req, res) => {
    const{id}= req.session.user
    const data = await Trivia.getPoints({id})
    res.json(data)
});
routerTrivia.post("/updatepoints/", async(req, res) => {
    const {id} = req.session.user
    const {points} = req.body
    const data = await Trivia.updatePoints({id , points})
    res.json(data)
});

routerTrivia.get("/createuser", (req,res)=>{
    res.render("createuser")
})
routerTrivia.get("/mainpage/qualification", async(req,res)=>{
        const data = await Trivia.Qualification()
        res.json(data)
})
routerTrivia.post("/createuser", async(req, res) => {
    let datasend = {
        success : false,
        errors : []
    }
    let userexisted = false
    try {
        const { email, username, password } = req.body;
        const [isuserRegister] = await Trivia.getUser({email, username})
        const userData = userSchema.safeParse({ email, username, password });
        if (userData.success) {
            if (isuserRegister) {
                const {isusername, isemail} = isuserRegister 
                console.log(isuserRegister);  
                if (isemail !== "none") {
                    userexisted = true
                datasend.errors.push({
                        validation: "email",
                        message: "Correo electrónico en uso",
                        path: [
                           "email"
                        ]}) 
                }if ( isusername !== "none"){
                    userexisted = true
                    datasend.errors.push({
                            validation: "username",
                            message: "Nombre de usuario en uso",
                            path: [
                               "username"
                            ]})
                }
             }
             if (!userexisted) {
                const passwordHash = await bcrypt.hash(userData.data.password, 7);
            const insertUser = await Trivia.insertUser({
                email: userData.data.email,
                username: userData.data.username,
                password: passwordHash
            });

            res.json(insertUser);
             }else{
                res.json(datasend)
             }
        } else {
            res.json({ success: false, errors: userData.error.errors });
        }
    } catch (error) {
       console.log(error);
    }
});

