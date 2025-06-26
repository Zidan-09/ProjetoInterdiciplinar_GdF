import { wait } from "../utils/systemUtils/wait";
import { insertTriageCategories } from "./insertTriageCategory";
import { start } from "./populateBD";

async function Init() {
    console.log('Iniciando população do banco...');

    wait(2000);
    await insertTriageCategories();
    wait(2000);
    await start();
    wait(2000);

    console.log('Operação Finalizada');
}

Init();