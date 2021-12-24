import React, { useContext, useState, useEffect, createContext } from "react";
import vendorsRequest from "../requests/vendor-management";

const APIContext = createContext();

export function APIContextProvider({ children }) {
  const [vendors, setVendors] = useState([]);
  const [banks, setBanks] = useState([]);

  const { getAllBanks, getVendors } = vendorsRequest();

  const getVendorList = async () => {
    const response = await getVendors();
    if (response.code == "00") {
      console.log(response.data);
      setVendors(response.data);
    }
  };

  const getBankList = async () => {
    const response = await getAllBanks();
    if (response.code == "00") {
      console.log(response.data);
      setBanks(response.data);
    }
  };
  const refreshVendor = () => {
    setVendors([]);
    getVendorList();
  };
  const refreshBankList = () => {
    setBanks([]);
    getBankList();
  };
  useEffect(() => {
    getVendorList();
    getBankList();
  }, []);

  return (
    // Add required values to the value prop within an object
    <APIContext.Provider
      value={{ vendors, banks, refreshVendor, refreshBankList }}
    >
      {children}
    </APIContext.Provider>
  );
}

// Create a hook to use the APIContext, this is a Kent C. Dodds pattern
export function useAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
