import { openDb } from "../../db";

export async function Recover() {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    const db = await openDb();

    try {
        const careFlows = await db.all(
            'SELECT * FROM CareFlow WHERE checkInHospital >= ? ORDER BY checkInHospital DESC',
            [yesterday.toISOString()]
        );

        for (const flow of careFlows) {
            switch (flow.status) {
                case 'esperando triagem':
                    break;
                case 'esperando consulta':
                    break;
            }
        }

    } catch (error) {
        console.error(error);
    }
}