import { insertTriageCategories, waitTime } from "./ControllersForTest/utilTest";
import { RegisterEmployeeTest } from "./tests/employeeRegisterTest";
import { CareFlowTest } from "./tests/careFlowTest/careFlowTest";

async function start() {
    await insertTriageCategories();
    
    await RegisterEmployeeTest();
    await waitTime(5000);
    await CareFlowTest();
}

start();