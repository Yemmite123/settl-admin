import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import Loader from "../../../components/Loader.js";
import Header from "./TableHeader";

const Table = ({ referralData = [] }) => {
  const [isfiltered, setIsFiltered] = useState(false);
  const [data, setData] = useState(referralData);
  const currentDate = new Date();
  const currentDateFormat = currentDate.setHours(0, 0, 0, 0);

  useEffect(() => {
    setData(referralData);
  }, [referralData]);

  const Filter = (data) => {
    setData("");
    const check =
      data.status.length > 0 ||
      data.endDate !== currentDateFormat ||
      data.startDate !== currentDateFormat;
    setTimeout(() => {
      const filtered = referralData.filter((product) => {
        if (check) {
          setIsFiltered(true);
          const splitDate = product.date.slice(0, -6).split("/");
          const dataDate = new Date(
            +splitDate[2],
            splitDate[1] - 1,
            +splitDate[0]
          ).setHours(0, 0, 0, 0);
          return (
            data.status.includes(product.status.toLowerCase()) ||
            (dataDate >= data.startDate && dataDate <= data.endDate)
          );
        } else {
          setIsFiltered(false);
          return data;
        }
      });
      setData(filtered);
    }, 500);
  };

  const Search = (data) => {
    setData(
      referralData.filter((product) =>
        product.phoneNumber.startsWith(data.trim())
      )
    );
  };

  const columns = [
    {
      dataField: "customername",
      text: "Customer Name",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
        fontSize: "13px",
        paddingLeft: "1.5rem",
      },
      style: () => {
        return {
          paddingLeft: "1.5rem",
        };
      },
    },
    {
      dataField: "phoneNumber",
      text: "Customer Phone Number",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
        fontSize: "12px",
      },
    },
    {
      dataField: "referralName",
      text: "Referral Name",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
        fontSize: "13px",
      },
    },
    {
      dataField: "referralBonus",
      text: "Referral Bonus",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
        fontSize: "13px",
      },
      formatter: (cell) => <span>₦{cell.toLocaleString()}</span>,
    },
    {
      dataField: "date",
      text: "Date",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
        fontSize: "13px",
      },
      formatter: (cell, row, rowIndex) => {
        return cell.slice(0, -5);
      },
    },
    {
      dataField: "status",
      text: "Status",
      headerStyle: {
        backgroundColor: "#f8f9fa",
        border: "none",
        fontSize: "13px",
        textAlign: "center",
      },
      style: () => {
        return {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        };
      },
      formatter: (cell, row, rowIndex) => {
        if (cell.toLowerCase() === "inactive") {
          return <p className="status inactive">{cell}</p>;
        } else if (cell.toLowerCase() === "active") {
          return <p className="status success">{cell}</p>;
        } else {
          return <p className="status registered">{cell}</p>;
        }
      },
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

  return (
    <ToolkitProvider
      responsive
      keyField="date"
      columns={columns}
      data={data}
      search
    >
      {(props) => (
        <div className="table">
          <p className="table_title">All Referral</p>
          {!data ? (
            <Loader />
          ) : (
            <>
              <Header
                csvData={props.csvProps}
                search={props.searchProps}
                filter={Filter}
                filtered={isfiltered}
                dataLength={data.length}
                Search={Search}
              />

              <BootstrapTable
                style={{
                  marginTop: "0",
                }}
                {...props.baseProps}
                bordered={false}
                rowStyle={rowStyle}
                pagination={paginationFactory({
                  sizePerPage: 9,
                  hideSizePerPage: true,
                  showTotal: true,
                  paginationTotalRenderer: customTotal,
                })}
              />
            </>
          )}
        </div>
      )}
    </ToolkitProvider>
  );
};
export default Table;
