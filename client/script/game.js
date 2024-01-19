class GameLifePoints {
    static async deleteLife ({target}){
        const json = localStorage.getItem("life")
        const game = JSON.parse(json)
        let result = document.querySelectorAll(".result")
        result.forEach(result => {
            result.classList.add("disabled")
        });
        if (game.life > 0) {
            game.life--
        }
            if (game.life === 0) {
                this.endGame(game)
            }
        this.uploadGame(game) 
    }
    static async uploadGame(game){
        console.log(game);
        let points = document.querySelector(".points")
        points.innerHTML = game.points
        const heart = "❤️"
        const life =document.querySelector(".hearts")
        life.innerHTML = ""
        for (let i = 0; i < game.life; i++) {
            life.innerHTML += heart
        }
       
        localStorage.setItem("life", JSON.stringify(game))
        
    }
    static async endGame(game){
       const overlay = document.querySelector(".overlay") 
       overlay.classList.remove("hidden")     
        overlay.innerHTML = `<div class="menu"><h1 class="end-h1">Has perdido</h1>
        <a href="/mainpage" class="end"><h3>Volver al menu</h3></a></div>`
    }
    static async points(game){
        let number = parseInt(game.points)
        number+=50
        game.points = number
        const data = await fetch("https://"+location.host+"/updatepoints/",{method : "POST",
        body:JSON.stringify({points :game.points}),
        headers : {"Content-type" : "application/json"}
    })
    try {
        const res = await data.json()
        console.log(res);
        } catch (error) {
            console.error(error);
        }
        this.uploadGame(game) 
    }
}

