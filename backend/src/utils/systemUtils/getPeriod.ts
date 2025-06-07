import { Periods } from "./AdminResponses";

export function getPeriodRange(period: Periods) {
    const date: Date = new Date();
    const start: Date = new Date();
    const end: Date = new Date();

    switch (period) {
        case Periods.Day:
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);
            break;

        case Periods.Week: 
            const day = date.getDay();
            const diffToMonday = (day === 0 ? -6 : 1) - day;
            start.setDate(date.getDate() + diffToMonday);
            start.setHours(0, 0, 0, 0);
            end.setDate(start.getDate() + 6);
            end.setHours(23, 59, 59, 999);
            break;
        
        case Periods.Month:
            start.setDate(1);
            start.setHours(0, 0, 0, 0);
            end.setMonth(start.getMonth() + 1);
            end.setDate(0);
            end.setHours(23, 59, 59, 999);
            break;

        case Periods.Year:
            start.setMonth(0, 1);
            start.setHours(0, 0, 0, 0);
            end.setMonth(11, 31);
            end.setHours(23, 59, 59, 999);
            break;
    }

    return {
        startDate: start.toISOString(),
        endDate: end.toISOString(),
    };
}