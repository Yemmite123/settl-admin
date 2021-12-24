import React from "react";
import Chart from "react-apexcharts";
import { connect } from "react-redux";

import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";

const ColumnChart = ({ theme }) => {
  const data = [
    {
      name: "Bill Payment",
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
    {
      name: "Peer-to-Peer    ",
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    },
    {
      name: "Savings",
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
    },
    {
      name: "Transfer",
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
    },
    {
      name: "Money Request",
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
    },
  ];

  const options = {
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
    },

    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
    colors: ["#3DBDC8", "#27A0C7", "#DB74E4", "#61B3FF", "#9C6ADE"],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h5">Reported Issues</CardTitle>
      </CardHeader>
      <CardBody>
        <div className="chart">
          <Chart options={options} series={data} type="bar" height="350" />
        </div>
      </CardBody>
    </Card>
  );
};

export default connect((store) => ({
  theme: store.theme.currentTheme,
}))(ColumnChart);
