import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import data from "./data";
import Loader from "../../../../components/Loader";

const PerformanceChart = ({ data }) => {
  const columns = [
    {
      dataField: "customerSuccessAgent",
      text: "Customer Success Agents",
      headerStyle: {
        color: "#858EBD",
        textTransform: "uppercase",
        fontWeight: "normal",
        border: "none",
        width: "250px",
      },
      formatter: (cell, row, rowIndex) => {
        return (
          <div
            style={{
              display: "flex",
              gap: "1rem",
            }}
          >
            <span
              style={{
                backgroundColor: "#F4F7FF",
                padding: "0.2rem 1rem",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {rowIndex + 1}
            </span>
            <p
              style={{
                margin: "auto 0",
                padding: "auto 0",
                fontWeight: "500",
              }}
            >
              {cell}
            </p>
          </div>
        );
      },
    },
    {
      dataField: "resolvedIssue",
      text: "Resolved issues",
      headerStyle: {
        color: "#858EBD",
        textTransform: "uppercase",
        fontWeight: "normal",
        border: "none",
        textAlign: "center",
      },
      style: () => ({
        textAlign: "center",
        fontWeight: "500",
      }),
    },
    {
      dataField: "resolution",
      text: "progress",
      headerStyle: {
        color: "#858EBD",
        textTransform: "uppercase",
        fontWeight: "normal",
        border: "none",
      },
      formatter: (cell, row, rowIndex) => {
        let color;
        if (row.percentResolution >= 60) {
          color = "#1EB75B";
        } else if (row.percentResolution < 60 && row.percentResolution > 30) {
          color = "#EDBF78";
        } else {
          color = "#F50D49";
        }
        return (
          <div
            style={{
              height: "8px",
              backgroundColor: "#F6F4F8",
              borderRadius: "5px",
            }}
          >
            <div
              style={{
                width: `${cell}%`,
                height: "100%",
                backgroundColor: color,
                borderRadius: "5px",
              }}
            ></div>
          </div>
        );
      },
    },
    {
      dataField: "avgResolutionTime",
      text: "Avg. Resolution Time",
      headerStyle: {
        color: "#858EBD",
        textTransform: "uppercase",
        fontWeight: "normal",
        border: "none",
        textAlign: "center",
      },
      style: () => ({
        textAlign: "center",
        fontWeight: "500",
      }),
    },
    {
      dataField: "resolution",
      text: "resolution",
      headerStyle: {
        color: "#858EBD",
        textTransform: "uppercase",
        fontWeight: "normal",
        border: "none",
        width: "250px",
      },
      formatter: (cell, row, rowIndex) => {
        let color;
        if (row.percentResolution >= 60) {
          color = "#1EB75B";
        } else if (row.percentResolution < 60 && row.percentResolution > 30) {
          color = "#EDBF78";
        } else {
          color = "#F50D49";
        }
        return (
          <div
            style={{
              display: "flex",
              gap: "1rem",
            }}
          >
            <p
              style={{
                color: "#304762",
                fontWeight: "600",
              }}
            >
              {" "}
              {row.percentResolution}%{" "}
            </p>
            <p
              style={{
                color: color,
                fontSize: "12px",
              }}
            >
              ({row.percentResolved}){" "}
              {row.percentResolution >= 60 ? "\u2191" : "\u2193"}
            </p>
            <p
              style={{
                color: "#798C9C",
                fontSize: "12px",
              }}
            >
              (Versus last 30 days)
            </p>
          </div>
        );
      },
    },
  ];
  const rowStyle = {
    border: "none !important",
  };
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
  return (
    <div
      style={{
        backgroundColor: "white",
        marginTop: "3rem",
      }}
    >
      <p className="table_title">CS Resolution Performance</p>
      {!data ? (
        <Loader />
      ) : (
        <BootstrapTable
          keyField="id"
          bordered={false}
          data={data}
          columns={columns}
          rowStyle={rowStyle}
          pagination={paginationFactory({
            sizePerPage: 9,
            hideSizePerPage: true,
            showTotal: true,
            paginationTotalRenderer: customTotal,
          })}
        />
      )}
    </div>
  );
};
export default PerformanceChart;
