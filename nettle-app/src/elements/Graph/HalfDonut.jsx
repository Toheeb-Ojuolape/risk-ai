/* eslint-disable react/prop-types */

import { DonutChart } from "@mantine/charts";

function DonutGraph({ data, label, width }) {
  return (
    <DonutChart
      size={width}
      thickness={40}
      data={data}
      chartLabel={label}
      startAngle={180}
      endAngle={0}
      className={`custom-donut-chart`}
      withTooltip={false}
      h={"10"}
    />
  );
}

export default DonutGraph;
