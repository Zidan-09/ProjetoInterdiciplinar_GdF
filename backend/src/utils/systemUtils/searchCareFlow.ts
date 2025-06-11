import { openDb } from "../../db";

export async function findById(id: number) {
    const db = await openDb();

    try {
        const careFlow = await db.get('SELECT * FROM CareFlow WHERE id = ?', [id]);

        if (careFlow) {
            return careFlow
        }
    } catch (error) {
        console.error(error);
    }
}