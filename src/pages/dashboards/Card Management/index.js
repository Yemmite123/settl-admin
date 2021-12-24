import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import Statistics from "./Statistics";
import Table from "./Table";
import logo from "../../../assets/img/icons/referralicon.svg";
import cardRequests from "./../../../requests/card-management";
import Loader from "../../../components/Loader";
import CustomerDetails from "./CustomerDetails";

const CardManagement = () => {
  const [card, setCard] = useState("");
  const [cardData, setCardData] = useState("");
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [details, setDetails] = useState({});
  const [days, setDays] = useState(30);
  const text = ["Today   ", "Last 7 Days", "Last 30 days", "Last 90 Days"];
  const [filterText, setFilterText] = useState(text[2]);
  const { getAllCards } = cardRequests();

  const getRecentCardRequestsList = async () => {
    const response = await getAllCards(days);
    if (response.code === "00") {
      console.log(response.data);
      console.log(response.data.allCardRequests);
      setCard(response.data);
      setCardData(response.data.allCardRequests);
    }
  };

  const refresh = () => {
    setCard("");
    setCardData("");
    getRecentCardRequestsList();
  };

  const transactions = [
    {
      name: "Total Virtual Card Request",
      total_amount: card.volOfVirtualCardRequest,
      percentage: card.percentVirtualCardRequest,
    },
    {
      name: "Total Physical Card Request",
      total_amount: "0",
      percentage: "0",
    },
    {
      name: "Total Virtual Card Disbursed",
      total_amount: card.virtualCardDisbursed,
      percentage: card.percentageVirtualCard,
    },
    {
      name: "Total Physical Card Disbursed",
      total_amount: card.physicalCardDisbursed,
      percentage: card.percentagePhysicalCard,
    },
    {
      name: "Total Volume of Active Cards",
      total_amount: card.volOfActiveCard,
      percentage: card.percentageActiveCard,
    },
    {
      name: "Total Volume of Users with Cards",
      total_amount: card.volOfCardUsers,
      percentage: card.percentVolOfCardUser,
    },
  ];
  const updateDays = (day, index) => {
    if (filterText !== text[index]) {
      setCard("");
      setCardData("");
      setDays(day);
      setFilterText(text[index]);
    }
  };
  useEffect(() => {
    setCard("");
    setCardData("");
    getRecentCardRequestsList();
  }, [showCustomerDetails]);

  useEffect(() => {
    getRecentCardRequestsList();
  }, [days]);
  return (
    <div>
      <Header
        logo={logo}
        name="Card Analytics"
        calendar
        filterText={filterText}
        updateDays={updateDays}
        refresh={refresh}
      />
      {!showCustomerDetails ? (
        <>
          {card.length !== 0 ? (
            <Statistics transactions={transactions} />
          ) : (
            <Loader />
          )}
          <Table
            tableData={cardData}
            setShowCustomerDetails={setShowCustomerDetails}
            setDetails={setDetails}
          />
        </>
      ) : (
        <CustomerDetails
          setShowCustomerDetails={setShowCustomerDetails}
          details={details}
        />
      )}
    </div>
  );
};

export default CardManagement;
