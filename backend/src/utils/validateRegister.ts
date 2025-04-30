import { PatientServices } from "../services/patientServices";
import { Patient } from "../models/patient";
import { Registration } from "../models/interfaces";

export class ValidateRegister {
	static verify(patient: Registration['patient']): boolean {
		const temporario: number = 10;
		if (temporario > 0) {
			return true;
		} else {
			return false;
		}
	}
}