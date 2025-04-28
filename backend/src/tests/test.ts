import { HospitalServices } from "../services/hospitalService";
import { QueueServices } from "../services/queueService";
import { Convert } from "../utils/convertJson";
import patient1 from '../Json/patient1.json'
import patient2 from '../Json/patient2.json'
import patient3 from '../Json/patient3.json'
import patient4 from '../Json/patient4.json'
import patient5 from '../Json/patient5.json'
import patient6 from '../Json/patient6.json'
import patient7 from '../Json/patient7.json'
import patient8 from '../Json/patient8.json'
import patient9 from '../Json/patient9.json'
import patient10 from '../Json/patient10.json'
import triage1 from '../Json/triage1.json'
import triage2 from '../Json/triage2.json'
import triage3 from '../Json/triage3.json'
import triage4 from '../Json/triage4.json'
import triage5 from '../Json/triage5.json'
import triage6 from '../Json/triage6.json'
import triage7 from '../Json/triage7.json'
import triage8 from '../Json/triage8.json'
import triage9 from '../Json/triage9.json'
import triage10 from '../Json/triage10.json'
import recepcionist1 from '../Json/recepcionist.json'
import nurse1 from '../Json/nurse.json'
import doctor1 from '../Json/doctor.json'
import { Doctor, Nurse, Recepcionist } from "../models/hospitalStaff";
import { HospitalManager } from "../services/hospitalManager";
import { ValidateRegister } from "../utils/validateRegister";
import { Attend } from "../models/attend";

let patient: Attend;
export let recepcionist: Recepcionist = HospitalManager.registerUser(Convert.JsonToRecepcionist(recepcionist1)) as Recepcionist;
export let nurse: Nurse = HospitalManager.registerUser(Convert.JsonToNurse(nurse1)) as Nurse;
export let doctor: Doctor = HospitalManager.registerUser(Convert.JsonToDoctor(doctor1)) as Doctor;

QueueServices.createTicket(2);
QueueServices.createTicket(1);
QueueServices.createTicket(1);
QueueServices.createTicket(3);
QueueServices.createTicket(2);
QueueServices.createTicket(2);
QueueServices.createTicket(3);
QueueServices.createTicket(3);
QueueServices.createTicket(1);
QueueServices.createTicket(1);
console.log('\nFILA DE ATENDIMENTO:\n')
QueueServices.showQueue('attend');
console.log('\nCADASTROS\n');

QueueServices.callNextAttend();
ValidateRegister.verify(Convert.JsonToData(patient1));

QueueServices.callNextAttend();
ValidateRegister.verify(Convert.JsonToData(patient2));

QueueServices.callNextAttend();
ValidateRegister.verify(Convert.JsonToData(patient3));

QueueServices.callNextAttend();
ValidateRegister.verify(Convert.JsonToData(patient4));

QueueServices.callNextAttend();
ValidateRegister.verify(Convert.JsonToData(patient5));

QueueServices.callNextAttend();
ValidateRegister.verify(Convert.JsonToData(patient6));

QueueServices.callNextAttend();
ValidateRegister.verify(Convert.JsonToData(patient7));

QueueServices.callNextAttend();
ValidateRegister.verify(Convert.JsonToData(patient8));

QueueServices.callNextAttend();
ValidateRegister.verify(Convert.JsonToData(patient9));

QueueServices.callNextAttend();
ValidateRegister.verify(Convert.JsonToData(patient10));
console.log('\nFILA DA TRIAGEM:\n')
QueueServices.showQueue('triage');
console.log('\nTRIAGENS:\n');

patient = QueueServices.callNextTriage();
HospitalServices.triage(nurse, Convert.JsonToTriage(triage1));

patient = QueueServices.callNextTriage();
HospitalServices.triage(nurse, Convert.JsonToTriage(triage2));

patient = QueueServices.callNextTriage();
HospitalServices.triage(nurse, Convert.JsonToTriage(triage3));

patient = QueueServices.callNextTriage();
HospitalServices.triage(nurse, Convert.JsonToTriage(triage4));

patient = QueueServices.callNextTriage();
HospitalServices.triage(nurse, Convert.JsonToTriage(triage5));

patient = QueueServices.callNextTriage();
HospitalServices.triage(nurse, Convert.JsonToTriage(triage6));

patient = QueueServices.callNextTriage();
HospitalServices.triage(nurse, Convert.JsonToTriage(triage7));

patient = QueueServices.callNextTriage();
HospitalServices.triage(nurse, Convert.JsonToTriage(triage8));

patient = QueueServices.callNextTriage();
HospitalServices.triage(nurse, Convert.JsonToTriage(triage9));

patient = QueueServices.callNextTriage();
HospitalServices.triage(nurse, Convert.JsonToTriage(triage10));

console.log('\nFILA DA CONSULTA:\n');
QueueServices.showQueue('consult');

console.log('\nCONSULTAS:\n');

HospitalServices.startConsult(true);
HospitalServices.startConsult(true);
HospitalServices.startConsult(true);
HospitalServices.startConsult(true);
HospitalServices.startConsult(true);
HospitalServices.startConsult(true);
HospitalServices.startConsult(true);
HospitalServices.startConsult(true);
HospitalServices.startConsult(true);
HospitalServices.startConsult(true);