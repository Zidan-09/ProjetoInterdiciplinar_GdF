import { AttendQ, TriageQ, ConsultQ } from "../models/queue";
import { HospitalServices } from "../services/hospitalService";
import { QueueServices } from "../services/queueService";
import { PatientRegistration } from "../services/patientServices";
import { Convert } from "../utils/convertJson";
import { Patient } from "../models/patient";
import patient1 from '../Json/patient1.json'
import triage1 from '../Json/triage1.json'
import recepcionist1 from '../Json/recepcionist.json'
import nurse1 from '../Json/nurse.json'
import doctor1 from '../Json/doctor.json'
import { Doctor, Nurse, Recepcionist } from "../models/hospitalStaff";
import { HospitalManager } from "../services/hospitalManager";

let patient: Patient;
let recepcionist: Recepcionist = HospitalManager.registerUser(Convert.JsonToRecepcionist(recepcionist1)) as Recepcionist;
let nurse: Nurse = HospitalManager.registerUser(Convert.JsonToNurse(nurse1)) as Nurse;
let doctor: Doctor = HospitalManager.registerUser(Convert.JsonToDoctor(doctor1)) as Doctor;

QueueServices.createTicket(2);

QueueServices.callNextAttend();

patient = PatientRegistration.register(Convert.JsonToData(patient1));
