import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { TabContent, TabPane } from "reactstrap";
import logo from "../../assets/img/icons/referralicon.svg";
import Analytics from "./Analytics";

const SettlAnalytics = () => {
  const [activeTab, setActiveTab] = useState(0);

  const titles = ["Customers", "Agents"];

  return (
    <>
      <div className="bg_absolute">
        <Header name="Reports" logo={logo} />
        <div className="nav">
          <div
            onClick={() => setActiveTab(0)}
            className={`${activeTab === 0 ? "active_nav" : ""}`}
          >
            <p>Setll Customers</p>
          </div>
          <div
            onClick={() => setActiveTab(1)}
            className={`${activeTab === 1 ? "active_nav" : ""}`}
          >
            <p>Settl Agents</p>
          </div>
        </div>
      </div>
      (
      <TabContent activeTab={activeTab}>
        {titles.map((_, i) => (
          <TabPane tabId={i} key={i}>
            <Analytics title={titles[i]} index={i} />
          </TabPane>
        ))}
      </TabContent>
    </>
  );
};
export default SettlAnalytics;
