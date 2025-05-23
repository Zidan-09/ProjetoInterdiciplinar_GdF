# Modelo Relacional 

## Tabela `Employee`
| Campo               | Tipo         | Descrição               |
|---------------------|--------------|-------------------------|
| id                  | INT          | **PK**                  |
| registrationNumber  | VARCHAR      | Número de registro      |
| name                | VARCHAR(100) | Nome completo           |
| cpf                 | CHAR(11)     | CPF                     |
| email               | VARCHAR(100) | Email                   |
| phone               | VARCHAR(20)  | Telefone                |
| address             | TEXT         | Endereço                |
| dob                 | DATE         | Data de nascimento      |
| hireDate            | DATE         | Data de contratação     |
| workShift           | ENUM         | Turno de trabalho       |
| status              | ENUM         | Status (ativo/inativo)  |
| salary              | DECIMAL(10,2)| Salário                 |
| cnesCode            | VARCHAR(20)  | Código CNES             |

## Tabela `User` (Herda de Employee)
| Campo       | Tipo         | Descrição               |
|-------------|--------------|-------------------------|
| user_id     | INT          | **PK FK → Employee(id)**|
| username    | VARCHAR(50)  | Nome de usuário         |
| email       | VARCHAR(100) | Email de login          |
| password    | VARCHAR(255) | Senha hash              |
| role        | ENUM         | **FK → Employee(role)** |

## Tabela `Recep` (Herda de Employee)
| Campo            | Tipo         | Descrição               |
|------------------|--------------|-------------------------|
| receptionist_id  | INT          | **PK FK → Employee(id)**|
| weeklyHours      | INT          | Horas semanais         |

## Tabela `Nurse` (Herda de Employee)
| Campo            | Tipo         | Descrição               |
|------------------|--------------|-------------------------|
| nurse_id         | INT          | **PK FK → Employee(id)**|
| coren            | VARCHAR(20)  | Registro COREN          |
| department       | VARCHAR(50)  | Departamento            |
| specialty        | VARCHAR(50)  | Especialidade           |
| weeklyHours      | INT          | Horas semanais         |
| onDuty           | BOOLEAN      | Plantão atual           |

## Tabela `Doctor` (Herda de Employee)
| Campo            | Tipo         | Descrição               |
|------------------|--------------|-------------------------|
| doctor_id        | INT          | **PK FK → Employee(id)**|
| crm              | VARCHAR(20)  | Registro CRM            |
| speciality       | VARCHAR(50)  | Especialidade           |
| weeklyHours      | INT          | Horas semanais         |
| onDuty           | BOOLEAN      | Plantão atual           |

## Tabela `Admin` (Herda de Employee)
| Campo            | Tipo         | Descrição               |
|------------------|--------------|-------------------------|
| admin_id         | INT          | **PK FK → Employee(id)**|
| accessLevel      | VARCHAR(20)  | Nível de acesso         |
| weeklyHours      | INT          | Horas semanais         |

## Tabela `Patient`
| Campo           | Tipo         | Descrição               |
|-----------------|--------------|-------------------------|
| id              | INT          | **PK**                  |
| name            | VARCHAR(100) | Nome completo           |
| dob             | DATE         | Data de nascimento      |
| maritalStatus   | ENUM         | Estado civil            |
| cpf             | CHAR(11)     | CPF                     |
| rg              | VARCHAR(20)  | RG                      |
| contact         | VARCHAR(20)  | Contato                 |
| gender          | ENUM         | Gênero                  |
| healthPlan      | VARCHAR(50)  | Plano de saúde          |
| address         | TEXT         | Endereço                |

## Tabela `CareFlow`
| Campo            | Tipo         | Descrição               |
|------------------|--------------|-------------------------|
| id               | INT          | **PK**                  |
| receptionist_id  | INT          | **FK → Recep(id)**      |
| patient_id       | INT          | **FK → Patient(id)**    |
| time             | DATETIME     | Horário do atendimento  |
| status           | ENUM         | Estado atual do atendimento |

## Tabela `Triage`
| Campo               | Tipo         | Descrição               |
|---------------------|--------------|-------------------------|
| triage_id           | INT          | **PK FK → Attend(id)**  |
| nurse_id            | INT          | **FK → Nurse(id)**      |
| systolic            | INT          | Pressão sistólica       |
| diastolic           | INT          | Pressão diastólica      |
| heartRate           | INT          | Frequência cardíaca     |
| respiratoryRate     | INT          | Frequência respiratória |
| bodyTemperature     | DECIMAL(3,1) | Temperatura corporal    |
| oxygenSaturation    | INT          | Saturação de O₂         |
| painLevel           | INT          | Nível de dor (0-10)     |
| triageCategory      | ENUM  | Prioridade (emergência/muito urgente/urgente/pouco urgente/não urgente) |

## Tabela `Symptom`
| Campo            | Tipo         | Descrição               |
|------------------|--------------|-------------------------|
| symptom_id       | INT          | **PK**                  |
| triage_id        | INT          | **FK → Triage(id)**     |
| symptom          | TEXT         | Descrição do sintoma    |

## Tabela `Consult`
| Campo            | Tipo         | Descrição               |
|------------------|--------------|-------------------------|
| consult_id       | INT          | **PK FK → Attend(id)**  |
| doctor_id        | INT          | **FK → Doctor(id)**     |
| checkInConsult   | DATETIME     | Horário de entrada      |
| checkOutConsult  | DATETIME     | Horário de saída        |
| diagnosis        | TEXT         | Diagnóstico             |
| prescriptions    | TEXT         | Prescrições             |
| notes            | TEXT         | Observações             |

---

## Relacionamentos
1. `Employee` (1) → `User`, `Recep`, `Nurse`, `Doctor`, `Admin` (1:1 - Herança)
2. `Recep` (1) → `Attend` (1:N)  
3. `Patient` (1) → `Attend` (1:N)  
4. `Attend` (1) → `Triage` (1:1)  
5. `Triage` (1) → `Symptom` (1:N)  
6. `Attend` (1) → `Consult` (1:1)  
7. `Nurse` (1) → `Triage` (1:N)  
8. `Doctor` (1) → `Consult` (1:N)  
