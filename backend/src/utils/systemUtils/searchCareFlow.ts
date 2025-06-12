import { RowDataPacket } from "mysql2";
import { db } from "../../db";

export async function findById(id: number): Promise<RowDataPacket|undefined> {
    try {
        const [careFlow] = await db.execute<RowDataPacket[]>('SELECT * FROM CareFlow WHERE id = ?', [id]);

        if (careFlow.length) {
            return careFlow[0]
        }
    } catch (error) {
        console.error(error);
    }
}