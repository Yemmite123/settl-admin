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

const CardRequests = () => {
  const { token, tokenType } = useSelector((state) => state.user.details);
  const getAllCards = async (days) => {
    requestId = create_UUID();

    try {
      const response = await axios.get(
        baseURL + `backoffice/Analytics/CardManagement?days=${days}`,
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

  const getCardById = async (id) => {
    requestId = create_UUID();

    try {
      const response = await axios.get(
        baseURL + "backoffice/Analytics/CardRequestByPhone",
        {
          params: {
            phoneno: id,
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

  const approveRequest = async (id) => {
    requestId = create_UUID();

    try {
      const response = await axios.post(
        baseURL + "backoffice/Analytics/ApproveRequest",
        null,
        {
          params: {
            phoneno: id,
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

  const declineRequest = async (id) => {
    requestId = create_UUID();

    try {
      const response = await axios.post(
        baseURL + "backoffice/Analytics/DeclineRequest",
        null,
        {
          params: {
            phoneno: id,
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

  return {
    getAllCards,
    getCardById,
    approveRequest,
    declineRequest,
  };
};

export default CardRequests;
