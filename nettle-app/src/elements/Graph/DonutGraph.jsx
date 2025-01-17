/* eslint-disable react/prop-types */

import {DonutChart} from "@mantine/charts"

function DonutGraph({data, label }) {
  return (
    <DonutChart size={400} thickness={40} data={data} chartLabel={label}/>
  )
}

export default DonutGraph