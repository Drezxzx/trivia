

let lifePoints = {}
if (localStorage.getItem("life")
) {
    lifePoints = JSON.parse(localStorage.getItem("life"))
}else{lifePoints = {life : 3, points: 0}}

window.addEventListener("DOMContentLoaded", async()=>{
    const game = await startApp()
    const question = document.querySelector(".options").id
   
    const point = document.querySelector(".points")
    if (!lifePoints.quetion) {
        lifePoints.quetion = question 
    }
    lifePoints.points=point.innerHTML
    localStorage.setItem("life", JSON.stringify(lifePoints))
    const life = JSON.parse(localStorage.getItem("life"))
    await GameLifePoints.uploadGame(life)
})

async function startApp() {
    let req = null
    if (lifePoints.quetion > 0 && lifePoints.quetion) {
        
        req = await fetch(location.origin+`/question/${lifePoints.quetion}`)
    }else{
      
     req = await fetch(location.origin+`/question/`)
    }
    try {
        if (req) {
            const res = await req.json()
         
            if (!res.status) {
                const game = printGame({options : res[0]})
           
                if (game) {
                 eventGame()
                 return true
                }
            }
            printGame({options : res})
           
        }
    } catch (error) {
        console.error(error);
    }
}

async function printGame({options}) {
    
    const nodeoption = document.querySelector(".question")
    if (!options.status) {
        const {question,response1,response2,response3,response4,category,id} = options
        lifePoints.quetion = id
       
    nodeoption.innerHTML=""
    nodeoption.innerHTML+=`
    <div class="principal-question"> <div class="tittle"><h3 class="neonText">
    ${question}
     </h3></div> <p>${category}</p></div>
    
            <div class="options" id="${id}">
                <div id="option1" class="result">${response1}</div>
                <div id="option2" class="result">${response2}</div>
                <div id="option3" class="result">${response3}</div>
                <div id="option4" class="result">${response4}</div>
            </div>
    `
    
    }else{

        nodeoption.innerHTML = `<h1> Juego finalizado</h1><a href="/mainpage" class="mainpage">Volver al inicio</a>`
    }

return true
}

function eventGame() {
    const options = document.querySelectorAll(".result")
    options.forEach(button => {
        button.addEventListener("click", async(e)=>{
            const target = e.target
          
            const userresponse = button.innerHTML
            const data = await checkResponse(userresponse)
          
           
            if (data.status) {
                target.classList.remove("result")
                target.classList.add("green")
                await GameLifePoints.points(lifePoints)
                lifePoints.quetion = 0
                setTimeout(async() => {
                    await startApp()
                }, 1200);
                
            }else{
                target.classList.remove("result")
                target.classList.add("redd")
               const action = await GameLifePoints.deleteLife({target: e.target})
               lifePoints.quetion = 0
               setTimeout(async() => {
                await startApp()
               }, 2000);
            }
            if (data.data) {
                const options = document.querySelectorAll(".result")
                options.forEach(result => {
                    if (result.innerHTML === data.data) {
                       
                        result.classList.remove("result")
                        result.classList.add("green")
                    }
                });
            }
            
        })
    });
}

async function checkResponse(userresponse) {
  
    const question = document.querySelector(".options").id
    const req = await fetch(location.origin+`/question/${question}`,{
        method : "POST",
        body   : JSON.stringify({userresponse}),
        headers : {
            "content-type": "application/json"
        }
    })
    try {
        if (req) {
            const data = await req.json()
            
            return data
        }
    } catch (error) {
        console.error(error);
    }
}