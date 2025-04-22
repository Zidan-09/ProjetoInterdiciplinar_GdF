import { AttendQ, TriageQ, ConsultQ } from "../models/queue";
import { HospitalServices } from "../services/hospitalService";
import { QueueServices } from "../services/queueService";
import { PatientRegistration } from "../services/patientServices";
import { Convert } from "../utils/convertJson";
import { Patient } from "../models/patient";
import patient1 from '../Json/patient1.json'
import patient2 from '../Json/patient2.json'
import triage1 from '../Json/triage1.json'

let patient: Patient;

QueueServices.insertAttendQueue(1)
QueueServices.insertAttendQueue(1)
QueueServices.insertAttendQueue(2)
QueueServices.insertAttendQueue(2)
QueueServices.insertAttendQueue(1)
QueueServices.insertAttendQueue(1)
QueueServices.insertAttendQueue(3)
QueueServices.insertAttendQueue(3)
QueueServices.insertAttendQueue(1)
QueueServices.insertAttendQueue(1)

QueueServices.callNextAttend()
PatientRegistration.register(Convert.JsonToData(patient1));

QueueServices.callNextAttend()
PatientRegistration.register(Convert.JsonToData(patient2));

patient = QueueServices.callNextTriage()
HospitalServices.triage(patient, Convert.JsonToTriage(triage1))

QueueServices.callNextConsult()