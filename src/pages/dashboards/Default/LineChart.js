import React from "react";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";

import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";

const LineChart = ({ theme }) => {
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
        label: "New (₦)",
        fill: true,
        backgroundColor: "transparent",
        borderColor: "#63CDFF",
        data: [
          2015,
          1465,
          1487,
          1796,
          1387,
          2123,
          2866,
          2548,
          3902,
          4938,
          3917,
          4927
        ]
      },
      {
        label: "Returning (₦)",
        fill: true,
        backgroundColor: "transparent",
        borderColor: "#2C82BE",
        borderDash: [4, 4],
        data: [
          928,
          734,
          626,
          893,
          921,
          1202,
          1396,
          1232,
          1524,
          2102,
          1506,
          1887
        ]
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {
      intersect: false
    },
    hover: {
      intersect: true
    },
    plugins: {
      filler: {
        propagate: false
      }
    },
    scales: {
      xAxes: [
        {
          reverse: true,
          gridLines: {
            color: "rgba(0,0,0,0.05)"
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            stepSize: 500
          },
          display: true,
          borderDash: [5, 5],
          gridLines: {
            color: "rgba(0,0,0,0)",
            fontColor: "#fff"
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
        <span className="analytics_title">Settl Users</span>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <div className="chart chart-lg">
          <Line data={data} options={options} />
        </div>
      </CardBody>
    </Card>
  );
};

export default connect(store => ({
  theme: store.theme.currentTheme
}))(LineChart);
