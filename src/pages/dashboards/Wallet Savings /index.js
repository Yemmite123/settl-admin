import React, { useState } from "react";
import Header from "../../../components/Header";
import Statistics from "./Statistics";
import Table from "./Table";

import Tab from "./Tab";
import logo from "../../../assets/img/icons/referralicon.svg";
import { useAPI } from "../../../contexts/WalletContext";
import Loader from "../../../components/Loader";
import CustomerDetails from "./CustomerDetails";

const WalletSavings = () => {
  const { walletData, filterText, updateDays, refresh } = useAPI();
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [details, setDetails] = useState({});

  return (
    <div>
      <Header
        logo={logo}
        name="Savings Analytics"
        calendar
        filterText={filterText}
        updateDays={updateDays}
        refresh={refresh}
      />
      {walletData.length !== 0 ? (
        <>
          {!showCustomerDetails ? (
            <>
              <Statistics />
              <Tab />
              <Table
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
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default WalletSavings;
