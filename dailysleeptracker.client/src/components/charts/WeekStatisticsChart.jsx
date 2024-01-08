import { Chart } from "react-google-charts";
import { getWeekDay, getTimeTooltip } from "../../api/timeAPI";


const WeekStatisticsChart = ({ data }) => {

    const getChartData = () => {
        if (data === null) {
            return ["", "", 0, ""];
        }

        return data.map((sleepEntry) => {
            return [
                getWeekDay(sleepEntry.date),
                parseFloat(sleepEntry.hours),
                "#ffdb99",
                getTimeTooltip(sleepEntry.date, sleepEntry.hours)]
        }); 
    }

    return (
        <Chart
            chartType="ColumnChart"
            width="100%"
            height="100%"
            data={[
                ["Element", "Sleep hours", { role: "style" }, { role: "tooltip" }],
                ...getChartData()
            ]}
            options={{
                colors: ["#ffdb99"],
                fontName: 'Comic Sans MS',
                fontSize: 14,
                hAxis: {
                    slantedText: true
                }
            }} />
    );

}

export default WeekStatisticsChart;