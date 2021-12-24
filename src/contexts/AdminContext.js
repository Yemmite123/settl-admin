import React, { useContext, useState, useEffect, createContext } from "react";
import adminRequest from "../requests/admin";

const APIContext = createContext();

export function APIContextProvider({ children }) {
  const [adminData, setAdminData] = useState([]);
  const [updateAdmin, setUpdateAdmin] = useState(true);
  const { getAllAdmin } = adminRequest();

  const getRecentAdminList = async () => {
    const response = await getAllAdmin();
    if (response.code === "00") {
      console.log(response.data);
      setAdminData(response.data);
      setUpdateAdmin(false);
    }
  };

  const changeUpdateStatus = () => {
    setUpdateAdmin(true);
  };
  useEffect(() => {
    getRecentAdminList();
  }, [updateAdmin]);

  return (
    // Add required values to the value prop within an object
    <APIContext.Provider value={{ adminData, changeUpdateStatus }}>
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
