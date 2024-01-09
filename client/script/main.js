window.addEventListener("DOMContentLoaded",async()=>{
    localStorage.removeItem("life")
    await getPoints()
})

 async function getPoints() {
    let pointsnode = document.querySelector(".points")
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