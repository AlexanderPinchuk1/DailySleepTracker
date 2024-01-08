import StatisticsCard from './StatisticsCard';
import {
    getDateInStringFormat,
    getAverageSleepingTime,
    getMaxSleepingTime,
    getMinSleepingTime
} from "../../api/timeAPI";

const WeekAndMonthStatisticsCard = ({ data }) => {
    const getFilteredSleepHours = () => {
        if (data === null || data.length === 0 ) {
            return [];
        }

        const filteredData = data.filter(sleepEntry => sleepEntry.hours !== null);
        if (filteredData.length === 0) {
            return [];
        }

        return filteredData.map(sleepEntry => sleepEntry.hours);
    };

    const getDatePeriod = () => {
        if (data === null) {
            return "-";
        }

        const earlierDate = new Date(Math.min(...data.map(sleepEntry =>
            new Date(sleepEntry.date).getTime())));
        const laterDate = new Date(Math.max(...data.map(sleepEntry =>
            new Date(sleepEntry.date).getTime())));

        return earlierDate.getDate() + "-" + getDateInStringFormat(laterDate);
    }

    return (
        <StatisticsCard data={{
            title: "Statistics",
            period: getDatePeriod(),
            points:
            [
                { id: 1, title: "Average:", text: getAverageSleepingTime(getFilteredSleepHours()) },
                { id: 2, title: "Max:", text: getMaxSleepingTime(getFilteredSleepHours()) },
                { id: 3, title: "Min:", text: getMinSleepingTime(getFilteredSleepHours()) }
            ]
        }} />
    );
}

export default WeekAndMonthStatisticsCard;