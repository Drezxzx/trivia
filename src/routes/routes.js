import {Router} from "express"
import{Trivia}from"../controllers/trivia.js"
export const routerTrivia = Router()

routerTrivia.get("/question/:id", async(req, res)=>{
    const {id} = req.params
    const data = await Trivia.getQuestion({id})
    res.json(data)
})
routerTrivia.post("/question/:id", async(req, res)=>{
    const {id} = req.params
    const {response} = req.body
    const data = await Trivia.getTrueQuestion({id, userresponse:response})
    res.json({id, userresponse:response, data})
})