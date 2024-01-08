import { Chart } from "react-google-charts";
import { getTimeTooltip } from "../../api/timeAPI";

const MonthStatisticsChart = ({ data }) => { 
    const getChartData = () => {
        if (data === null) {
            return ["", "", 0, ""];
        }

        return data.map((sleepEntry) => {
            return [
                new Date(sleepEntry.date).getDate(),
                parseFloat(sleepEntry.hours),
                "#ffdb99",
                getTimeTooltip(sleepEntry.date, sleepEntry.hours)];
        });
    }

    return (
        <Chart
            chartType="ColumnChart"
            width="100%"
            height="100%"
            data={[
                ["Element", "Sleep\r\nhours", { role: "style" }, { role: "tooltip" }],
                ...getChartData()
            ]}
            options={{
                colors: ["#ffdb99"],
                fontName: 'Comic Sans MS',
                fontSize: 14,
                hAxis: {
                }
            }} />
    );

}

export default MonthStatisticsChart;