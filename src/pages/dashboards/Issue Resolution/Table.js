import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import Header from "./TableHeader";
import Loader from "../../../components/Loader";
import Modal from "./Modal";

const Table = ({ issueLogsData, reload }) => {
  //const propsData = issueLogsData;
  const [isfiltered, setIsFiltered] = useState(false);
  const [issueData, setData] = useState(issueLogsData);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState({});
  const currentDate = new Date();
  const currentDateFormat = currentDate.setHours(0, 0, 0, 0);

  const SearchFilter = (data) => {
    let filtered = issueLogsData;
    if (data.name === "Issue ID") {
      filtered = issueLogsData.filter((product) =>
        product?.issueId?.toLocaleLowerCase().startsWith(data.value.trim())
      );
    }
    if (data.name === "Transaction ID") {
      filtered = issueLogsData.filter((product) =>
        product?.transactionId
          ?.toLocaleLowerCase()
          .startsWith(data.value.trim())
      );
    }
    if (data.name === "Phone Number") {
      filtered = issueLogsData.filter((product) =>
        product?.customerid?.toLocaleString().startsWith(data.value.trim())
      );
    }
    setData(filtered);
  };
  const Filter = (data) => {
    console.log(data);
    console.log(issueLogsData);
    setData("");
    const check =
      data?.type.length > 0 ||
      data?.status.length > 0 ||
      data?.startDate !== currentDateFormat ||
      data?.endDate !== currentDateFormat;
    console.log(issueLogsData.map((p) => p));

    setTimeout(() => {
      const filtered = issueLogsData.filter((product) => {
        if (check) {
          setIsFiltered(true);
          const productDate = new Date(product.createdDate).setHours(
            0,
            0,
            0,
            0
          );
          return (
            data.status.includes(product?.status?.toLowerCase()) ||
            data.type.includes(product?.transactionType?.toLowerCase()) ||
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
        fontSize: "13px",
        width: "70px",
        textAlign: "center",
      },
      formatter: (cell, row, rowIndex) => {
        return (
          <span className="d-flex justify-content-center">{rowIndex + 1}</span>
        );
      },
    },
    {
      dataField: "createdBy",
      text: "Created By",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
        fontSize: "13px",
      },
    },
    {
      dataField: "issueId",
      text: "Issue ID",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
        fontSize: "13px",
      },
    },
    {
      dataField: "transactionId",
      text: "Transaction ID",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
        fontSize: "13px",
      },
    },
    {
      dataField: "transactionType",
      text: "Transaction Type",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
        fontSize: "13px",
      },
    },
    {
      dataField: "createdDate",
      text: "Date Created",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
        fontSize: "13px",
      },
    },
    {
      dataField: "status",
      text: "Status",
      headerStyle: {
        backgroundColor: "#F8F9FA",
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
        if (cell.toLowerCase() === "resolved") {
          return <p className="status success">{cell}</p>;
        } else if (cell.toLowerCase() === "pending") {
          return <p className="pending status">{cell}</p>;
        } else {
          return <p className="status failed">{cell}</p>;
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
    padding: "21px",
    cursor: "pointer",
  };
  const rowEvent = {
    onClick: (e, row, rowIndex) => {
      setShow(true);
      setModalData(row);
    },
  };
  return (
    <>
      <ToolkitProvider
        responsive
        keyField="id"
        data={issueData}
        columns={columns}
        exportCSV={{
          fileName: "issue log.csv",
        }}
        search
      >
        {(props) => (
          <>
            <div className="bg_absolute">
              <Header
                csvData={props.csvProps}
                search={props.searchProps}
                filter={Filter}
                filtered={isfiltered}
                dataLength={issueData.length}
                SearchFilter={SearchFilter}
              />
            </div>
            <div
              className="table"
              style={{
                marginTop: "6rem",
              }}
            >
              <p className="table_title">Issue Logs</p>
              {!issueData ? (
                <Loader />
              ) : (
                <BootstrapTable
                  {...props.baseProps}
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
              {/* <BootstrapTable
                {...props.baseProps}
                bordered={false}
                rowEvents={rowEvent}
                rowStyle={rowStyle}
                pagination={paginationFactory({
                  sizePerPage: 9,
                  hideSizePerPage: true,
                  showTotal: true,
                  paginationTotalRenderer: customTotal,
                })}
              /> */}
            </div>
          </>
        )}
      </ToolkitProvider>
      <Modal show={show} setShow={setShow} data={modalData} setData={reload} />
    </>
  );
};
export default Table;
