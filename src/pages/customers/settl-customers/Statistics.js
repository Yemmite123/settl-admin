import React from "react";
import StatisticsCard from "./StatisticsCard";
import { Row, Col } from "reactstrap";

export default function Statistics({ stats }) {
  const data = [
    {
      id: 1,
      title: "Total Volume of new User",
      value: stats?.volumeOfNewUser,
      percentage: `(+${stats?.percentVolOfNewUser}%)`,
      subtitle: "Analytics for last 30 days",
    },
    {
      id: 2,
      title: "Total Volume of Active Users",
      value: stats?.volumeOfActiveUser,
      percentage: `(+${stats?.percentActiveUser}%)`,
      subtitle: "Analytics for last 30 days",
    },
    {
      id: 3,
      title: "Total Volume of Inactive Users",
      value: stats?.volumeOfInactiveUser,
      percentage: `(+${stats?.percentInactiveUser}%)`,
      subtitle: "Analytics for last 30 days",
    },
    {
      id: 4,
      title: "Total Volume of Dormant Users",
      value: stats?.dormantUser,
      percentage: `(+${stats?.percentDormantUsers}%)`,
      subtitle: "Analytics for last 30 days",
    },
  ];
  return (
    <>
      <div className="container-fluid mb-5">
        <Row className="transaction_analysis_section">
          {data.map((datum) => (
            <Col md={3} lg={3} sm={6} xs={6} key={datum.id}>
              <StatisticsCard
                title={datum.title}
                value={datum.value}
                percentage={datum.percentage}
                subtitle={datum.subtitle}
              />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}
