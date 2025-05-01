import { AdminData, DoctorData, NurseData, RecepcionistData, RegistrationPatient } from "../models/interfaces";

export class ValidateRegister {
	static verifyPatient(patient: RegistrationPatient['patient']): Boolean {
		const temporario: number = 10;
		if (temporario > 0) {
			return true;
		} else {
			return false;
		}
	};

	static verifyUser(user: RecepcionistData | NurseData | DoctorData | AdminData): Boolean {
		return true;
	}
}