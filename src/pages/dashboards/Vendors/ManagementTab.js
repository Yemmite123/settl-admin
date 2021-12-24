import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import Modal from "./ManagementModal";
import Header from "./TabHeader";
import Loader from "../../../components/Loader";
import { CustomInput } from "reactstrap";
import { useAPI } from "../../../contexts/VendorContext";

const ManagementTab = () => {
  const { banks, refreshBankList } = useAPI();
  const [show, setShow] = useState(false);
  const [data, setData] = useState(banks);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setData(banks);
  }, [banks]);

  const filter = (e) => {
    const { value } = e.target;
    setData(
      banks.filter((text) =>
        text.bankNames.toLocaleLowerCase().startsWith(value)
      )
    );
  };

  const columns = [
    {
      dataField: "bankNames",
      text: "Banks",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
        paddingLeft: "20px",
      },
      style: () => ({
        padding: "20px",
      }),
      formatter: (cell, row, rowIndex) => {
        return (
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <img
              src={data[rowIndex].bankLogoimagepath}
              alt={cell}
              style={{
                width: "30px"
              }}
            />
            <span>{cell}</span>
          </div>
        );
      },
    },
    {
      dataField: "processingVendor",
      text: "Processing Vendors",
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
        textAlign: "center",
        // padding: " 20px 50px",
      },
      style: () => {
        return {
          cursor: "pointer",
          textAlign: "center",
          padding: "20px 50px",
        };
      },
      events: {
        onClick: (e, cell, columnIndex, row, rowIndex) => {
          setIndex(rowIndex);
          console.log(rowIndex);
          setShow(true);
        },
      },
      formatter: (cell, row, rowIndex) => {
        if (cell === "True" || cell === true) {
          return (
            <CustomInput
              type="switch"
              name="status"
              className="custom-switch"
              key="on"
              checked={true}
              id={cell + rowIndex}
              onChange={(e) => console.log(e.target.value)}
              label=""
            />
          );
        } else if (cell === "False" || cell === false) {
          return (
            <CustomInput
              type="switch"
              name="status"
              className="custom-switch"
              key="off"
              checked={false}
              id={cell + rowIndex}
            />
          );
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
  };

  return (
    <ToolkitProvider keyField="id" data={data} columns={columns}>
      {(props) => (
        <div className="table">
          <p className="table_title">All Banks</p>
          <Header
            placeholder="Find Bank"
            filter={filter}
            refresh={refreshBankList}
          />
          {data.length === 0 ? (
            <Loader />
          ) : (
            <BootstrapTable
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
          )}
          {data.length !== 0 && (
            <Modal
              show={show}
              setShow={setShow}
              index={index}
              setData={setData}
            />
          )}
        </div>
      )}
    </ToolkitProvider>
  );
};
export default ManagementTab;
