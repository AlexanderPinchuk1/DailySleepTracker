
const getAverageOrReturnNull = (data) => {
    if (data === null || data.length === 0) {
        return null;
    }

    return round(data.reduce((accumulator, item) =>
        accumulator + item, 0) / data.length, 2);
}

const getMaxOrReturnNull = (data) => {
    if (data === null || data.length === 0) {
        return null;
    }

    return Math.max(...data);
};

const getMinOrReturnNull = (data) => {
    if (data === null || data.length === 0) {
        return null;
    }

    return Math.min(...data);
}

const round = (number, digitCount) => {
    return Math.round((number + Number.EPSILON) * Math.pow(10, digitCount)) /
        Math.pow(10, digitCount);
}

export {
    getAverageOrReturnNull,
    getMaxOrReturnNull,
    getMinOrReturnNull
}