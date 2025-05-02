export function AttendCalled(): string {
    const call = attendCalled[0];
    attendCalled.shift();
    return call;
};

export function TriageCalled(): string {
    const call = triageCalled[0];
    triageCalled.shift();
    return call;
};

export function ConsultCalled(): string {
    const call = consultCalled[0];
    consultCalled.shift();
    return call;
}


export const attendCalled: string[] = [];
export const triageCalled: string[] = [];
export const consultCalled: string[] = [];