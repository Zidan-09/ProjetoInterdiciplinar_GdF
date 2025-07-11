import { RowDataPacket } from "mysql2";
import { db } from "../../db";
import { ConsultQueue, TriageQueue } from "../../entities/queue";
import { Status } from "../../utils/enuns/generalEnuns";
import { NodeConsult, NodeTriage } from "../../utils/queueUtils/createNode";
import { searchTriage } from "../../utils/systemUtils/recoverUtil";
import { EndTriage } from "../../entities/careFlow";

export async function Recover(): Promise<boolean|undefined> {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    try {
        const [careFlows] = await db.execute<RowDataPacket[]>(
            'SELECT * FROM CareFlow WHERE checkInHospital >= ? ORDER BY checkInHospital DESC',
            [yesterday.toISOString()]
        );

        for (const flow of careFlows) {
            switch (flow.status as Status) {
                case Status.WaitingTriage:
                    const nodeTriage = await NodeTriage.create(flow.id, flow.patient_id);
                    TriageQueue.insertQueue(nodeTriage);
                    break;

                case Status.WaitingConsultation:
                    const triage: EndTriage | undefined = await searchTriage(flow.id);

                    if (triage) {
                        const nodeConsult = await NodeConsult.create(flow.id, triage);
                        if (nodeConsult) {
                            ConsultQueue.insertQueue(nodeConsult);
                        }
                    }
                    break;
            }
        }
        return true;

    } catch (error) {
        console.error(error);
        return undefined;
    }
}