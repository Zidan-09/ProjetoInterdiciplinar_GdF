import mysql from 'mysql2/promise';
require('dotenv').config();

export const db = mysql.createPool({
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_DATABASE!,
    port: Number(process.env.DB_PORT!),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    socketPath: undefined
})