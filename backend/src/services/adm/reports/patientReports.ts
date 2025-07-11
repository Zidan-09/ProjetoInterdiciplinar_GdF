import { RowDataPacket } from "mysql2";
import { db } from "../../../db";
import { Status } from "../../../utils/enuns/generalEnuns";
import { Periods } from "../../../utils/enuns/periods";
import { getPeriodRange } from "../../../utils/systemUtils/getPeriod";

export const PatientReports = {
    async getLeftBeforeConsult(period: Periods) {
        try {
            const { startDate, endDate } = getPeriodRange(period);

            const [qty] = await db.execute<RowDataPacket[]>('SELECT COUNT(*) AS total FROM CareFlow WHERE status = ? AND checkInHospital BETWEEN ? AND ?', [Status.NoShow, startDate, endDate]);
            return qty[0].total;

        } catch (error) {
            console.error(error);
            return undefined;
        }
    }
}