import { db } from "../../db";

export function waitTime(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function insertTriageCategories() {
    await db.execute('INSERT INTO TriageCategory (name, color, limitMinutes, priority) VALUES (?, ?, ?, ?)', ['immediate', 'red', 0, 5]);
    await db.execute('INSERT INTO TriageCategory (name, color, limitMinutes, priority) VALUES (?, ?, ?, ?)', ['very_urgent', 'orange', 10, 4]);
    await db.execute('INSERT INTO TriageCategory (name, color, limitMinutes, priority) VALUES (?, ?, ?, ?)', ['urgent', 'yellow', 60, 3]);
    await db.execute('INSERT INTO TriageCategory (name, color, limitMinutes, priority) VALUES (?, ?, ?, ?)', ['standard', 'green', 120, 2]);
    await db.execute('INSERT INTO TriageCategory (name, color, limitMinutes, priority) VALUES (?, ?, ?, ?)', ['non_urgent', 'blue', 240, 1]);
}