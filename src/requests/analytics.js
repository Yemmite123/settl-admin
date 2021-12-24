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

const Request = () => {
  const { token, tokenType } = useSelector((state) => state.user.details);

  const analyticsBreakdown = async () => {
    let requestId = create_UUID();
    //console.log(alert(requestId));
    try {
      const response = await axios.get(
        baseURL + "backoffice/Analytics/breakdown?Days=30",
        {
          headers: {
            "X-RequestId": `${requestId}`,
            Authorization: `${tokenType} ${token}`,
            changeOrigin:true,
          "Access-Control-Allow-Origin": "*",
          contentType: "application/json; charset=utf-8",
          },
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const userAnalytics = async (days) => {
    let requestId = create_UUID();
    try {
      const response = await axios.get(
        baseURL + `backoffice/Analytics/settlusers?days=${days}`,
        {
          headers: {
            "X-RequestId": `${requestId}`,
            Authorization: `${tokenType} ${token}`,
            changeOrigin:true,
          "Access-Control-Allow-Origin": "*",
          contentType: "application/json; charset=utf-8",
          },
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  };
  return {
    analyticsBreakdown,
    userAnalytics,
  };
};

export default Request;
