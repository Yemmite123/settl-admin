import React, { useState, useEffect } from "react";
import CustomerDetails from "./CustomerDetails";
import CustomerTable from "./CustomersTable";
import Header from "./Header";
import Statistics from "./Statistics";
import Loader from "../../../components/Loader";
import Request from "../../../requests/customer";

export default function SettlCustomers() {
  const { customerAnalytics } = Request();
  const [showDetails, setShowDetails] = useState(false);
  const [tableData, setTableData] = useState(null);
  const [stats, setStats] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const fetchData = async () => {
    const response = await customerAnalytics(1);
    console.log(response);
    if (response.code == "00") {
      const {
        volumeOfNewUser,
        percentVolOfNewUser,
        dormantUser,
        percentDormantUsers,
        volumeOfActiveUser,
        percentActiveUser,
        volumeOfInactiveUser,
        percentInactiveUser,
        listOfConsumers,
      } = response.data;
      setStats({
        volumeOfNewUser,
        percentVolOfNewUser,
        dormantUser,
        percentDormantUsers,
        volumeOfActiveUser,
        percentActiveUser,
        volumeOfInactiveUser,
        percentInactiveUser,
      });
      setTableData(listOfConsumers);
    }
  };
  const refresh = () => {
    setStats(null);
    setTableData(null);
    fetchData();
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="customers">
        {!tableData && !stats ? (
          <Loader />
        ) : (
          <>
            {!showDetails ? (
              <>
                <Header title="Customer Data" refresh={refresh} />
                <Statistics stats={stats} />
                <CustomerTable
                  setShowDetails={setShowDetails}
                  tableData={tableData}
                  setPhoneNumber={setPhoneNumber}
                />
              </>
            ) : (
              <CustomerDetails
                setShowDetails={setShowDetails}
                phoneNumber={phoneNumber}
                setTableData={setTableData}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}
