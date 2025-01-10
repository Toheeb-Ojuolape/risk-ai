/* eslint-disable react/prop-types */
import { BarChart } from "@mantine/charts";

function BarChartComponent({ data, name }) {
  return (
    <BarChart
      h={300}
      data={data}
      dataKey="month"
      series={[{ name, color: "blue" }]}
    />
  );
}

export default BarChartComponent;
