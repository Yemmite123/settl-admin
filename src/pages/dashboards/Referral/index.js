import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import Statistics from "./Statistics";
import Table from "./Table";
import logo from "../../../assets/img/icons/referralicon.svg";
import Loader from "../../../components/Loader";
import ReferralsRequest from "./../../../requests/referral";

const Referral = () => {
  const text = ["Today   ", "Last 7 Days", "Last 30 days", "Last 90 Days"];
  const [filterText, setFilterText] = useState(text[2]);
  const [days, setDays] = useState(30);
  const [referrals, setReferrals] = useState("");
  const [referralData, setReferralData] = useState("");

  const { getAllReferrals } = ReferralsRequest();

  const getRecentReferralsList = async () => {
    const response = await getAllReferrals(days);
    if (response.code === "00") {
      setReferrals(response.data);
      setReferralData(response.data.listOfReferral);
    }
  };
  const refresh = () => {
    setReferrals("");
    setReferralData("");
    getRecentReferralsList();
  };
  const updateDays = (day, index) => {
    if (filterText !== text[index]) {
      setReferralData("");
      setReferrals("");
      setDays(day);
      setFilterText(text[index]);
    }
  };

  const transactions = [
    {
      name: "Total Referral Transaction Volume",
      total_amount: referrals.totalReferralvol,
      percentage: referrals.percentReferralvol,
    },
    {
      name: "Total Referral Transaction Value",
      total_amount: referrals.totalReferralval,
      percentage: referrals.percentReferralval,
    },
    {
      name: "Total value of Referral Bonuses",
      total_amount: referrals.referredBonus,
      percentage: referrals.percentReferredBonus,
    },
    {
      name: "Total Referrals Links Sent ",
      total_amount: referrals.totalReferralLinkSent,
      percentage: referrals.totalReferralval,
    },
    {
      name: "Total Number of Registered Referrals",
      total_amount: referrals.numberofRegisteredReferred,
      percentage: referrals.percentRegisteredReferred,
    },
    {
      name: "Total Number of Active Referrals",
      total_amount: referrals.activereferral,
      percentage: referrals.percentActivereferral,
    },
  ];

  useEffect(() => {
    getRecentReferralsList();
  }, [days]);

  return (
    <div>
      <Header
        logo={logo}
        name="Settl Referral Data"
        calendar
        filterText={filterText}
        updateDays={updateDays}
        refresh={refresh}
      />
      {referrals.length !== 0 ? (
        <Statistics transactions={transactions} />
      ) : (
        <Loader />
      )}
      <Table referralData={referralData} />
    </div>
  );
};

export default Referral;
