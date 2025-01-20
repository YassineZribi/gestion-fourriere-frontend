export function getDayOrMonth(month: string | null, dateStr: string) {
    return month != null ? new Date(dateStr).getDate() : new Date(dateStr).getMonth() + 1
}