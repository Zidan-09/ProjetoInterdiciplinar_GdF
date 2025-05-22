import { CareFlow } from "../models/careFlow";
import { Doctor, Nurse, Receptionist, Admin } from "../models/hospitalStaff";
import { openDb } from "../db";

const db = openDb();

export class ValidateRegister {
	static async verifyPatient(patient: CareFlow['patient']): Promise<boolean> {
		try {
			(await db).get('SELECT * FROM Patient WHERE name = ?, cpf = ?, rg = ?', [patient.name, patient.cpf, patient.rg], (err: any, row: any) => {
				if (err) {
					console.log('Erro na busca')
				}

				if (row) {
					console.log('Paciente já cadastrado')
					return false
				} else {
					return true
				}
			});
		} catch (error) {
			console.log('Sla, deu pau aki');
		}
		return false
	};

	static async verifyEmployee(user: Doctor | Nurse | Receptionist | Admin): Promise<boolean> {
		try {
			(await db).get('SELECT * FROM Employee WHERE name = ?, cpf = ?', [user.name, user.cpf], (err: any, row: any) => {
				if (err) {
					console.log('Erro na busca')
				}

				if (row) {
					console.log('Empregado já cadastrado')
					return false
				} else {
					return true
				}
			});
		} catch (error) {
			console.log('Sla, deu pau aki');
		}
		return false
	};
}