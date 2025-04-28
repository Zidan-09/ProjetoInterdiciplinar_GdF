import { HospitalServices } from "../services/hospitalService";
import { QueueServices } from "../services/queueService";
import { Convert } from "../utils/convertJson";
import patient1 from "../Json/patient1.json";
import triage1 from "../Json/triage1.json"
import { ValidateRegister } from "../utils/validateRegister";
import { nurse, recepcionist } from "./test";
import { Attend } from "../models/attend";

// Parte Antes:
QueueServices.createTicket(1);
QueueServices.createTicket(1);
QueueServices.callNextAttend();


QueueServices.callNextAttend();
ValidateRegister.verify(Convert.JsonToData(patient1), recepcionist, '');

// TRIAGEM:
let patient: Attend = QueueServices.callNextTriage();

console.log('\nTRIAGEM:\n')

HospitalServices.triage(nurse, Convert.JsonToTriage(triage1));