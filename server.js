import express, { json } from "express"
import cors from "cors"
import  morgan  from "morgan"
import {routerTrivia} from "./src/routes/routes.js"
import session from "express-session"
import ejs from "ejs"
import { fileURLToPath } from 'url';
import { dirname, join } from 'path'; 

const __filename = fileURLToPath(import.meta.url);


const rutaDirectorioActual = dirname(__filename);

const app = express()
const PORT = process.env.PORT || 3000
app.use(express.static(join(rutaDirectorioActual, "client")));
app.set("view engine", "ejs")
app.use(json())
app.use(session({
    secret: 'miSecreto',
    resave: false,
    saveUninitialized: false
}));
app.use(cors())
app.use(morgan("dev"))
app.use("/", routerTrivia)





app.listen(PORT, ()=>{
    console.log(`server running ${PORT}`);
})