import React, { useState, useEffect } from "react";
import Table from "../Table";
import Loader from "../../../../components/Loader";
import Request from "../request";

const Logs = () => {
  const { issueLogs } = Request();
  const [data, setData] = useState(null);
  const fetchData = async () => {
    const response = await issueLogs();
    if (response.code === "00") {
      setData(response.data);
      console.log(response.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, [data]);
  return (
    <div>
      {!data ? <Loader /> : <Table issueLogsData={data} reload={setData} />}
    </div>
  );
};
export default Logs;
