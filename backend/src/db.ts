import mysql from 'mysql2/promise';
require('dotenv').config();

export const db = mysql.createPool({
    host: process.env.DB_HOST! || "192.168.5.21",
    user: process.env.DB_USER! || 'api',
    password: process.env.DB_PASSWORD! || 'J7#kP9$mX!2L*5zQ',
    database: process.env.DB_DATABASE! || 'ProjetoInter',
    port: Number(process.env.DB_PORT!) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})