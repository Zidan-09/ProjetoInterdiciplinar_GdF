import { QueueReports } from "./services/adm/reports/queueReports";
import { Periods } from "./utils/systemUtils/AdminResponses";

async function start() {
    const queue = await QueueReports.getAverageQueueTimes(Periods.Day);
    console.log(queue)
}

start();