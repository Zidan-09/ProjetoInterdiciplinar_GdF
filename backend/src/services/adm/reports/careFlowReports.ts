import { RowDataPacket } from "mysql2";
import { db } from "../../../db";
import { Periods } from "../../../utils/enuns/periods";
import { getPeriodRange } from "../../../utils/systemUtils/getPeriod";

export const CareFlowReports = {
    async getAverageConsultTime(period: Periods) {

        const { startDate, endDate } = getPeriodRange(period);
        let consultTime: number = 0;

        const [rows] = await db.execute<RowDataPacket[]>('SELECT checkInConsult, checkOutConsult FROM Consult WHERE checkInConsult >= ? AND checkOutConsult <= ?', [startDate, endDate]);
        
        for (let i = 0; i < rows.length; i++) {
            consultTime += rows[i].checkOutConsult - rows[i].checkInConsult;
        }

        return rows.length ? consultTime / rows.length : 0;
    },

    async getAverageTriageTime(period: Periods) {

        const { startDate, endDate } = getPeriodRange(period);
        let triageTime: number = 0;

        const [rows] = await db.execute<RowDataPacket[]>('SELECT checkInTriage, checkOutTriage FROM Triage WHERE checkInTriage >= ? AND checkOutTriage <= ?', [startDate, endDate]);
        
        for (let i = 0; i < rows.length; i++) {
            triageTime += rows[i].checkOutTriage - rows[i].checkInTriage;
        }

        return rows.length ? triageTime / rows.length : 0;
    },

    async getAverageCareFlowTime(period: Periods) {

        const { startDate, endDate } = getPeriodRange(period);
        let careFlowTime: number = 0;

        const [rows] = await db.execute<RowDataPacket[]>('SELECT CareFlow.checkInHospital, Consult.checkOutConsult FROM Consult JOIN CareFlow ON Consult.consult_id = CareFlow.id WHERE checkInHospital >= ? AND checkOutConsult <= ?', [startDate, endDate]);

        for (let i = 0; i < rows.length; i++) {
            careFlowTime += rows[i].checkInHospital;
        }

        return rows.length ? careFlowTime / rows.length : 0;
    },

    async showAllCareFlows() {

        try {
            const [careFlows] = await db.execute<RowDataPacket[]>('SELECT CareFlow.*, Triage.*, Consult.* FROM CareFlow LEFT JOIN Triage ON CareFlow.id = Triage.triage_id LEFT JOIN Consult ON CareFlow.id = Consult.consult_id');

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

        const { startDate, endDate } = getPeriodRange(period);

        const [careFlows] = await db.execute<RowDataPacket[]>('SELECT CareFlow.*, Triage.*, Consult.* FROM CareFlow LEFT JOIN Triage ON CareFlow.id = Triage.id LEFT JOIN Consult ON CareFlow.id = Consult.id WHERE CareFlow.checkInHospital BETWEEN ? AND ?', [startDate, endDate]);

        return careFlows
    }
}