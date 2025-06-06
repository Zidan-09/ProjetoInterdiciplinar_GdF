import { waitTime } from "./ControllersForTest/utilTest";
import { RegisterEmployeeTest } from "./tests/employeeRegisterTest";
import { CareFlowTest } from "./tests/careFlowTest/careFlowTest";
import { initDb } from "../db";

async function start() {
    await initDb();

    await RegisterEmployeeTest();
    await waitTime(5000);
    await CareFlowTest();
}

start();