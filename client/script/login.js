window.addEventListener("DOMContentLoaded", () => {
    const name = document.querySelectorAll("input")
   if (name) {
    name.forEach(input => {
        input.addEventListener("click", ()=>{
            let spanlogin = document.querySelector("span")
            spanlogin.textContent=""
           const parentNode = input.parentNode
           let spanCloset = parentNode.querySelector("span")
           if (spanCloset) {
            spanCloset.textContent = ""
           }
        })
    });
   }
    const formlogin = document.querySelector(".login");
   
    if (formlogin) {
        formlogin.addEventListener("submit", async (e) => {
            e.preventDefault();
            const response = await login();
            console.log(response);
            if (response) {
                
                window.location.href = "/mainpage";
            }
        });
    }
    const formCreate = document.querySelector(".Create");
    if (formCreate) {
        formCreate.addEventListener("submit", async (e) => {
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
    try {
        const data = await fetch("http://localhost:3000/login/", {
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
        const data = await fetch("http://localhost:3000/createuser", {
            method: "POST",
            body: JSON.stringify(datarequest),
            headers: { "Content-type": "application/json" }
        });
        
        if (data.ok) {
            const res = await data.json();
            console.log(res);
           if (res) {
            if (!res) {
                res.errors.forEach(element => {
                element.path.map(error =>{
                    console.log(error); 
                    if (error === "password") {
                        msgpassword.textContent= element.message
                    }else if(error === "email"){
                        msgemail.textContent=element.message
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
        return false;
    }
    

}


