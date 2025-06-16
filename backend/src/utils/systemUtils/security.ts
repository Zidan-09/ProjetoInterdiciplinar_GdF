import bcrypt from 'bcryptjs';
import { Employee, Nurse, Doctor } from '../../entities/hospitalStaff';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { db } from '../../db';
import { RowDataPacket } from 'mysql2';
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const EXPIRATION = '72h';

export const Hash = {
    async hash(password: string): Promise<string> {
        const hashed = await bcrypt.hash(password, 10);
        return hashed
    },

    async compare(id: number, password: string): Promise<boolean> {
        const [passworddb]: any = await db.execute<RowDataPacket[]>('SELECT * FROM User WHERE id = ?', [id]);
        const valid = await bcrypt.compare(password, passworddb[0].password);
        return valid;
    }
};

export const Jwt = {
    generateRegisterToken<T extends Employee | Nurse | Doctor>(payload: T): string {
        const token: string = jwt.sign(payload, JWT_SECRET!, {expiresIn: EXPIRATION});
        return token;
    },

    verifyRegisterToken<T extends Employee | Nurse | Doctor>(data: string) {
        try {
            const token = jwt.verify(data, process.env.JWT_SECRET!) as T;
            return token
        } catch (error) {
            console.error(error);
        }
    },

    generateLoginToken(id: number) {
        const token: string = jwt.sign({ id: id }, process.env.JWT_SECRET!, { expiresIn: '24h' });
        return token
    },

    verifyLoginToken(data: string) {
        try {
            const token = jwt.verify(data, process.env.JWT_SECRET!) as JwtPayload;
            return token;
            
        } catch (error) {
            console.error(error);
        }
    }
};
