import Text from "antd/lib/typography/Text";
import { setDay } from "date-fns";
import React, { useContext, useState, useEffect, createContext } from "react";
import walletRequest from "../requests/wallet-savings";

const APIContext = createContext();

export function APIContextProvider({ children }) {
  const [walletData, setWalletData] = useState([]);
  const [days, setDays] = useState(30);
  const text = ["Today   ", "Last 7 Days", "Last 30 days", "Last 90 Days"];
  const [filterText, setFilterText] = useState(text[2]);

  const { getAllWallets } = walletRequest();

  const getWalletList = async () => {
    const response = await getAllWallets(days);
    if (response.code == "00") {
      console.log(response.data);
      setWalletData(response.data);
    }
  };
  const refresh = () => {
    setWalletData([]);
    getWalletList();
  };
  const updateDays = (day, index) => {
    if (filterText !== text[index]) {
      setWalletData([]);
      setDays(day);
      setFilterText(text[index]);
    }
  };
  useEffect(() => {
    getWalletList();
  }, [days]);

  return (
    // Add required values to the value prop within an object
    <APIContext.Provider
      value={{ walletData, filterText, updateDays, refresh }}
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
