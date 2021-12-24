import React from "react";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from "reactstrap";

const BarChart2 = ({ theme }) => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    datasets: [
      {
        label: "Last year",
        backgroundColor: "#E5F6F7",
        borderColor: "#E5F6F7",
        hoverBackgroundColor: "#E5F6F7",
        hoverBorderColor: theme.primary,
        data: [54, 67, 41, 55, 62, 45, 55, 73, 60, 76, 48, 79],
        barPercentage: 0.75,
        categoryPercentage: 0.5
      },
      {
        label: "This year",
        backgroundColor: "#17777C",
        borderColor: "#17777C",
        hoverBackgroundColor: "#27777A",
        hoverBorderColor: "yellow",
        data: [69, 66, 24, 48, 52, 51, 44, 53, 62, 79, 51, 68],
        barPercentage: 0.75,
        categoryPercentage: 0.5
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            display: false
          },
          stacked: false,
          ticks: {
            stepSize: 20
          }
        }
      ],
      xAxes: [
        {
          stacked: false,
          gridLines: {
            color: "transparent"
          }
        }
      ]
    }
  };

  return (
    <Card className="flex-fill w-100">
      <CardHeader>
        <div className="card-actions float-right">
            <span className="chart_title mr-3">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.86207 0.516602H2.27586C1.01894 0.516602 0 1.53554 0 2.79246V10.3787C0 11.6356 1.01894 12.6545 2.27586 12.6545H9.86207C11.119 12.6545 12.1379 11.6356 12.1379 10.3787V2.79246C12.1379 1.53554 11.119 0.516602 9.86207 0.516602Z" fill="#E5F6F7"/>
            </svg>
            <span className="ml-1">New</span>
            </span>

            <span>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.96559 0.516602H2.37938C1.12246 0.516602 0.103516 1.53554 0.103516 2.79246V10.3787C0.103516 11.6356 1.12246 12.6545 2.37938 12.6545H9.96559C11.2225 12.6545 12.2414 11.6356 12.2414 10.3787V2.79246C12.2414 1.53554 11.2225 0.516602 9.96559 0.516602Z" fill="#17777C"/>
            </svg>
            <span className="ml-1">Recurring</span>
            </span>
        </div>
        <CardTitle tag="h5" className="mb-0">
        <span className="analytics_title"> Sum of Transactions</span>
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

export default connect(store => ({
  theme: store.theme.currentTheme
}))(BarChart2);
