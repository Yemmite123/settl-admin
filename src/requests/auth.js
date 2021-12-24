import axios from "axios";
import { conditionallyUpdateScrollbar } from "reactstrap/lib/utils";
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

export async function Auth(url, data) {
  let requestId = create_UUID();
  try {
    const response = await axios.post(baseURL + url, data, {
      // headers: {
      //   "X-RequestId": `${requestId}`,
      //   "Access-Control-Allow-Origin": "*",
      // },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data.message
    }
    
  }
}
