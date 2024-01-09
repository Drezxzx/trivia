

let lifePoints = {}
if (localStorage.getItem("life")
) {
    lifePoints = JSON.parse(localStorage.getItem("life"))
}else{lifePoints = {life : 3, points: 0}}

window.addEventListener("DOMContentLoaded", async()=>{
    const game = await startApp()
    const question = document.querySelector(".options").id
    console.log(question);
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
        req = await fetch(`http://localhost:3000/question/${lifePoints.quetion}`)
    }else{
     req = await fetch(`http://localhost:3000/question/`)
    }
    try {
        if (req) {
            const res = await req.json()
            console.log(res);
            if (!res.status) {
                const game = printGame({options : res[0]})
                console.log();
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
    console.log(options);
    const nodeoption = document.querySelector(".question")
    if (!options.status) {
        const {question,response1,response2,response3,response4,category,id} = options
        lifePoints.quetion = id
       
    nodeoption.innerHTML=""
    nodeoption.innerHTML+=`
    <div class="principal-question"><p>${question}</p><p>${category}</p></div>
    
            <div class="options" id="${id}">
                <div id="option1" class="result">${response1}</div>
                <div id="option2" class="result">${response2}</div>
                <div id="option3" class="result">${response3}</div>
                <div id="option4" class="result">${response4}</div>
            </div>
    `
    
    }else{

        nodeoption.innerHTML = `<h1> Juego finalizado<h1><a href="/mainpage">Volver al inicio</a>`
    }

return true
}

function eventGame() {
    const options = document.querySelectorAll(".result")
    options.forEach(button => {
        button.addEventListener("click", async(e)=>{
            const userresponse = button.innerHTML
            const data = await checkResponse(userresponse)
            console.log(data);
            if (data) {
                await GameLifePoints.points(lifePoints)
                lifePoints.quetion = 0
                const game = await startApp()
            }else{
                let node = e.target
                console.log(node);
               const action = await GameLifePoints.deleteLife({target: e.target})
               lifePoints.quetion = 0
               setTimeout(async() => {
                await startApp()
               }, 2000);
            }
            
            
        })
    });
}

async function checkResponse(userresponse) {
  
    const question = document.querySelector(".options").id
    const req = await fetch(`http://localhost:3000/question/${question}`,{
        method : "POST",
        body   : JSON.stringify({userresponse}),
        headers : {
            "content-type": "application/json"
        }
    })
    try {
        if (req) {
            const data = await req.json()
            console.log(data);
            return data
        }
    } catch (error) {
        console.error(error);
    }
}