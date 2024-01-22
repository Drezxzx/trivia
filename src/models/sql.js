import mysql from "mysql2/promise"
const config = {
    host: process.env.DBHOST ||'brb2chl6qpl6va43wx6l-mysql.services.clever-cloud.com',
    user: process.env.DBUSER ||'u2udz2akvvqdtdii', 
    password: process.env.DBPASSWORD ||'mPmol1u1hpqAiI8E5PeQ', 
    port: process.env.DBPORT ||3306,
    database: process.env.DBNAME ||'brb2chl6qpl6va43wx6l',
}
const connection = await mysql.createConnection(config)

export class Usedb{
    static async getQuestion({user}){
        const [count]= await connection.query(`SELECT q.id
        FROM question q
        LEFT JOIN usercorrect uc ON q.id = uc.idquestion AND uc.iduser = ?
        WHERE uc.idquestion IS NULL
        ORDER BY RAND()
        LIMIT 1;
        `, [user])

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
            return result.affectedRows>0? {status : true, data: data[0].trueresponse}:false 
        }
        return data ? {status : false , data : data[0].trueresponse}: false
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
   
static async insertUser({ email, username, password }) {
   
    const [data] = await connection.query(`INSERT INTO users(email, username, password) VALUES(?,?,?)`, [email, username, password]);

    
   
    return data.affectedRows > 0 ? { success: true } : false;
}

    static async Qualification(){
        const [data] = await connection.query(`SELECT username, points FROM users WHERE points != 0 ORDER BY  points DESC LIMIT 10 `)
        return data ?data :false
    }
    static async getUser({email, username}){
        const [data] = await connection.query(`SELECT 
        COALESCE((SELECT username FROM users WHERE username = ?), "none") AS isusername,
        COALESCE((SELECT email FROM users WHERE email = ?), "none") AS isemail;`, [username, email])
        return data.length >0  ?data : false
    }
    
}