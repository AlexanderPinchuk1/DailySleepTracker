import StatisticsCard from './StatisticsCard';
import { getDateInStringFormat } from "../../api/timeAPI";

const DayStatisticsCard = ({ data }) => {
    const getPeriod = () => {
        if (data === null) {
            return "-";
        }

        return getDateInStringFormat(data.date);
    } 

    const getTotalHoursCount = () => {
        if (data === null || data.hours === null) {
            return "-";
        }

        return data.hours + " H";
    }

    return (
        <StatisticsCard data={{
            title: "Statistics",
            period: getPeriod(),
            points: [
                {
                    id: 1,
                    title: "Total:",
                    text: getTotalHoursCount()
                }]
        }} />
    );
}

export default DayStatisticsCard;