enum QueueResponses {
    EmptyQueue = 'empty_queue',
    Found = 'found',
    NotFound = 'not_found',
    Called = 'called'
}

enum Priority {
    VeryPriority = 'very_priority',
    Priority = 'priority',
    NonPriority = 'non_priority'
}

enum TypeQueue {
    Recep = 'recep',
    Triage = 'triage',
    Consult = 'consult'
}

export { QueueResponses, Priority, TypeQueue }