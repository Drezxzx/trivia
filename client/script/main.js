window.addEventListener("DOMContentLoaded",async()=>{
    localStorage.removeItem("life")
    await getPoints()
    await getqualification()

})
 async function getqualification() {
    let nodequalification = document.querySelector(".qualification")
    const puestos = {
        primero : "🥇",
        segundo : "🥈",
        tercer  : "🥉"
    }
    const data = await fetch(location.href+"/qualification")
    try {
        const res = await data.json()
        console.log(res);
        if (res.length > 0) {
            nodequalification.classList.remove("hidden")
            nodequalification.innerHTML +=`<div class="tittle"><h3 class="neonText">
        Calificación
         </h3></div> `
        res.forEach((user, index) => {
            if (index === 0) {
                nodequalification.innerHTML +=`<div class="user-pints"><span class="username">${user.username}:</span> ${user.points} ${puestos.primero}</div>`
            }else if(index===1){
                nodequalification.innerHTML +=`<div class="user-pints"><span class="username">${user.username}:</span> ${user.points} ${puestos.segundo}</div>`
            }else if(index===2){
                nodequalification.innerHTML +=`<div class="user-pints"><span class="username">${user.username}:</span> ${user.points} ${puestos.tercer}</div>`
            }else{nodequalification.innerHTML += `<div class="other-users hidden">${user.username}: ${user.points}</div>`}
        });
        }
        
        
    } catch (error) {
        console.error(error);
    }
    eventQuali()
 }
 async function getPoints() {
    let pointsnode = document.querySelector(".points")
    console.log(location.href+`/userpoints/`);
    const req = await fetch(location.href+`/userpoints/`)
    try {
        const {points} = await req.json()
        console.log(points);
        pointsnode.innerHTML = points 
        return points
    } catch (error) {
        console.error(error);
    }
}

function eventQuali() {
    let qualification = document.querySelector(".qualification")
    let user = document.querySelector(".user")
    let otheruser = document.querySelectorAll(".other-users")
    let button = document.querySelector(".play")

    qualification.addEventListener("click", ()=>{
        const change = qualification.classList.toggle("overlayy")
        if (change) {
            otheruser.forEach(user => {
                user.classList.remove("hidden")
            });
            button.style.zIndex = "-1"
            user.style.zIndex = "-1"
        }else{
            otheruser.forEach(user => {
                user.classList.add("hidden")
            });
            button.style.zIndex = "1"
            user.style.zIndex = "1" 
        }
    })
}