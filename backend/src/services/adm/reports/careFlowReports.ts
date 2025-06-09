import { openDb } from "../../../db";
import { Periods } from "../../../utils/systemUtils/AdminResponses";
import { getPeriodRange } from "../../../utils/systemUtils/getPeriod";

export const CareFlowReports = {
    async getAverageConsultTime(period: Periods) {
        const db = await openDb();

        const { startDate, endDate } = getPeriodRange(period);
        let consultTime: number = 0;

        const [rows] = await db.all('SELECT checkInConsult, checkOutConsult FROM Consult WHERE checkInConsult >= ? AND checkOutConsult <= ?', [startDate, endDate]);
        
        for (let i = 0; i < rows.length; i++) {
            consultTime += rows[i].CheckOutConsult - rows[i].CheckInConsult;
        }

        return consultTime;
    },

    async getAverageTriageTime(period: Periods) {
        const db = await openDb();

        const { startDate, endDate } = getPeriodRange(period);
        let triageTime: number = 0;

        const [rows] = await db.all('SELECT checkInTriage, checkOutTriageonsult WHERE checkInTriage >= ? AND checkOutTriage <= ?', [startDate, endDate]);
        
        for (let i = 0; i < rows.length; i++) {
            triageTime += rows[i].checkOutTriage - rows[i].checkInTriage;
        }

        return triageTime;
    },

    async showAllCareFlows() {
        const db = await openDb();

        try {
            const careFlows = await db.all('SELECT CareFlow.*, Triage.*, Consult.* FROM CareFlow LEFT JOIN Triage ON CareFlow.id = Triage.triage_id LEFT JOIN Consult ON CareFlow.id = Consult.consult_id');

            for (let careFlow of careFlows) {
                try {
                    careFlow.symptoms = JSON.parse(careFlow.symptoms);
                    careFlow.prescriptions = JSON.parse(careFlow.prescriptions);
                } catch {
                    careFlow.symptoms = []
                    careFlow.prescriptions = []
                }
            }

            return careFlows

        } catch (error) {
            console.error(error);
        }
    },

    async getPeriodCareFlow(period: Periods) {
        const db = await openDb();

        const { startDate, endDate } = getPeriodRange(period);

        const careFlows = await db.all('SELECT CareFlow.*, Triage.*, Consult.* FROM CareFlow LEFT JOIN Triage ON CareFlow.id = Triage.id LEFT JOIN Consult ON CareFlow.id = Consult.id WHERE CareFlow.checkInHospital BETWEEN ? AND ?', [startDate, endDate]);

        return careFlows
    }
}