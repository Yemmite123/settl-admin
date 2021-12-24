import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import Loader from "../../components/Loader";
import Request from "./request";

const Table = ({ setShowForm, setDetail }) => {
  const { getAllReconciliation } = Request();
  const [data, setData] = useState(null);
  const fetchData = async () => {
    const response = await getAllReconciliation();
    if (response.code === "00") {
      setData(response.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const columns = [
    {
      dataField: "date",
      text: "Date Created",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
      },
    },
    {
      dataField: "period",
      text: "Duration",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
      },
    },
    {
      dataField: "vendors",
      text: "Vendor/Bank",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
      },
    },
    {
      dataField: "status",
      text: "Status",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
        width: "150px",
        textAlign: "center",
      },
      style: () => {
        return {
          margin: "auto 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px 0",
        };
      },
      // formatter: (cell, row, rowIndex) => {
      //   if (cell.toLowerCase() === "draft") {
      //     return <span className="status pending">{cell}</span>;
      //   }
      //   if (cell.toLowerCase() === "reconciled") {
      //     return <span className="status success">{cell}</span>;
      //   }
      // },
    },
  ];
  const customTotal = (from, to, size) => (
    <span
      className="react-bootstrap-table-pagination-total"
      style={{
        padding: "1rem",
      }}
    >
      Showing {from} to {to} of {size} Results
    </span>
  );
  const rowStyle = {
    border: "none",
    cursor: "pointer",
  };
  const rowEvents = {
    onClick: (cell, row) => {
      console.log(row);
      setDetail({
        service: { name: row.services },
        bank: { name: row.vendors },
        duration: { name: row.period },
      });
      setShowForm(true);
    },
  };
  return (
    <ToolkitProvider keyField="date" data={data ? data : []} columns={columns}>
      {(props) => (
        <div className="table">
          <p
            className="table_title"
            style={{
              border: "none",
              paddingBottom: "0",
            }}
          >
            {" "}
            Reconciliation Log
          </p>
          {!data ? (
            <Loader />
          ) : (
            <BootstrapTable
              {...props.baseProps}
              wrapperClasses="reconciliation-table"
              bordered={false}
              rowStyle={rowStyle}
              rowEvents={rowEvents}
              pagination={paginationFactory({
                sizePerPage: 9,
                hideSizePerPage: true,
                showTotal: true,
                paginationTotalRenderer: customTotal,
              })}
            />
          )}
        </div>
      )}
    </ToolkitProvider>
  );
};
export default Table;
