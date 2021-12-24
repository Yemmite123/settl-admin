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

const TransactionDetails = () => {
  const { token, tokenType } = useSelector((state) => state.user.details);
  let requestId = create_UUID();
  const getTransactionDetails = async (transId) => {
    try {
      const response = await axios.get(baseURL + "backoffice/Transactions", {
        params: {
          transId,
        },
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
  return { getTransactionDetails };
};

export default TransactionDetails;
