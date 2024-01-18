window.addEventListener("DOMContentLoaded", () => {
    const name = document.querySelectorAll("input")
   if (name) {
    name.forEach(input => {
        input.addEventListener("click", ()=>{
            let spanlogin = document.querySelector(".msg")
            if (spanlogin) {
                spanlogin.textContent=""
            }
           const parentNode = input.parentNode
           let spanCloset = parentNode.querySelector("span")
           if (spanCloset) {
            spanCloset.classList.add("hidden")
            spanCloset.textContent = ""
           }
        })
    });
   }
    const formlogin = document.querySelector(".btn");
   
    if (formlogin) {
        formlogin.addEventListener("click", async (e) => {
            e.preventDefault();
            const response = await login();
            console.log(response);
            if (response) {
                window.location.href = "/mainpage";
            }
        });
    }
    const formCreate = document.querySelector(".btn-create");
    if (formCreate) {
        formCreate.addEventListener("click", async (e) => {
            e.preventDefault();
            const response = await createUser();
    
            if (response) {
                window.location.href = "/mainpage";
            }
        });
    }
    
});

async function login() {
    let message = document.querySelector(".msg")
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const datarequest = {
        email,
        password
    };
    if (datarequest.email === "" || datarequest.password==="") {
        
        message.innerHTML="*Rellene todos los campos"
        return false
    }
    try {
        const data = await fetch("https://trivia-ui0k.onrender.com/login/", {
            method: "POST",
            body: JSON.stringify(datarequest),
            headers: { "Content-type": "application/json" }
        });
        console.log(data);
        if (data) {
            const res = await data.json();
            if (!res.success) {
                console.log(res.message);
                message.innerHTML= res.message
                return res.success;
            }else{return res.success}
        } else {
            console.error(`Error en la solicitud: ${data.status} - ${data.statusText}`);
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}
async function createUser() {
    let msgpassword = document.querySelector(".password-msg")
    console.log(msgpassword);
    let msgemail = document.querySelector(".email-msg")
    let msgusername = document.querySelector(".username-msg")
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;
    const datarequest = {
        email,
        password,
        username
    };

    console.log(datarequest);
    try {
        const data = await fetch("https://trivia-ui0k.onrender.com/createuser", {
            method: "POST",
            body: JSON.stringify(datarequest),
            headers: { "Content-type": "application/json" }
        });
        
        if (data.ok) {
            const res = await data.json();
            if (res) {
                console.log(res);
                if (!res.success) {
                    res.errors.forEach(element => {
                    console.log(element);
                element.path.map(error =>{
                    
                    if (error === "password") {
                        msgpassword.classList.remove("hidden")
                        msgpassword.textContent= element.message
                    }else if(error === "email"){
                        msgemail.classList.remove("hidden")
                        msgemail.textContent=element.message
                    }
                    else if(error === "username"){
                        msgusername.classList.remove("hidden")
                        msgusername.textContent=element.message
                    }
                
                })
                });
            }else{
                await login()
                return true
            }
           }
        } else {
            console.error(`Error en la solicitud: ${data.status} - ${data.statusText}`);
            return false;
        }
    } catch (error) {
        console.error(error);
        
    }
    

}


