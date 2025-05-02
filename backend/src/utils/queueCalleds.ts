export function AttendCalled(): string {
    return attendCalled[0];
};

export function TriageCalled() {
    return triageCalled[0];
};

export function ConsultCalled() {
    return consultCalled[0];
}


export const attendCalled: string[] = [];
export const triageCalled: string[] = [];
export const consultCalled: string[] = [];