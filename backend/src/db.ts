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
    await db.exec('CREATE TABLE IF NOT EXISTS Nurse (id INTEGER PRIMARY KEY, coren TEXT NOT NULL, department TEXT NOT NULL, speciality TEXT NOT NULL, weeklyHours INTEGER NOT NULL, onDuty INTEGER, FOREIGN KEY (id) REFERENCES Employee(id))');
    await db.exec('CREATE TABLE IF NOT EXISTS Doctor (id INTEGER PRIMARY KEY, crm TEXT NOT NULL, specialty TEXT NOT NULL, weeklyHours INTEGER NOT NULL, onDuty INTEGER, FOREIGN KEY (id) REFERENCES Employee(id))');
    await db.exec('CREATE TABLE IF NOT EXISTS Admin (id INTEGER PRIMARY KEY, accessLevel TEXT NOT NULL, weeklyHours INTEGER NOT NULL, FOREIGN KEY (id) REFERENCES Employee(id))');

    await db.exec('CREATE TABLE IF NOT EXISTS CareFlow (id INTEGER PRIMARY KEY AUTOINCREMENT, patient_id INTEGER NOT NULL, receptionist_id INTEGER NOT NULL, date TEXT NOT NULL, status TEXT NOT NULL, FOREIGN KEY (patient_id) REFERENCES Patient(id), FOREIGN KEY (receptionist_id) REFERENCES Receptionist(id))');
    await db.exec('CREATE TABLE IF NOT EXISTS Triage (id INTEGER PRIMARY KEY, nurse_id INTEGER NOT NULL, systolicPreassure INTEGER NOT NULL, diastolicPreassure INTEGER NOT NULL, heartRate INTEGER NOT NULL, respiratoryRate INTEGER NOT NULL, bodyTemperature INTEGER NOT NULL, oxygenSaturation INTEGER NOT NULL, triageCategory TEXT NOT NULL, painLevel INTEGER, FOREIGN KEY (id) REFERENCES Attend(id), FOREIGN KEY (nurse_id) REFERENCES Nurse(id))');
    await db.exec('CREATE TABLE IF NOT EXISTS Consult (id INTEGER PRIMARY KEY, doctor_id INTEGER NOT NULL, checkInConsult TEXT NOT NULL, checkOutConsult TEXT, diagnosis TEXT, prescriptions TEXT, notes TEXT, FOREIGN KEY (id) REFERENCES Attend(id), FOREIGN KEY (doctor_id) REFERENCES Doctor(id))');

    await db.exec('CREATE TABLE IF NOT EXISTS Symptom (triage_id INTEGER PRIMARY KEY, symptom TEXT, FOREIGN KEY (triage_id) REFERENCES Triage(id))');
    
    await db.exec('CREATE TABLE IF NOT EXISTS User (user_id INTEGER PRIMARY KEY, username TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL, role TEXT NOT NULL, FOREIGN KEY (user_id) REFERENCES Employee(id))');      
}   