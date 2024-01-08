import { getTokenFromLocalStorage } from './tokenAPI'

const getDayStatisticsOrReturnNullAsync = async (date) => {
    const response = await fetch("/api/Statistics/Day?date=" + date.toJSON(), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getTokenFromLocalStorage()
        }
    });

    if (response.ok === true) {
        return await response.json();
    }

    return null;
}

const getWeekStatisticsOrReturnNullAsync = async (date) => {
    const response = await fetch("/api/Statistics/Week?date=" + date.toJSON(), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getTokenFromLocalStorage()
        }
    });

    if (response.ok === true) {
        return await response.json();
    }

    return null;
}

const getMonthStatisticsOrReturnNullAsync = async (date) => {
    const response = await fetch("/api/Statistics/Month?date=" + date.toJSON(), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getTokenFromLocalStorage()
        }
    });

    if (response.ok === true) {
        return await response.json();
    }

    return null;
}

const getYearStatisticsOrReturnNullAsync = async (date) => {
    const response = await fetch("/api/Statistics/Year?date=" + date.toJSON(), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getTokenFromLocalStorage()
        }
    });

    if (response.ok === true) {
        return await response.json()
    }

    return null;
}

const getFullStatisticsOrReturnNullAsync = async (date) => {
    const response = await fetch("/api/Statistics/Full?date=" + date.toJSON(), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getTokenFromLocalStorage()
        }
    });

    if (response.ok === true) {
        return await response.json();
    }

    return null;
}

export {
    getDayStatisticsOrReturnNullAsync,
    getWeekStatisticsOrReturnNullAsync,
    getMonthStatisticsOrReturnNullAsync,
    getYearStatisticsOrReturnNullAsync,
    getFullStatisticsOrReturnNullAsync
};