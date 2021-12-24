import axios from "axios";
import baseURL from "./baseUrl";
import { useSelector } from "react-redux";

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

let requestId = create_UUID();

const VendorsRequest = () => {
  const { token, tokenType } = useSelector((state) => state.user.details);
  const getVendors = async () => {
    requestId = create_UUID();

    try {
      const response = await axios.get(baseURL + "backoffice/Vendors", {
        headers: {
          "X-RequestId": `${requestId}`,
          Authorization: `${tokenType} ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const modifyVendorStatus = async (data) => {
    requestId = create_UUID();

    try {
      const response = await axios.patch(
        baseURL + "backoffice/Vendors/UpdateStatus",
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

  const getAllBanks = async () => {
    requestId = create_UUID();

    try {
      const response = await axios.get(baseURL + "backoffice/TransferBanks", {
        headers: {
          "X-RequestId": `${requestId}`,
          Authorization: `${tokenType} ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const modifyBankStatus = async (data) => {
    requestId = create_UUID();

    try {
      const response = await axios.patch(
        baseURL + "backoffice/TransferBanks/UpdateStatus",
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

  return {
    getVendors,
    modifyVendorStatus,
    getAllBanks,
    modifyBankStatus,
  };
};

export default VendorsRequest;
