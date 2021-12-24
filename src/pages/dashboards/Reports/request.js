import axios from "axios";
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
  let requestId = create_UUID();

  const getData = async (type, days) => {
    try {
      const response = await axios.get(
        `https://api.settl.me/backoffice/Analytics/transactions?Days=${days}&Channel=${type}`,
        {
          headers: {
            "X-RequestId": `${requestId}`,
            Authorization: `${tokenType} ${token}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  };
  return { getData };
};
export default Request;
