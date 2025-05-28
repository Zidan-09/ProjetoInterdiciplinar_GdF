enum QueueReturns {
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

export { QueueReturns, Priority, TypeQueue }