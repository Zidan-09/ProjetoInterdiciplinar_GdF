import { Doctor, Employee, Nurse } from "../../entities/hospitalStaff";
import { db } from "../../db";
import { RowDataPacket } from "mysql2";
import { Patient } from "../../entities/patient";

export class ValidateRegister {
	static async verifyPatient(patient: Patient): Promise<boolean|undefined> {
		try {
			const [row] = await db.execute<RowDataPacket[]>(
				'SELECT * FROM Patient WHERE name = ? AND cpf = ? AND rg = ?',
				[patient.name, patient.cpf, patient.rg]
			);

			if (row.length > 0) {
				return false;
			} else {
				return true;
			}

		} catch (error) {
			console.error(error);
		}
	};

	static async verifyEmployee(user: Employee | Doctor | Nurse): Promise<boolean|undefined> {
		try {
			const [row] = await db.execute<RowDataPacket[]>(
				'SELECT * FROM Employee WHERE name = ? AND cpf = ?',
				[user.name, user.cpf]
			);
			
			if (row.length > 0) {
				return false;
			} else {
				return true;
			}
		} catch (error) {
			console.error(error);
		}
	}
}