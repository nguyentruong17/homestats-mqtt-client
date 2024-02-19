export const getCurrentTime = () => {
    const dateStr = new Date().toLocaleString('en-GB') // "09/09/1999, 09:09:09"
    const timeStr = dateStr
        .split(',')[1].trim() // get the time only
        .split(':')
        .slice(0, -1)
        .join(':') // "09:09"

    return timeStr
}
