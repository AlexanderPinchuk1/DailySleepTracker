import { Chart } from "react-google-charts";
import { getWeekDay, getDateInStringFormat, getTimeTooltip } from "../../api/timeAPI";

const DayStatisticsChart = ({ data }) => {

    const getChartData = () => {
        if (data === null) {
            return ["", "", 0, ""];
        }

        return [
            getWeekDay(data.date) + ' ' + getDateInStringFormat(data.date),
            parseFloat(data.hours),
            "#ffdb99",
            getTimeTooltip(data.date, data.hours)];
    }

    return (
        <Chart
            chartType="ColumnChart"
            width="100%"
            height="100%"
            data={[
                ["Element", "Sleep hours", { role: "style" }, { role: "tooltip" }],
                getChartData()
            ]}
            options={{
                colors: ["#ffdb99"],
                fontName: 'Comic Sans MS',
                fontSize: 14
            }} />
    );
    
}

export default DayStatisticsChart;