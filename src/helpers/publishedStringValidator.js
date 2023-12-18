export function publishedString(date) {
    const publishedDate = new Date(date),
        currentDate = new Date();

    if (publishedDate > currentDate) {
        return "только что";
    } else if (currentDate - publishedDate < 24 * 60 * 60 * 1000) {
        const hoursAgoNumber = Math.floor(
            (currentDate - publishedDate) / (60 * 60 * 1000)
        );
        switch (hoursAgoNumber) {
            case 0:
                return `недавно`;
            case 1:
            case 21:
                return `${hoursAgoNumber} час назад`;
            case 2:
            case 3:
            case 4:
            case 22:
            case 23:
            case 24:
                return `${hoursAgoNumber} часа назад`;
            default:
                return `${hoursAgoNumber} часов назад`;
        }
    } else {
        return publishedDate.toLocaleDateString("en-GB");
    }
}
