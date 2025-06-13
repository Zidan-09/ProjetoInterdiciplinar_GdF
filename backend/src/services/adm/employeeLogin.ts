import { User } from "../../entities/hospitalStaff";
import { db } from "../../db";
import bcrypt from 'bcryptjs';
import { Hash, Jwt } from "../../utils/systemUtils/security";
import { sendEmail } from "../../utils/personsUtils/email";
import { RowDataPacket } from "mysql2";
import { EmployeeResponses } from "../../utils/enuns/allResponses";

export const Login = {
    async loginUser(data: User): Promise<{ user: string, token: string, role: RowDataPacket } | undefined> {
        try {
            const [userData] = await db.execute<RowDataPacket[]>('SELECT * FROM User WHERE username = ?', [data.username]);
            const [role] = await db.execute<RowDataPacket[]>('SELECT accessLevel FROM Employee WHERE id = ?', [userData[0].user_id])

            if (userData.length) {
                const valid: boolean = await bcrypt.compare(data.password, userData[0].password);

                if (valid) {
                    const token = Jwt.generateLoginToken(userData[0].user_id);

                    return {
                        user: userData[0].username,
                        token: token,
                        role: role[0]
                    }
                }
            }

        } catch (error) {
            console.error(error);
        }
    },

    async forgotPassword(email: string): Promise<EmployeeResponses|undefined> {
        try {
            const [row] = await db.execute<RowDataPacket[]>('SELECT id FROM Employee WHERE email = ?', [email]);
    
            if (row.length) {
                const token = Jwt.generateLoginToken(row[0].id);
        
                const result = await sendEmail.forgot(email, token);
        
                if (result) {
                    return EmployeeResponses.AwaitingNewPassword;
                }

            } else {
                return EmployeeResponses.EmailNonRegistered;
            }
        } catch (error) {
            console.error(error);
            return undefined;
        }
    },

    async newPassword(data: string): Promise<boolean|undefined> {
        try {
            const password = Hash.hash(data);
            await db.execute('UPDATE User SET password = ?', [password]);
            return true;

        } catch (error) {
            console.error(error);
            return undefined;
        }
    }
}