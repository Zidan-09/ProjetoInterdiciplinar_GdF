import { RowDataPacket } from "mysql2";
import { db } from "../db";

export async function insertTriageCategories() {
    const [rows] = await db.execute<RowDataPacket[]>('SELECT * FROM TriageCategory');
    console.log(rows);

    if (rows.length > 0) {
        return undefined;
    }

    await db.execute('INSERT INTO TriageCategory (name, color, limitDate, priority) VALUES (?, ?, ?, ?)', ['immediate', 'red', 0, 5]);
    await db.execute('INSERT INTO TriageCategory (name, color, limitDate, priority) VALUES (?, ?, ?, ?)', ['very_urgent', 'orange', 10, 4]);
    await db.execute('INSERT INTO TriageCategory (name, color, limitDate, priority) VALUES (?, ?, ?, ?)', ['urgent', 'yellow', 60, 3]);
    await db.execute('INSERT INTO TriageCategory (name, color, limitDate, priority) VALUES (?, ?, ?, ?)', ['standard', 'green', 120, 2]);
    await db.execute('INSERT INTO TriageCategory (name, color, limitDate, priority) VALUES (?, ?, ?, ?)', ['non_urgent', 'blue', 240, 1]);
}