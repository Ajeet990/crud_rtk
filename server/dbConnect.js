import mysql from 'mysql'
import dotenv from 'dotenv'
dotenv.config()
export const db = mysql.createConnection({
    host:process.env.LOCALHOST,
    user:process.env.DB_USERNAME,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
    // host:'localhost',
    // user:'root',
    // password:'',
    // database:'crud'
})