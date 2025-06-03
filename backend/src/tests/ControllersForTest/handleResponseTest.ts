export function HandleResponseTest(status: boolean, statusNumber: number, message: string, data: any | null) {
    if (status) {
        console.log( {
            status: status,
            statusNumber: statusNumber,
            message: message,
            data: data
        } )
    } else {
        console.log( {
            status: status,
            statusNumber: statusNumber,
            message: message
        } )
    }
}