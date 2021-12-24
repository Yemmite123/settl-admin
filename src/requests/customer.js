import axios from "axios";
import { useSelector } from "react-redux";
import baseURL from "./baseUrl";

function create_UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}

const CustomersRequest = () => {
  const { token, tokenType } = useSelector((state) => state.user.details);

  const customerAnalytics = async (channels) => {
    let requestId = create_UUID();
    try {
      const response = await axios.get(
        baseURL + "backoffice/Customers/CustomerAnalytics",
        {
          params: {
            channels,
            days: 30,
          },
          headers: {
            "X-RequestId": `${requestId}`,
            Authorization: `${tokenType} ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const getConsumerInfo = async (phoneno) => {
    let requestId = create_UUID();
    try {
      const response = await axios.get(
        baseURL + "backoffice/Customers/GetConsumersInfoById",
        {
          params: {
            phoneno,
            days: 30,
          },
          headers: {
            "X-RequestId": `${requestId}`,
            Authorization: `${tokenType} ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const resetTransactionPin = async (data) => {
    let requestId = create_UUID();
    try {
      const response = await axios.post(
        baseURL + "backoffice/Customers/ResetTransactionPin",
        data,
        {
          headers: {
            "X-RequestId": `${requestId}`,
            Authorization: `${tokenType} ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const updateNextOfKin = async (data) => {
    let requestId = create_UUID();
    try {
      const response = await axios.post(
        baseURL + "backoffice/Customers/UpdateNextOfKin",
        data,
        {
          headers: {
            "X-RequestId": `${requestId}`,
            Authorization: `${tokenType} ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const updateAccountInfo = async (data) => {
    let requestId = create_UUID();
    try {
      const response = await axios.post(
        baseURL + "backoffice/Customers/UpdateAccount",
        data,
        {
          headers: {
            "X-RequestId": `${requestId}`,
            Authorization: `${tokenType} ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const freezeWallet = async (data) => {
    let requestId = create_UUID();
    try {
      const response = await axios.post(
        baseURL + "backoffice/Customers/FreezeWallet",
        data,
        {
          headers: {
            "X-RequestId": `${requestId}`,
            Authorization: `${tokenType} ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }

  const getFrozenAccountDetails = async (phoneNo) => {
    let requestId = create_UUID();
    try {
      const response = await axios.get(
        baseURL + `backoffice/Customers/Frozen/${phoneNo}`,
        {
          headers: {
            "X-RequestId": `${requestId}`,
            Authorization: `${tokenType} ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }

  const blacklistDevice = async (data) => {
    let requestId = create_UUID();
    try {
      const response = await axios.post(
        baseURL + "backoffice/Customers/BlacklistDevice",
        data,
        {
          headers: {
            "X-RequestId": `${requestId}`,
            Authorization: `${tokenType} ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }

  const upgradeCustomer = async (data) => {
    let requestId = create_UUID();
    try {
      const response = await axios.post(
        baseURL + "backoffice/Customers/Upgrade",
        data,
        {
          headers: {
            "X-RequestId": `${requestId}`,
            Authorization: `${tokenType} ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }

  const creditOrDebitCustomer = async (data) => {
    let requestId = create_UUID();
    try {
      const response = await axios.post(
        baseURL + "backoffice/Customers/creditordebitwallet",
        data,
        {
          headers: {
            "X-RequestId": `${requestId}`,
            Authorization: `${tokenType} ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }



  return {
    updateAccountInfo,
    updateNextOfKin,
    resetTransactionPin,
    getConsumerInfo,
    customerAnalytics,
    freezeWallet,
    getFrozenAccountDetails,
    blacklistDevice,
    upgradeCustomer,
    creditOrDebitCustomer,
  };
};

export default CustomersRequest;
