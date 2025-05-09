import mysql from 'mysql2/promise';

export const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'sua_senha',
    database: 'hospital_db',
    waitForConnections: true,
    connectionLimit: 10,
})