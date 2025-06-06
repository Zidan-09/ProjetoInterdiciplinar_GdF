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

enum PatientResponses {
    PatientRegistered = 'patient_registered',
    PatientListed = 'patient_listed',
    Error = 'unexpected_error'
}

enum EmployeeStatus {
    active = 'active',
    onLeave = 'onLeave',
    resigned = 'resigned'
}

enum EmployeeType {
    Receptionist,
    Nurse,
    Doctor,
    Admin
}

enum EmployeeResponseMessage {
    AwaitingConfirmation = 'awaiting_employee_confirmation',
    RegistrationInProgress = 'registration_in_progress',
    AlreadyRegistered = 'already_registered',
    InvalidOrExpiredToken = 'invalid_or_expired_token',
    EmployeeRegistered = 'employee_registered',
    EmployeeLoggedIn = 'employee_logged_in',
    Error = 'unexpected_error'
}

enum Status {
    WaitingTriage = 'waiting_triage',
    WaitingConsultation = 'waiting_consultation',
    InConsultation = 'in_consult',
    InTriage = 'in_triage',
    Attended  = 'attended',
    NoShow = 'no_show'
}

export { Gender, MaritalStatus, PatientResponses, EmployeeStatus, EmployeeType, EmployeeResponseMessage, Status }