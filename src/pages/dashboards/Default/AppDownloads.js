import React from "react";
import { Pie } from "react-chartjs-2";
import { connect } from "react-redux";

import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";

const AppDownloads = ({ theme, title, downloads }) => {
  const data = {
    labels: ["Total AppStore Downloads", "Total PlayStore Downloads"],
    datasets: [
      {
        data: [downloads.appStore, downloads.playStore],
        backgroundColor: ["#2C82BE", "#63CDFF"],
        borderColor: "transparent",
        weight: 4,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    maintainAspectRatio: true,
    legend: {
      display: true,
    },
  };

  return (
    <Card className="bg_card">
      <CardHeader>
        <CardTitle tag="h5">
          <span className="analytics_title">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <div className="chart chart-sm">
          <Pie data={data} options={options} />
        </div>
      </CardBody>
    </Card>
  );
};

export default connect((store) => ({
  theme: store.theme.currentTheme,
}))(AppDownloads);
