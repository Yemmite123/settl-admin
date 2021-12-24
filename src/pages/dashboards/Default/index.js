import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import { TabContent, TabPane } from "reactstrap";
import BarChart from "./BarChart";
import Header from "./Header";
import AppDownloads from "./AppDownloads";
import Statistics from "./Statistics";
import { RefreshButton } from "../../../components/RefreshButton";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Calendar } from "react-feather";
import Loader from "../../../components/Loader";
import Request from "../../../requests/analytics";

const Default = () => {
  const text = ["Today   ", "Last 7 Days", "Last 30 days", "Last 90 Days"];
  const { userAnalytics } = Request();
  const [activeTab, setActiveTab] = useState(0);
  const [userDetails, setUserDetails] = useState(null);
  const [appDownloads, setAppDownloads] = useState(null);
  const [chartsData, setChartsData] = useState(null);
  const [days, setDays] = useState(30);
  const [filterText, setFilterText] = useState(text[2]);
  const tabs = ["Settl  Customers", "Settl Agents"];
  const chartTitles = [
    { bar: "Customer Transactions", pie: "App Downloads" },
    { bar: "Agent & Super Agent Transactions", pie: "Agent App Downloads" },
  ];

  const FetchData = async () => {
    const response = await userAnalytics(days);
    console.log(response);
    if (response.code === "00") {
      await setUserDetails([response.data.consumers, response.data.agents]);
      await setAppDownloads([
        response.data.appDownloads.consumers,
        response.data.appDownloads.agents,
      ]);
      await setChartsData([
        response.data.chartData.customer,
        response.data.chartData.agents,
      ]);
    }
  };

  const refresh = () => {
    setUserDetails(null);
    setAppDownloads(null);
    setChartsData(null);
    FetchData();
  };

  const updateDays = (day, index) => {
    if (filterText !== text[index]) {
      setChartsData(null);
      setAppDownloads(null);
      setDays(day);
      setFilterText(text[index]);
    }
  };

  useEffect(() => {
    FetchData();
  }, [days]);
  return (
    <>
      <div className="bg_absolute">
        <Header />
        <div className="nav">
          {tabs.map((tab, i) => (
            <div
              onClick={() => setActiveTab(i)}
              className={`${activeTab === i ? "active_nav" : ""}`}
            >
              <p>{tab}</p>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          marginTop: "8rem ",
        }}
      >
        {userDetails && appDownloads && chartsData ? (
          <TabContent activeTab={activeTab}>
            {tabs.map((tab, i) => (
              <TabPane tabId={i} key={i}>
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
                    {tab} Analytics
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
                        <Calendar className="feather align-middle mt-n1" />{" "}
                        {filterText}
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

                <Statistics index={i} data={userDetails[i]} />
                <Row
                  style={{
                    marginTop: "2rem",
                  }}
                >
                  <Col lg="7" className="d-flex">
                    <BarChart
                      title={chartTitles[i].bar}
                      chartData={chartsData[i]}
                    />
                  </Col>
                  <Col lg="5" className="d-flex">
                    <AppDownloads
                      title={chartTitles[i].pie}
                      downloads={appDownloads[i]}
                    />
                  </Col>
                </Row>
              </TabPane>
            ))}
          </TabContent>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};
export default Default;
