import { AdminControllerTest, EmployersConstrollerTest } from "./ControllersForTest/hospitalStaffControllerTest";
import { HospitalControllerTest } from "./ControllersForTest/hospitalControllerTest";
import { QueueControllerTest } from "./ControllersForTest/queueControllerTest";
import { Receptionist, Nurse, Doctor, Admin } from "../entities/hospitalStaff";
import { EmployeeStatus, EmployeeType } from "../utils/personsUtils/generalEnuns";
import { chichi, bulma, goku, whis, chichiActivate, bulmaActivate, gokuActivate, whisActivate, patientRegister } from "./parsesJson";
import { initDb } from "../db";
import { TypeQueue } from "../utils/queueUtils/queueEnuns";

async function start() {
    await initDb();

    await EmployersConstrollerTest.register(chichi);
    await EmployersConstrollerTest.register(bulma);
    await EmployersConstrollerTest.register(goku);
    await EmployersConstrollerTest.register(whis);

    await EmployersConstrollerTest.authAccount(chichiActivate);
    await EmployersConstrollerTest.authAccount(bulmaActivate);
    await EmployersConstrollerTest.authAccount(gokuActivate);
    await EmployersConstrollerTest.authAccount(whisActivate);

    await HospitalControllerTest.createTicket({priority: 1});
    await HospitalControllerTest.createTicket({priority: 1});
    await HospitalControllerTest.createTicket({priority: 2});
    await HospitalControllerTest.createTicket({priority: 1});
    await HospitalControllerTest.createTicket({priority: 3});
    await HospitalControllerTest.createTicket({priority: 3});
    await HospitalControllerTest.createTicket({priority: 2});
    await HospitalControllerTest.createTicket({priority: 1});
    await HospitalControllerTest.createTicket({priority: 2});
    await HospitalControllerTest.createTicket({priority: 3});

    await QueueControllerTest.queue({typeQueue: TypeQueue.Recep});

    await QueueControllerTest.callNext({typeQueue: TypeQueue.Recep});

    await HospitalControllerTest.register(patientRegister);

    await HospitalControllerTest.list();

    await QueueControllerTest.queue({typeQueue: TypeQueue.Triage});

    await QueueControllerTest.callNext({typeQueue: TypeQueue.Triage})´

    await HospitalControllerTest.triage()
}

start();