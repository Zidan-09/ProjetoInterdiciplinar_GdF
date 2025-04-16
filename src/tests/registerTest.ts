import { PatientRegistration } from "../services/patientServices";
import { Convert } from "../utils/convertJson";
import patient1 from "../Json/patient1.json";

PatientRegistration.register(Convert.JsonToPatient(patient1));