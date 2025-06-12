import { db } from "../../../db";
import { getPeriodRange } from "../../../utils/systemUtils/getPeriod";
import { Periods } from "../../../utils/enuns/periods";
import { RowDataPacket } from "mysql2";

export const QueueReports = {
    async getAverageQueueTimes(period: Periods) {
        const { startDate, endDate } = getPeriodRange(period);

        const [triageRows] = await db.execute<RowDataPacket[]>(
            `SELECT CareFlow.checkInHospital, Triage.checkInTriage 
             FROM CareFlow 
             JOIN Triage ON CareFlow.id = Triage.triage_id 
             WHERE checkInHospital BETWEEN ? AND ?`,
            [startDate, endDate]
        );

        const [consultRows] = await db.execute<RowDataPacket[]>(
            `SELECT Triage.checkOutTriage, Consult.checkInConsult 
             FROM Triage 
             JOIN Consult ON Triage.triage_id = Consult.consult_id 
             WHERE checkOutTriage BETWEEN ? AND ?`,
            [startDate, endDate]
        );

        let triageQueueTime = 0;
        for (const row of triageRows) {
            if (row.checkInHospital && row.checkInTriage) {
                const checkInHospital = new Date(row.checkInHospital);
                const checkInTriage = new Date(row.checkInTriage);
                if (!isNaN(checkInHospital.getTime()) && !isNaN(checkInTriage.getTime())) {
                    triageQueueTime += checkInTriage.getTime() - checkInHospital.getTime();
                }
            }
        }

        let consultQueueTime = 0;
        for (const row of consultRows) {
            if (row.checkOutTriage && row.checkInConsult) {
                const checkOutTriage = new Date(row.checkOutTriage);
                const checkInConsult = new Date(row.checkInConsult);
                if (!isNaN(checkOutTriage.getTime()) && !isNaN(checkInConsult.getTime())) {
                    consultQueueTime += checkInConsult.getTime() - checkOutTriage.getTime();
                }
            }
        }

        return {
            triageQueueTime: triageRows.length ? triageQueueTime / triageRows.length : 0,
            consultQueueTime: consultRows.length ? consultQueueTime / consultRows.length : 0
        };
    }
}