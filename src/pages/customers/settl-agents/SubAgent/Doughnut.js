import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = () => {
  const data = {
    labels: ["Subagents", "Total"],
    datasets: [
      {
        data: [38, 12],
        backgroundColor: [
          "#1AD289",
          "#ECF5FF"
        ],
        borderColor: "transparent"
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    cutoutPercentage: 65,
    legend: {
      display: false
    }
  };

  return (
    <Doughnut data={data} options={options} />
  );
};

export default DoughnutChart;
