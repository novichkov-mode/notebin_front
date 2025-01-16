export function convertTimeToDuration(timeString){
    if (timeString){
        const [hours, minutes] = timeString.split(':').map(Number);
        return `PT${hours}H${minutes}M`; // Формат ISO-8601 для Duration
    }
    return null;
}