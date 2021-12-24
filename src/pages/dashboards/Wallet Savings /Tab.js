import React, { useEffect, useState } from "react";
import { TabContent, TabPane } from "reactstrap";
import TransactionCard from "../../../components/TransactionCard";
import { useAPI } from "../../../contexts/WalletContext";

const Tab = () => {
  const { walletData } = useAPI();
  
  const tabs = [
    "Targeting Savings wallet",
    "Round Up wallet",
    "Kids wallet",
    "Other Savings wallet",
  ];
  const savingWallet = [
    {
      name: [
        "Total Volume of TSW Users",
        "Total Volume of RW Users",
        "Total Volume of KW Users",
        "Total Volume of OSW Users",
      ],
      total_amount: [
        walletData.targetedSavingsinfo.totalvolcount,
        walletData.roundupSavingsinfo.totalvolcount,
        walletData.kidsWalletinfo.totalvolcount,
        walletData.otherSavingsinfo.totalvolcount
      ],
      percentage: [
        walletData.targetedSavingsinfo.percenttotalvolcount,
        walletData.roundupSavingsinfo.percenttotalvolcount,
        walletData.kidsWalletinfo.percenttotalvolcount,
        walletData.otherSavingsinfo.percenttotalvolcount
      ],
    },
    {
      name: [
        "Total Value of TSW Funds",
        "Total Value of RW Funds",
        "Total Value of KW Funds",
        "Total Value of OSW Funds",
      ],
      total_amount: [
        walletData.targetedSavingsinfo.totalval,
        walletData.roundupSavingsinfo.totalval,
        walletData.kidsWalletinfo.totalval,
        walletData.otherSavingsinfo.totalval
      ],
      percentage: [
        walletData.targetedSavingsinfo.percenttotalvalue,
        walletData.roundupSavingsinfo.percenttotalvalue,
        walletData.kidsWalletinfo.percenttotalvalue,
        walletData.otherSavingsinfo.percenttotalvalue
      ]
    },
    {
      name: [
        "Total TSW Interest Sent ",
        "Total RW Interest Sent ",
        "Total KW Interest Sent ",
        "Total OSW Interest Sent ",
      ],
      total_amount: [
        walletData.targetedSavingsinfo.totalsavingintrest,
        walletData.roundupSavingsinfo.totalsavingintrest,
        walletData.kidsWalletinfo.totalsavingintrest,
        walletData.otherSavingsinfo.totalsavingintrest
      ],
      percentage: [
        walletData.targetedSavingsinfo.percentsavingintrest,
        walletData.roundupSavingsinfo.percentsavingintrest,
        walletData.kidsWalletinfo.percentsavingintrest,
        walletData.otherSavingsinfo.percentsavingintrest
      ]
    },
  ];
  const [activeTab, setActiveTab] = useState(0);
  
  return (
    <div className="savings_tab">
      <p className="title">Savings Wallet Data</p>
      <div className="nav">
        {tabs.map((tab, i) => (
          <div
            key={i}
            onClick={() => setActiveTab(i)}
            className={`${activeTab === i ? "active_nav" : ""}`}
          >
            <p>{tab}</p>
          </div>
        ))}
      </div>
      <TabContent activeTab={activeTab}>
        {tabs.map((tabs, i) => (
          <TabPane tabId={i}>
            <div className="transaction_body tab_body" key={i}>
              {savingWallet.map((data, index) => (
                <TransactionCard
                  key={index}
                  name={data.name[i]}
                  total_amount={data.total_amount[i]}
                  percentage={data.percentage[i]}
                />
              ))}
            </div>
          </TabPane>
        ))}
      </TabContent>
    </div>
  );
};
export default Tab;
