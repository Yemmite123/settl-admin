import React, { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";

import Header from "./TableHeader";
import Loader from "../../../components/Loader";
import { useAPI } from "../../../contexts/WalletContext.js";

const Table = ({setShowCustomerDetails, setDetails}) => {
  const { walletData } = useAPI();
  const [isfiltered, setIsFiltered] = useState(false);
  const [data, setData] = useState(walletData.listOfSavingstrans);

  console.log(walletData.listOfSavingstrans)
  console.log(data);
  
  const currentDate = new Date();
  const currentDateFormat = currentDate.setHours(0, 0, 0, 0);

  const SearchFilter = (data) => {
    let filter = walletData.listOfSavingstrans;
    if (data.name === "Transaction Refernce") {
      filter = walletData.listOfSavingstrans.filter((product) =>
        product.transId.toLowerCase().startsWith(data.value.trim())
      );
    }
    if (data.name === "Customer's phone number") {
      filter = walletData.listOfSavingstrans.filter((product) =>
        product.customerId.startsWith(data.value.trim())
      );
    }
    setData(filter);
  };
  const Filter = (data) => {
    setData("");
    const check =
      data.status.length > 0 ||
      data.startDate !== currentDateFormat ||
      data.endDate !== currentDateFormat;

    setTimeout(() => {
      const filtered = walletData.listOfSavingstrans.filter((product) => {
        console.log(product);
        if (check) {
          setIsFiltered(true);
          const productDate = new Date(product.transDate).setHours(
            0,
            0,
            0,
            0
          );
          return (
            data.status.includes(product.transStatus.toLowerCase()) ||
            (productDate >= data.startDate && productDate <= data.endDate)
          );
        } else {
          setIsFiltered(false);
          return product;
        }
      });
      setData(filtered);
    }, 500);
  };

  const columns = [
    {
      dataField: "id",
      text: "#",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
        fontSize: "12px",
        width: "70px",
        textAlign: "center",
      },
      formatter: (cell, row, rowIndex) => {
        return (
          <span className="d-flex justify-content-center">{rowIndex+1}</span>
        );
      },
    },
    {
      dataField: "fromcustomerName",
      text: "Customer",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
        fontSize: "12px",
      },
    },
    {
      dataField: "transAmount",
      text: "Amount",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
        fontSize: "12px",
      },
      formatter: (cell) => <span>₦{cell.toLocaleString()}</span>
    },
    {
      dataField: "transId",
      text: "Tranx Ref",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
        fontSize: "12px",
      },
    },
    {
      dataField: "customerId",
      text: "Customer Phone Number",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
        fontSize: "11px",
      },
    },
    {
      dataField: "transStatus",
      text: "Status",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
        fontSize: "12px",
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
      formatter: (cell, row, rowIndex) => {
        if (cell.toLowerCase() === "success") {
          return <span className=" status success">{cell}</span>;
        }
        if (cell.toLowerCase() === "refunded") {
          return <span className="status registered">{cell}</span>;
        }
        if (cell.toLowerCase() === "failed") {
          return <span className="status failed">{cell}</span>;
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

  const rowEvent = {
    onClick: (e, row, rowIndex) => {
      setDetails(row);
      setShowCustomerDetails((prev) => !prev);
    },
  };

  return (
    <ToolkitProvider
      responsive
      keyField="id"
      data={data}
      columns={columns}
      exportCSV={{
        fileName: "wallet-transaction-data.csv",
      }}
      search
    >
      {(props) => (
        <div
          className="table"
          style={{
            marginTop: "2rem",
          }}
        >
          <p className="table_title">Savings Transactions</p>
          <Header
            csvData={props.csvProps}
            search={props.searchProps}
            filter={Filter}
            filtered={isfiltered}
            dataLength={data.length}
            SearchFilter={SearchFilter}
          />
          {!data ? (
            <Loader />
          ) : (
            <BootstrapTable
              {...props.baseProps}
              bootstrap4
              bordered={false}
              rowEvents={rowEvent}
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
      )}
    </ToolkitProvider>
  );
};
export default Table;
