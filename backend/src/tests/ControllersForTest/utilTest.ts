export function waitTime(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}