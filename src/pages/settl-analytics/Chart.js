import React, { useState } from "react";
import Chart from "react-apexcharts";
import { connect } from "react-redux";
import {
  Col,
  Row,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
} from "reactstrap";
import { Calendar } from "react-feather";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";

const ColumnChart = ({ theme, breakdown }) => {
  const transactions = ["Transaction Breakdown", "Revenue Breakdown"];
  const [dropdownOpen, setOpen] = useState(false);
  const [transaction, setTransaction] = useState(transactions[0]);
  const toggle = () => setOpen(!dropdownOpen);
  const {
    january,
    february,
    march,
    april,
    may,
    june,
    july,
    august,
    september,
    october,
    november,
    december,
  } = breakdown;
  const data = [
    {
      name: "Bill Payment",
      data: [
        january.billPayments,
        february.billPayments,
        march.billPayments,
        april.billPayments,
        may.billPayments,
        june.billPayments,
        july.billPayments,
        august.billPayments,
        september.billPayments,
        october.billPayments,
        november.billPayments,
        december.billPayments,
      ],
    },
    {
      name: "Peer-to-Peer",
      data: [
        january.p2p,
        february.p2p,
        march.p2p,
        april.p2p,
        may.p2p,
        june.p2p,
        july.p2p,
        august.p2p,
        september.p2p,
        october.p2p,
        november.p2p,
        december.p2p,
      ],
    },
    {
      name: "Savings",
      data: [
        january.savings,
        february.savings,
        march.savings,
        april.savings,
        may.savings,
        june.savings,
        july.savings,
        august.savings,
        september.savings,
        october.savings,
        november.savings,
        december.savings,
      ],
    },
    {
      name: "Transfer",
      data: [
        january.transfers,
        february.transfers,
        march.transfers,
        april.transfers,
        may.transfers,
        june.transfers,
        july.transfers,
        august.transfers,
        september.transfers,
        october.transfers,
        november.transfers,
        december.transfers,
      ],
    },
    {
      name: "Money Request",
      data: [
        january.moneyRequests,
        february.moneyRequests,
        march.moneyRequests,
        april.moneyRequests,
        may.moneyRequests,
        june.moneyRequests,
        july.moneyRequests,
        august.moneyRequests,
        september.moneyRequests,
        october.moneyRequests,
        november.moneyRequests,
        december.moneyRequests,
      ],
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
        "Dec",
      ],
    },

    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
    },
    colors: ["#3DBDC8", "#27A0C7", "#DB74E4", "#61B3FF", "#9C6ADE"],
  };

  return (
    <Card>
      <CardHeader className="d-flex">
        <CardTitle tag="h5">
          <Dropdown
            isOpen={dropdownOpen}
            toggle={toggle}
            style={{
              outline: "none",
            }}
          >
            <DropdownToggle
              style={{
                border: "none",
                display: "flex",
                gap: "5px",
                alignItems: "center",
                color: "black",
                backgroundColor: "white",
              }}
              caret
            >
              {transaction}
              <DropdownMenu
                className="dropdown_menu"
                style={{
                  padding: ".5rem 0.3rem",
                  width: "fit-content",
                  textAlign: "center",
                }}
              >
                <p
                  className="dropdown_option"
                  onClick={() => setTransaction(transactions[0])}
                >
                  {" "}
                  {transactions[0]}
                </p>
                <p
                  className="dropdown_option"
                  onClick={() => setTransaction(transactions[1])}
                >
                  {transactions[1]}
                </p>
              </DropdownMenu>
            </DropdownToggle>
          </Dropdown>
        </CardTitle>
        <Col xs="auto" className="ml-auto text-right mt-n1">
          <UncontrolledDropdown className="d-inline filter-dropdown">
            <DropdownToggle
              caret
              color="light"
              className="shadow-sm"
              style={{
                backgroundColor: "white",
              }}
            >
              <Calendar className="feather align-middle mt-n1" /> Jan 01, 2021 -
              Dec 31 2021
            </DropdownToggle>
            <DropdownMenu
              right
              style={{
                top: "25px",
              }}
            >
              <DropdownItem>Today</DropdownItem>
              <DropdownItem>Last 7 Days</DropdownItem>
              <DropdownItem>Last 90 Days</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Customize</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Col>
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
