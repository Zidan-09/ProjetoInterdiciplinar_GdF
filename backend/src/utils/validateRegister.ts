import { PatientRegistration } from "../services/patientServices";
import { DB } from "../simulateBD/Bd";
import { DataBase } from "../simulateBD/Bd";
import { Patient } from "../models/patient";

export class ValidateRegister {
	static verify(json: any) {
		const patient: Patient | undefined = DataBase.searchByName(json.name);
		if (patient != undefined) {
			console.log('Paciente já cadastrado!');
		} else {
			PatientRegistration.register(json);
		}
	}
}