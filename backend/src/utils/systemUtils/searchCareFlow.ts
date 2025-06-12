import { db } from "../../db";

export async function findById(id: number) {
    try {
        const careFlow = await db.execute('SELECT * FROM CareFlow WHERE id = ?', [id]);

        if (careFlow) {
            return careFlow
        }
    } catch (error) {
        console.error(error);
    }
}