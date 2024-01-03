import {Usedb} from "../models/sql.js"

export  class Trivia {
    static async getQuestion({id}){
        const data = await Usedb.getQuestion({id})
        return data
    }
    static async getTrueQuestion({id, userresponse}){
        const data = await Usedb.getTrueQuestion({id, userresponse})
        return data
    }
}