import {
    getAverageOrReturnNull,
    getMaxOrReturnNull,
    getMinOrReturnNull
} from "./numberAPI";

const TIME_MESURE = " H";

const getTimeComponentInCorrectFormat = (value) => ("0" + value).slice(-2);

const getWeekDay = (date) => {
    const weekdays =
        [
            'Sun.', 'Mon.', 'Tue.', 'Wed.',
            'Thu.', 'Fri.', 'Sat.'
        ];

    return weekdays[(new Date(date)).getDay()];
}

const getFullWeekDay = (date) => {
    const weekdays =
        [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday',
            'Thursday', 'Friday', 'Saturday'
        ];

    return weekdays[(new Date(date)).getDay()];
}

const getFullMonthName = (number) => {
    const monthes =
        [
            'January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'
        ];

    return monthes[number];
}

const getMonthName = (number) => {
    const monthes =
        [
            'Jan.', 'Feb.', 'Mar.',
            'Apr.', 'May', 'Jun.',
            'Jul.', 'Aug.', 'Sep',
            'Oct.', 'Nov.', 'Dec.'
        ];

    return monthes[number];
}

const getDateInStringFormat = (date) => {
    date = new Date(date);

    return getTimeComponentInCorrectFormat(date.getDate()) + "." +
        getTimeComponentInCorrectFormat((date.getMonth() + 1)) + "." +
        date.getFullYear();
}

const getTimeTooltip = (date, hours) => {
    return getFullWeekDay(date) + ' ' + getDateInStringFormat(date) +
        '\r\nSleep hours: ' + hours + ' H';
}

const getMonthTooltip = (monthSleepTime) => {
    return getFullMonthName(monthSleepTime.monthNumber) + ' ' +
        '\r\n Average sleep hours: ' + monthSleepTime.averageSleepTime + ' H';
}

const getAverageSleepingTime = (data) => {
    const average = getAverageOrReturnNull(data);
    if (average === null) {
        return "-";
    }

    return average + TIME_MESURE;
}

const getMaxSleepingTime = (data) => {
    const max = getMaxOrReturnNull(data);
    if (max === null) {
        return "-";
    }

    return max + TIME_MESURE;
}

const getMinSleepingTime = (data) => {
    const min = getMinOrReturnNull(data);
    if (min === null) {
        return "-";
    }

    return min + TIME_MESURE;
}

export {
    getWeekDay,
    getMonthName,
    getDateInStringFormat,
    getTimeTooltip,
    getMonthTooltip,
    getAverageSleepingTime,
    getMaxSleepingTime,
    getMinSleepingTime,
    getTimeComponentInCorrectFormat
}