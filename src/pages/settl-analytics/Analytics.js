import React, { useEffect, useState } from "react";
import Statistics from "./Statistics";
import Chart from "./Chart";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Calendar } from "react-feather";
import Loader from "../../components/Loader";
import Request from "../../requests/analytics";
import { RefreshButton } from "../../components/RefreshButton";

const Analytics = ({ title, index }) => {
  const text = ["Today   ", "Last 7 Days", "Last 30 days", "Last 90 Days"];
  const { analyticsBreakdown, userAnalytics } = Request();
  const [breakdown, setBreakdown] = useState(null);
  const [stats, setStats] = useState(null);
  const [days, setDays] = useState(30);
  const [filterText, setFilterText] = useState(text[2]);

  const fetchBreakdownData = async () => {
    const response = await analyticsBreakdown();
    if (response.code === "00") {
      setBreakdown([response.data.consumers, response.data.agents]);
    }
  };
  const getAnalytics = async () => {
    const response = await userAnalytics(days);
    if (response.code === "00") {
      setStats([response.data.consumers, response.data.agents]);
      console.log(response.data);
    }
  };
  const refresh = () => {
    setBreakdown(null);
    setStats(null);
    fetchBreakdownData();
    getAnalytics();
  };
  const updateDays = (day, index) => {
    if (filterText !== text[index]) {
      setStats(null);
      setDays(day);
      setFilterText(text[index]);
    }
  };
  useEffect(() => {
    fetchBreakdownData();
  }, []);
  useEffect(() => {
    getAnalytics();
  }, [days]);
  return (
    <div
      style={{
        marginTop: "8rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <p
          style={{
            color: "#304762",
            fontSize: "20px",
          }}
        >
          Settl {title} Analytics
        </p>
        <div>
          <RefreshButton next={refresh} />
          <UncontrolledDropdown className="d-inline filter-dropdown">
            <DropdownToggle
              caret
              color="light"
              className="shadow-sm"
              style={{
                backgroundColor: "white",
              }}
            >
              <Calendar className="feather align-middle mt-n1" /> {filterText}
            </DropdownToggle>
            <DropdownMenu
              right
              style={{
                top: "25px",
              }}
            >
              <DropdownItem onClick={() => updateDays(1, 0)}>
                Today
              </DropdownItem>
              <DropdownItem onClick={() => updateDays(7, 1)}>
                Last 7 Days
              </DropdownItem>
              <DropdownItem onClick={() => updateDays(30, 2)}>
                Last 30 Days
              </DropdownItem>
              <DropdownItem onClick={() => updateDays(90, 3)}>
                Last 90 Days
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Customize</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
      {!stats ? <Loader /> : <Statistics stats={stats[index]} index={index} />}

      {!breakdown ? (
        <Loader />
      ) : (
        <div
          style={{
            marginTop: "2rem",
          }}
        >
          <Chart breakdown={breakdown[index]} />
        </div>
      )}
    </div>
  );
};

export default Analytics;
