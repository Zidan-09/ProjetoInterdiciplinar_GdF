import { Reception } from "../models/careFlow";
import { Doctor, Nurse, Recepcionist, Admin } from "../models/hospitalStaff";

export class ValidateRegister {
	static verifyPatient(patient: Reception['patient']) { //Boolean
		return true
	};

	static verifyEmployee(user: Doctor | Nurse | Recepcionist | Admin) { // Boolean
		return true
	};
}