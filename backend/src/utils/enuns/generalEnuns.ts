enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

enum MaritalStatus {
    Single = 'single',
    Married = 'married',
    Divorced = 'divorced',
    Separated = 'separated',
    Widowed = 'widowed'
}

enum EmployeeStatus {
    active = 'active',
    onLeave = 'onLeave',
    resigned = 'resigned'
}

enum EmployeeType {
    Receptionist = 'receptionist',
    Nurse = 'nurse',
    Doctor = 'doctor',
    Admin = 'admin'
}

enum Status {
    WaitingTriage = 'waiting_triage',
    WaitingConsultation = 'waiting_consultation',
    InConsultation = 'in_consult',
    InTriage = 'in_triage',
    Attended  = 'attended',
    NoShow = 'no_show'
}

export { Gender, MaritalStatus, EmployeeStatus, EmployeeType, Status }