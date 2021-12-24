import axios from "axios";
import { useSelector } from "react-redux";
const baseURL = "https://api.settl.me/backoffice/Reconciliation";

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

const Request = () => {
  const { token, tokenType } = useSelector((state) => state.user.details);
  const getAllReconciliation = async () => {
    let requestId = create_UUID();
    try {
      const response = await axios.get(baseURL, {
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

  const activities = async () => {
    let requestId = create_UUID();
    try {
      const response = await axios.get(baseURL + "/list", {
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
  return {
    getAllReconciliation,
    activities,
  };
};
export default Request;
