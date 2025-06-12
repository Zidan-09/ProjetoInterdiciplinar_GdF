enum AdminResponses {
    ShowedCareFlows = 'showed_care_flows',
    ShowCareFlowsFailed = 'show_care_flows_failed',

    ShowedQueueReport = 'showed_queue_report',

    ShowedCareFlowReport = 'showed_care_flow_report',

    EmployeeEdited = 'employee_edited',
    EmployeeEditFailed = 'employee_edit_failed',

    ShowedEmployers = 'showed_employers',
    ShowEmployersFailed = 'show_employers_failed',

    ShowedPatients = 'showed_patients',
    ShowPatientsFailed = 'show_patients_failed',

    PatientFounded = 'patient_founded',
    PatientNotFound = 'patient_not_found',

    ShowedTriageCategories = 'showed_triage_categories',
    ShowTriageCategoriesFailed = 'show_triage_categories_failed',

    TriageCateoriesFetched = 'triage_category_fetched',
    TriageCateoriesFetchFailed = 'triage_categories_fetch_failed',

    TriageCategoryUpdated = 'triage_category_updated',
    TriageCategoryUpdateFailed = 'triage_category_update_failed',

    TriageCategoryCreated = 'triage_category_created',
    TriageCategoryCreateFailed = 'triage_category_create_failed',

    DeletedCategory = 'deleted_category',
    DeleteCategoryFailed = 'delete_category_failed',

    DeletedEmployee = 'deleted_employee',
    DeleteEmployeeFailed = 'delete_employee_failed',
    EmployeeNotFound = 'employee_not_found'
}

enum PatientResponses {
    PatientRegistered = 'patient_registered',
    PatientListed = 'patient_listed',
    Error = 'unexpected_error'
}

enum EmployeeResponses {
    AwaitingConfirmation = 'awaiting_employee_confirmation',
    AwaitingNewPassword = 'awating_new_password',
    PasswordUpdated = 'password_updated',
    RegistrationInProgress = 'registration_in_progress',
    AlreadyRegistered = 'already_registered',
    InvalidOrExpiredToken = 'invalid_or_expired_token',
    EmployeeRegistered = 'employee_registered',
    EmployeeLoggedIn = 'employee_logged_in',
    EmailNonRegistered = 'email_non_registered',
    InvalidInput = 'invalid_input',
    Error = 'unexpected_error'
}

enum CareFlowResponses {
    TicketCreationSucess = 'ticket_created_success',
    TicketCreationFailed = 'ticket_creation_failed',
    CriteriaUpdateSucess = 'criteria_update_sucess',
    CriteriaUptadeFailed = 'criteria_update_failed',
    TriageStarted = 'triage_started',
    TriageEnded = 'triage_ended',
    TriageFailed = 'triage_failed',
    ConsultStarted = 'consult_started',
    ConsultEnded = 'consult_ended',
    ConsultFailed = 'consult_failed',
    PatientNoShow = 'patient_no_show'
}

enum ServerResponses {
    SystemRecovered = 'system_recovered',
    MissingToken = 'missing_token',
    InvalidToken = 'invalid_token',
    Unauthorized = 'unauthorized',
    AccessDenied = 'access_denied',
    InvalidInput = 'invalid_input',
    MissingFields = 'missing_fields',
    NotFound = 'not_found',
    ServerError = 'server_error',
}

enum QueueResponses {
    EmptyQueue = 'empty_queue',
    Found = 'found',
    NotFound = 'not_found',
    Called = 'called'
}

export { AdminResponses, PatientResponses, EmployeeResponses, CareFlowResponses, ServerResponses, QueueResponses }