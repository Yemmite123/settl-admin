import axios from "axios";
import { useSelector } from "react-redux";
const baseURL = "https://api.settl.me/backoffice/";

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
  const issueLogs = async () => {
    let requestId = create_UUID();
    try {
      const response = await axios.get(baseURL + "IssuesLog", {
        headers: {
          "X-RequestId": `${requestId}`,
          Authorization: `${tokenType} ${token}`,
          changeOrigin:true,
          "Access-Control-Allow-Origin": "*",
          contentType: "application/json; charset=utf-8",
        },
      });
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const issueAnalytics = async (days) => {
    let requestId = create_UUID();
    try {
      const response = await axios.get(
        baseURL + `IssuesLog/LogAnalysisReport?days=${days}`,
        {
          headers: {
            "X-RequestId": `${requestId}`,
            Authorization: `${tokenType} ${token}`,
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

  const performance = async (days) => {
    let requestId = create_UUID();
    try {
      const response = await axios.get(
        baseURL + `IssuesLog/ResolutionPerformance?days=${days}`,
        {
          headers: {
            "X-RequestId": `${requestId}`,
            Authorization: `${tokenType} ${token}`,
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

  const statusUpdate = async (data) => {
    let requestId = create_UUID();
    console.log(data);
    try {
      const response = await axios.patch(
        baseURL + `IssuesLog/UpdateStatus?Id=${data.Id}&status=${data.status}`,
        null,
        {
          headers: {
            "X-RequestId": `${requestId}`,
            Authorization: `${tokenType} ${token}`,
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
    performance,
    issueAnalytics,
    issueLogs,
    statusUpdate,
  };
};

export default Request;
