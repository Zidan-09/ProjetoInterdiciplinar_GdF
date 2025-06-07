import { openDb } from "../../../db";
import { getPeriodRange } from "../../../utils/systemUtils/getPeriod";
import { Periods } from "../../../utils/systemUtils/AdminResponses";

export const QueueReports = {
    async getAverageQueueTimes(period: Periods) {
        const db = await openDb();

        const { startDate, endDate } = getPeriodRange(period);
        const checkInTriage = await db.all('SELECT checkInTriage FROM Triage WHERE checkInTriage >= ? AND checkInTriage <= ?', [startDate, endDate]);
        const checkInHospital = await db.all('SELECT checkInHospital FROM CareFlow WHERE checkInHospital >= ? AND checkInHospital <= ?', [startDate, endDate]);

        const checkInConsult = await db.all('SELECT checkInConsult FROM Consult WHERE checkInConsult >= ? AND checkInConsult <= ?', [startDate, endDate]);
        const checkOutTriage = await db.all('SELECT checkOutTriage FROM Triage WHERE checkOutTriage >= ? AND checkOutTriage <= ?', [startDate, endDate])

        let triageQueueTime: number = 0;
        let consultQueueTime: number = 0;

        for (let i = 0; i < Math.min(checkInHospital.length, checkInTriage.length); i++) {
            triageQueueTime += checkInTriage[i] - checkInHospital[i];
        }

        for (let i = 0; i < Math.min(checkInConsult.length, checkOutTriage.length); i++) {
            consultQueueTime += checkInConsult[i] - checkOutTriage[i];
        }

        const triageResult: number = triageQueueTime / Math.min(checkInHospital.length, checkInTriage.length);
        const consultResult: number = consultQueueTime / Math.max(checkInConsult.length, checkOutTriage.length);

        return {
            triageQueueTime: triageResult,
            consultQueueTime: consultResult
        }
    }
}