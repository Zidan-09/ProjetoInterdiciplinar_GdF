import { QueueReports } from "./services/adm/reports/queueReports";
import { Periods } from "./utils/systemUtils/AdminResponses";

async function start() {
    await QueueReports.getAverageQueueTimes(Periods.Day);
}

start();