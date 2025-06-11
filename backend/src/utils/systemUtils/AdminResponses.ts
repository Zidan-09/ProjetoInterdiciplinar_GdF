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
}

enum Periods {
    Day = 'day',
    Week = 'week',
    Month = 'month',
    Year = 'year'
}

export { AdminResponses, Periods }