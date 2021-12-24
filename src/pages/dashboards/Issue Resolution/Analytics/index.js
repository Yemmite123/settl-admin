import React, { useState, useEffect } from "react";
import Header from "../../../../components/Header";
import logo from "../../../../assets/img/icons/issue logo.svg";
import Statistics from "../Statistic";
import Chart from "./Chart";
import PerformanceChart from "./PerformaceChart";
import Loader from "../../../../components/Loader";
import Request from "../request";

const Analytics = () => {
  const { performance, issueAnalytics } = Request();
  const text = ["Today   ", "Last 7 Days", "Last 30 days", "Last 90 Days"];

  const [stats, setStats] = useState(null);
  const [charts, setChartsData] = useState(null);
  const [perfData, setPerfData] = useState(null);

  const [days, setDays] = useState(30);
  const [filterText, setFilterText] = useState(text[2]);

  const fetchData = async () => {
    const response = await issueAnalytics(days);
    if (response.code === "00") {
      const {
        totalIssueReport,
        percentTotalReport,
        totalIssueResolved,
        percentIssueResolved,
        totalPendingIssues,
        percentPendingIssues,
        totalInProgressIssues,
        percentInProgressIssues,
        billpaymentData,
        p2PData,
        savings,
        transfers,
      } = response.data;
      setStats({
        totalIssueReport,
        percentTotalReport,
        totalIssueResolved,
        percentIssueResolved,
        totalPendingIssues,
        percentPendingIssues,
        totalInProgressIssues,
        percentInProgressIssues,
      });
      setChartsData({ billpaymentData, p2PData, savings, transfers });
    }
  };
  const getPerformanceData = async () => {
    const response = await performance(days);
    if (response.code === "00") {
      setPerfData(response.data);
    }
  };
  const getBothData = async () => {
    await fetchData();
    await getPerformanceData();
  };

  const updateDays = (day, index) => {
    if (filterText !== text[index]) {
      setPerfData(null);
      setChartsData(null);
      setStats(null);
      setDays(day);
      setFilterText(text[index]);
    }
  };
  useEffect(() => {
    getBothData();
  }, [days]);
  return (
    <div>
      <Header
        logo={logo}
        name="Issue Analytics"
        calendar
        updateDays={updateDays}
        filterText={filterText}
      />
      {!stats && !charts ? (
        <Loader />
      ) : (
        <>
          <Statistics data={stats} />
          <Chart />
        </>
      )}

      <PerformanceChart data={perfData} />
    </div>
  );
};
export default Analytics;
