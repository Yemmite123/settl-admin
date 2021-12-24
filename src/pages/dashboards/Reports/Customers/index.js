import React, { useState, useEffect } from "react";
import { TabContent, TabPane } from "reactstrap";
import TabView from "../TabView";
import TransactionDetail from "../TransactionDetail";
import data from "./data";
import Request from "../request";
import Loader from "../../../../components/Loader";

const CustomerReport = () => {
  const { getData } = Request();
  const text = ["Today   ", "Last 7 Days", "Last 30 days", "Last 90 Days"];

  const [activeTab, setActiveTab] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [index, setIndex] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [transRef, setTransRef] = useState("");

  const [days, setDays] = useState(30);
  const [filterText, setFilterText] = useState(text[2]);

  const tabs = [
    "All",
    "Peer-to-Peer",
    "Cashout",
    "Savings",
    "Bill Payment",
    "Wallet top-up",
  ];
  const title = ["All", "P2P", "Cashout", "Savings", "Bills", "Wallet top-up"];

  const fetchData = async () => {
    const response = await getData(1, days);
    if (response.code === "00") {
      console.log(response.data);
      const {
        allTransactionRecord,
        p2PTransactionRecord,
        cashOutTransactionRecord,
        savingsTransactionRecord,
        billPaymentTransactionRecord,
        walletTopUpTransactionRecord,
      } = response.data;
      setAnalysis([
        allTransactionRecord,
        p2PTransactionRecord,
        cashOutTransactionRecord,
        savingsTransactionRecord,
        billPaymentTransactionRecord,
        walletTopUpTransactionRecord,
      ]);
    }
  };

  const refresh = () => {
    setAnalysis(null);
    fetchData();
  };

  const updateDays = (day, index) => {
    if (filterText !== text[index]) {
      setAnalysis(null);
      setDays(day);
      setFilterText(text[index]);
    }
  };
  useEffect(() => {
    fetchData();
  }, [days]);
  return (
    <>
      <>
        <div className="bg_absolute">
          <div className="nav">
            {tabs.map((tab, i) => (
              <div
                onClick={() => {
                  setActiveTab(i);
                  setShowDetails(false);
                }}
                className={`${activeTab === i ? "active_nav" : ""}`}
              >
                <p>{tab}</p>
              </div>
            ))}
          </div>
        </div>
        {!analysis ? (
          <Loader />
        ) : (
          <>
            {!showDetails ? (
              <TabContent activeTab={activeTab}>
                {tabs.map((tab, i) => (
                  <TabPane tabId={i} key={i}>
                    <TabView
                      title={title[i]}
                      clicked={setShowDetails}
                      index={i}
                      setIndex={setIndex}
                      number="Customer"
                      analysis={analysis[i]}
                      setTransRef={setTransRef}
                      updateDays={updateDays}
                      filterText={filterText}
                      refresh={refresh}
                    />
                  </TabPane>
                ))}
              </TabContent>
            ) : (
              <TransactionDetail
                setShowDetails={setShowDetails}
                title={tabs[index]}
                data={data}
                type="Customer"
                transRef={transRef}
              />
            )}
          </>
        )}
      </>
    </>
  );
};
export default CustomerReport;
