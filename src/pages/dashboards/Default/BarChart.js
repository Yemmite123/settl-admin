import React from "react";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";

import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";

const BarChart = ({ theme, title, chartData }) => {
  const data = {
    labels: Object.keys(chartData),
    datasets: [
      {
        label: "New",
        backgroundColor: "#127078",
        borderColor: "#E5F6F7",
        hoverBackgroundColor: "#E5F6F7",
        hoverBorderColor: theme.primary,
        data: Object.values(chartData),
        barPercentage: 1.7,
        categoryPercentage: 0.5,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          stacked: false,
          ticks: {
            stepSize: 20,
          },
        },
      ],
      xAxes: [
        {
          stacked: false,
          gridLines: {
            color: "transparent",
          },
        },
      ],
    },
  };

  return (
    <Card className="flex-fill w-100">
      <CardHeader>
        <CardTitle tag="h5" className="mb-0">
          <span className="analytics_title">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardBody className="d-flex">
        <div className="align-self-center w-100">
          <div className="chart chart-lg">
            <Bar data={data} options={options} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default connect((store) => ({
  theme: store.theme.currentTheme,
}))(BarChart);
