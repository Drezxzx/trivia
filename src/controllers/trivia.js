import {Usedb} from "../models/sql.js"

export  class Trivia {
    static async getQuestion({user}){
        const data = await Usedb.getQuestion({user})
        return data
    }
    static async getTrueQuestion({id, userresponse,iduser}){
        const data = await Usedb.getTrueQuestion({id, userresponse,iduser})
        return data
    }
    static async login({email}){
        const data = await Usedb.login({email})
        return data
    }
    static async getPoints({id}){
        const data = await Usedb.getPoints({id})
        return data
    }
    static async updatePoints({id, points}){
        const data = await Usedb.updatePoints({id, points})
        return data
    }
    static async getEspesificQuestion({ id }){
        const data = await Usedb.getEspesificQuestion({ id })
        return data
    }
    static async insertUser({ email, username, password}){
        const data = await Usedb.insertUser({ email, username, password})
        return data
    }
    static async Qualification(){
        const data = await Usedb.Qualification()
        return data
    }
    static async getUser({email, username}){
        const data = await Usedb.getUser({email, username})
        return data
    }
}