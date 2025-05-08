import { Reception } from "../models/careFlow";
import { Doctor, Nurse, Recepcionist, Admin } from "../models/hospitalStaff";

export class ValidateRegister {
	static async verifyPatient(patient: Reception['patient']): Promise<boolean> {
		// const patients = await prisma.patient.findMany();
		let valid: boolean = true;
		// for (let i of patients) {
		//     if (patient['name'] == i['name'] && patient['dob'] == i['dob']) {
					// valid = false;
			// } 
		// }
		return valid
	};

	static async verifyEmployee(user: Doctor | Nurse | Recepcionist | Admin): Promise<boolean> {
		// const employeers = await prisma.employee.findMany();
		let valid: boolean = true;
		// for (let i of employeers) {
		//     if (patient['name'] == i['name'] && patient['dob'] == i['dob']) {
					// valid = false;
			// } 
		// }
		return valid
	};
}