export function formatDate(dateArray) {
    if (!Array.isArray(dateArray) || dateArray.length < 3) {
        return "";
    }
    const year = dateArray[0];
    const month = String(dateArray[1]).padStart(2, "0");
    const day = String(dateArray[2]).padStart(2, "0");

    return `${day}-${month}-${year}`; // Форматируем дату как DD-MM-YYYY
}