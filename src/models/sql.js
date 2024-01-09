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
    static async getQuestion({user}){
        const [count]= await connection.query(`SELECT q.id
        FROM question q
        JOIN (
            SELECT FLOOR(RAND() * COUNT(id)) AS random_id
            FROM question
        ) r ON q.id >= r.random_id
        LEFT JOIN usercorrect uc ON q.id = uc.idquestion AND uc.iduser = ?
        WHERE uc.idquestion IS NULL
        ORDER BY q.id
        LIMIT 1`, [user])

        if (count.length > 0) {
            const id = count[0].id
            const [data] = await connection.query("SELECT id,category,question,response1,response2,response3,response3,response4 FROM question WHERE id NOT IN (SELECT idquestion FROM usercorrect WHERE iduser = ?) AND id = ? ",[user,id])
            return data    
        }else{
            return {status: "finished"}
        }
        
    }
    static async getTrueQuestion({id, userresponse,iduser}){
        const [data] = await connection.query("SELECT trueresponse,id FROM question WHERE id = ?",[id])
        if (data[0].trueresponse == userresponse) {
            const [result ]= await connection.query("INSERT INTO usercorrect(idquestion,iduser) VALUES(?,?)",[data[0].id, iduser ])
            return result.affectedRows>0? true:false 
        }
        return false
    }
    static async login({email}){
        const [data] = await connection.query(`SELECT username,id,points,password
        FROM users 
        WHERE (email = ? OR username = ?) 
              `,[email, email])
        return data[0] ? data[0] : false
    }
    static async getPoints({id}){
        const [data] = await connection.query(`SELECT points
        FROM users 
        WHERE id = ?`,[id])
        return data[0] ? data[0] : false
    }
    static async updatePoints({id, points}){
        const [data] = await connection.query(`UPDATE users SET points = ? WHERE id= ?`,[points, id ])
        return data.affectedRows >0 ? true:false
    }
    static async getEspesificQuestion({ id }){
        const [data] = await connection.query(`SELECT id,category,question,response1,response2,response3,response3,response4 FROM question WHERE id = ?`,[id ])
        return data ?data :false
    }
    static async insertUser({ email, username, password}){
        const [data] = await connection.query(`INSERT INTO users(email, username, password) VALUES(?,?,?)`,[email, username, password])
        return data.affectedRows > 0 ?true :false
    }
    
}