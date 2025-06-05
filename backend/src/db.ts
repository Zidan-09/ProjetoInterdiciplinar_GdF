import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function openDb() {
    return open({
        filename: './database.db',
        driver: sqlite3.Database,
    });
}

export async function initDb() {
    const db = await openDb();

    await db.exec('PRAGMA foreign_keys = ON');

    await db.exec('CREATE TABLE IF NOT EXISTS Patient (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, dob TEXT NOT NULL, maritalStatus TEXT NOT NULL, cpf TEXT NOT NULL, rg TEXT NOT NULL, contact TEXT NOT NULL, gender TEXT NOT NULL, healthPlan TEXT NOT NULL, address TEXT NOT NULL)');
    
    await db.exec('CREATE TABLE IF NOT EXISTS Employee (id INTEGER PRIMARY KEY AUTOINCREMENT, registrationNumber INTEGER NOT NULL, name TEXT NOT NULL, cpf TEXT NOT NULL, email TEXT NOT NULL, phone TEXT NOT NULL, dob TEXT NOT NULL, address TEXT NOT NULL, hireDate TEXT NOT NULL, workShift TEXT NOT NULL, status TEXT NOT NULL, salary REAL NOT NULL, cnesCode TEXT NOT NULL)');
    await db.exec('CREATE TABLE IF NOT EXISTS Receptionist (id INTEGER PRIMARY KEY, weeklyHours INTEGER NOT NULL, FOREIGN KEY (id) REFERENCES Employee(id))');
    await db.exec('CREATE TABLE IF NOT EXISTS Nurse (id INTEGER PRIMARY KEY, coren TEXT NOT NULL, department TEXT NOT NULL, speciality TEXT NOT NULL, weeklyHours INTEGER NOT NULL, onDuty INTEGER NOT NULL, FOREIGN KEY (id) REFERENCES Employee(id))');
    await db.exec('CREATE TABLE IF NOT EXISTS Doctor (id INTEGER PRIMARY KEY, crm TEXT NOT NULL, specialty TEXT NOT NULL, weeklyHours INTEGER NOT NULL, onDuty INTEGER NOT NULL, FOREIGN KEY (id) REFERENCES Employee(id))');
    await db.exec('CREATE TABLE IF NOT EXISTS Admin (id INTEGER PRIMARY KEY, accessLevel TEXT NOT NULL, weeklyHours INTEGER NOT NULL, FOREIGN KEY (id) REFERENCES Employee(id))');

    await db.exec('CREATE TABLE IF NOT EXISTS CareFlow (id INTEGER PRIMARY KEY AUTOINCREMENT, patient_id INTEGER NOT NULL, receptionist_id INTEGER NOT NULL, checkInHospital TEXT NOT NULL, status TEXT NOT NULL, FOREIGN KEY (patient_id) REFERENCES Patient(id), FOREIGN KEY (receptionist_id) REFERENCES Receptionist(id))');
    await db.exec('CREATE TABLE IF NOT EXISTS Triage (triage_id INTEGER PRIMARY KEY, nurse_id INTEGER NOT NULL, checkInTriage TEXT NOT NULL, checkOutTriage TEXT, systolicPreassure INTEGER, diastolicPreassure INTEGER, heartRate INTEGER, respiratoryRate INTEGER, bodyTemperature INTEGER, oxygenSaturation INTEGER, painLevel INTEGER, symptoms TEXT, triageCategory TEXT, FOREIGN KEY (triage_id) REFERENCES CareFlow(id), FOREIGN KEY (nurse_id) REFERENCES Nurse(id), FOREIGN KEY (triageCategory) REFERENCES TriageCategory(id))');
    await db.exec('CREATE TABLE IF NOT EXISTS Consult (consult_id INTEGER PRIMARY KEY, doctor_id INTEGER NOT NULL, checkInConsult TEXT NOT NULL, checkOutConsult TEXT, diagnosis TEXT, prescriptions TEXT, notes TEXT, FOREIGN KEY (consult_id) REFERENCES CareFlow(id), FOREIGN KEY (doctor_id) REFERENCES Doctor(id))');

    await db.exec('CREATE TABLE IF NOT EXISTS TriageCategory (id INTEGER PRIMARY KEY AUTOINCREMENT, color TEXT NOT NULL, limitTime INTEGER NOT NULL, priority INTEGER NOT NULL)')
    
    await db.exec('CREATE TABLE IF NOT EXISTS User (user_id INTEGER PRIMARY KEY, username TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL, role TEXT, FOREIGN KEY (user_id) REFERENCES Employee(id))');      
}   