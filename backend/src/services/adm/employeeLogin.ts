import { User } from "../../entities/hospitalStaff";
import { db } from "../../db";
import bcrypt from 'bcryptjs';
import { Hash, Jwt } from "../../utils/systemUtils/security";
import { sendEmail } from "../../utils/personsUtils/email";
import { RowDataPacket } from "mysql2";


export const Login = {
    async loginUser(data: User) {
        try {
            const [userData] = await db.execute<RowDataPacket[]>('SELECT * FROM User WHERE username = ?', [data.username]);
            const [role] = await db.execute<RowDataPacket[]>('SELECT accessLevel FROM Employee WHERE id = ?', [userData[0].user_id])

            if (userData) {
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

    async forgotPassword() {
        // FAZER ENVIO DE EMAIL
    },

    async newPassword(data: string) {
        try {
            const password = Hash.hash(data);
            await db.execute('UPDATE User SET password = ?', [password]);

        } catch (error) {
            console.error(error);
        }
    }
}