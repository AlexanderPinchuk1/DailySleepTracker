import StatisticsCard from './StatisticsCard';
import {
    getDateInStringFormat,
    getAverageSleepingTime,
    getMaxSleepingTime,
    getMinSleepingTime
} from "../../api/timeAPI";

const YearStatisticsCard = ({ data }) => {
    const getFilteredSleepHours = () => {
        if (data === null || data.length === 0) {
            return [];
        }

        const filteredData = data.filter(
            sleepEntry => sleepEntry.averageSleepTime !== null &&
            sleepEntry.averageSleepTime !== 0);

        if (filteredData.length === 0) {
            return [];
        }

        return filteredData.map(sleepEntry => sleepEntry.averageSleepTime);
    };

    const getDatePeriod = () => {
        if (data === null || data.length === 0) {
            return "-";
        }

        if (data.filter(sleepEntry => sleepEntry.year !== data[0].year).length !== 0) {
            return "-";
        }

        const earlierDate = new Date(data[0].year,
            Math.min(...data.map(sleepEntry => sleepEntry.monthNumber)), 1);
        const laterDate = new Date(data[0].year,
            Math.max(...data.map(sleepEntry => sleepEntry.monthNumber)), 31);

        return earlierDate.getDate() + "-" + getDateInStringFormat(laterDate);
    }

    return (
        <StatisticsCard data={{
            title: "Statistics",
            period: getDatePeriod(),
            points: [
                { id: 1, title: "Average:", text: getAverageSleepingTime(getFilteredSleepHours()) },
                { id: 2, title: "Max:", text: getMaxSleepingTime(getFilteredSleepHours()) },
                { id: 3, title: "Min:", text: getMinSleepingTime(getFilteredSleepHours()) }
            ]
        }} />
    );
}

export default YearStatisticsCard;