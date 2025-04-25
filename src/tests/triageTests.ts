import { HospitalServices } from "../services/hospitalService";
import { QueueServices } from "../services/queueService";
import { PatientRegistration } from "../services/patientServices";
import { Convert } from "../utils/convertJson";
import patient1 from "../Json/patient1.json";
import patient2 from "../Json/patient2.json";
import triage1 from "../Json/triage1.json"
import { Patient } from "../models/patient";

// Parte Antes:
QueueServices.createTicket(1);
QueueServices.createTicket(1);
QueueServices.callNextAttend();
PatientRegistration.register(Convert.JsonToData(patient1));

QueueServices.callNextAttend();
PatientRegistration.register(Convert.JsonToData(patient2));

// TRIAGEM:
let patient: Patient;

console.log('\nTRIAGEM:\n')
patient = QueueServices.callNextTriage();

HospitalServices.triage(patient, Convert.JsonToTriage(triage1))