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

const MessageRequest = () => {
  const { token, tokenType } = useSelector((state) => state.user.details);
  const getAllMessages = async () => {
    requestId = create_UUID();

    try {
      const response = await axios.get(baseURL + "backoffice/Messaging", {
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

  const getMessageById = async (id) => {
    requestId = create_UUID();

    try {
      const response = await axios.get(baseURL + `backoffice/Messaging/${id}`, {
        headers: { "X-RequestId": `${requestId}` },
        Authorization: `${tokenType} ${token}`,
      });
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const getLogRecordsById = async (messageType, id) => {
    requestId = create_UUID();

    try {
      const response = await axios.get(
        baseURL + "backoffice​/Messaging​/getlogbyid_v2",
        {
          params: {
            Logtype: messageType,
            Id: id,
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

  const newMessage = async (
    MessageTypes,
    Sender,
    MessageTitle,
    MessageDescription,
    Recipients,
    Customer,
    EmailCode
  ) => {
    requestId = create_UUID();

    try {
      const response = await axios.post(
        baseURL + "backoffice/Messaging/CreateMessages_V2",
        null,
        {
          params: {
            MessageTypes,
            Sender,
            MessageTitle,
            MessageDescription,
            Recipients,
            Customer,
            EmailCode
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
    getAllMessages,
    getMessageById,
    getLogRecordsById,
    newMessage,
  };
};

export default MessageRequest;
