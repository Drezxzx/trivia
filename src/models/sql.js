import mysql from "mysql2/promise"
const config = {
    host: 'localhost',
    user: 'root', 
    password: '', 
    port: 3306,
    database: 'trivia',
}
const connection = await mysql.createConnection(config)
export class Usedb{
    static async getQuestion({id}){
        const [data] = await connection.query("SELECT response1,response2,response3,response3,response4 FROM question WHERE id = ?",[id])
        return data
    }
    static async getTrueQuestion({id, userresponse}){
        const [data] = await connection.query("SELECT trueresponse FROM question WHERE id = ?",[id])
        return data
    }
}