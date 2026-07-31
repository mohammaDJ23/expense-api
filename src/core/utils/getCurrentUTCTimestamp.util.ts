export function getCurrentUTCTimestamp(date?: Date | string): string {
    let currentDate = new Date();

    if (date) {
        currentDate = new Date(date);
    }

    return currentDate.toISOString();
}
