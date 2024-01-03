import express, { json } from "express"
import cors from "cors"
import  morgan  from "morgan"
import {routerTrivia} from "./src/routes/routes.js"


const app = express()
const PORT = process.env.PORT || 3000
app.use(json())
app.use(cors())
app.use(morgan("dev"))

app.use("/", routerTrivia)

app.listen(PORT, ()=>{
    console.log(`server running ${PORT}`);
})