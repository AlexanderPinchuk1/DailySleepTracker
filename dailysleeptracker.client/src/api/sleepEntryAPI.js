import { getTokenFromLocalStorage } from './tokenAPI'

const getSleepEntryByDateAsync = async (date) => {
    return await fetch("/api/SleepEntry?date=" + date, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getTokenFromLocalStorage()
        }
    })
};

const saveSleepEntryAsync = async (data) => {
    return await fetch("/api/SleepEntry/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getTokenFromLocalStorage()
        },
        body: JSON.stringify(data)
    });
}

const updateSleepEntryAsync = async (data) => {
    return await fetch("/api/SleepEntry/", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getTokenFromLocalStorage()
        },
        body: JSON.stringify(data)
    });
}

const deleteSleepEntryAsync = async (id) => {
    return await fetch("/api/SleepEntry?id=" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getTokenFromLocalStorage()
        },
    });
}

export {
    getSleepEntryByDateAsync,
    saveSleepEntryAsync,
    updateSleepEntryAsync,
    deleteSleepEntryAsync,
};