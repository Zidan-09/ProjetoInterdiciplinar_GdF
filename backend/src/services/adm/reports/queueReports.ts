import { openDb } from "../../../db";
import { getPeriodRange } from "../../../utils/systemUtils/getPeriod";
import { Periods } from "../../../utils/enuns/periods";

export const QueueReports = {
    async getAverageQueueTimes(period: Periods) {
        const db = await openDb();

        const { startDate, endDate } = getPeriodRange(period);
        const triageTime = await db.all('SELECT CareFlow.checkInHospital, Triage.checkInTriage FROM CareFlow JOIN Triage ON CareFlow.id = Triage.triage_id WHERE checkInHospital >= ? AND checkInHospital <= ?', [startDate, endDate]);

        const consultTime = await db.all('SELECT Triage.checkOutTriage, Consult.checkInConsult FROM Triage JOIN Consult ON Triage.triage_id = Consult.consult_id WHERE checkOutTriage >= ? AND checkInConsult <= ?', [startDate, endDate]);
        console.log(triageTime)
        let triageQueueTime: number = 0;
        let consultQueueTime: number = 0;

        let checkInHospital: Date;
        let checkInTriage: Date;

        for (let i = 0; i < triageTime.length; i++) {
            checkInHospital = new Date(triageTime[i].checkInHospital);
            checkInTriage = new Date(triageTime[i].checkInTriage);

            triageQueueTime += checkInTriage.getTime() - checkInHospital.getTime();
        }

        let checkOutTriage: Date;
        let checkInConsult: Date;
        for (let i = 0; i < consultTime.length; i++) {
            checkOutTriage = new Date(consultTime[i].checkOutTriage);
            checkInConsult = new Date(consultTime[i].checkInConsult);

            consultQueueTime += checkInConsult.getTime() - checkOutTriage.getTime();
        }

        const triageResult: number = triageQueueTime / triageTime.length;
        const consultResult: number = consultQueueTime / consultTime.length;

        return {
            triageQueueTime: triageResult,
            consultQueueTime: consultResult
        }
    }
}