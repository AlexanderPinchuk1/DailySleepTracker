import { Chart } from "react-google-charts";
import { getMonthName, getMonthTooltip } from "../../api/timeAPI";

const YearStatisticsChart = ({ data }) => {
    const getChartData = () => {
        if (data === null) {
            return ["", "", 0, ""];
        }

        return data.map((monthSleepTime) => {
            return [
                getMonthName(monthSleepTime.monthNumber),
                parseFloat(monthSleepTime.averageSleepTime),
                "#ffdb99",
                getMonthTooltip(monthSleepTime)]
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

export default YearStatisticsChart;