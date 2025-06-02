export function HandleResponseTest(status: boolean, statusNumber: number, message: string, data: any | null) {
    if (status) {
        return {
            status: status,
            statusNumber: statusNumber,
            message: message,
            data: data
        }
    } else {
        return {
            status: status,
            statusNumber: statusNumber,
            message: message
        }
    }
}