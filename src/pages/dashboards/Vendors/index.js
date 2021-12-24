import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import logo from "../../../assets/img/icons/referralicon.svg";
import { TabContent, TabPane } from "reactstrap";
import VendorTab from "./VendorTab";
import ManagementTab from "./ManagementTab";
import { APIContextProvider } from "../../../contexts/VendorContext";

const Vendors = () => {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <>
      <APIContextProvider>
        <div className="bg_absolute">
          <Header logo={logo} name="Vendor Management" />
          <div className="nav">
            <div
              onClick={() => setActiveTab("1")}
              className={`${activeTab === "1" ? "active_nav" : ""}`}
            >
              <p>Vendor</p>
            </div>
            <div
              onClick={() => setActiveTab("2")}
              className={`${activeTab === "2" ? "active_nav" : ""}`}
            >
              <p>Transfer Management</p>
            </div>
          </div>
        </div>
        <div
          className=""
          style={{
            backgroundColor: "white",
            borderRadius: "4px",
            margin: "10rem  0 0 0",
          }}
        >
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <VendorTab />
            </TabPane>
            <TabPane tabId="2">
              <ManagementTab />
            </TabPane>
          </TabContent>
        </div>
      </APIContextProvider>
    </>
  );
};
export default Vendors;
