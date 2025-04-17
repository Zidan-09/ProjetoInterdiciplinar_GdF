import { PatientRegistration } from "../services/patientServices";
import { Convert } from "../utils/convertJson";
import patient1 from "../Json/patient1.json";
import fs from 'fs';

PatientRegistration.register(Convert.JsonToData(patient1));