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

export { Gender, MaritalStatus, EmployeeStatus, EmployeeType, EmployeeResponseMessage }