/* eslint-disable react/prop-types */
import { BarChart } from "@mantine/charts";

function BarChartComponent({ data }) {
  return (
    <BarChart
      h={300}
      data={data}
      dataKey={'createdAt'}
      series={[
        { name: "risk_score", color: "green.6" }
      ]}
      tickLine="y"
    />
  );
}

export default BarChartComponent;
