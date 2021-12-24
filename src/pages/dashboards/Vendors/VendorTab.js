import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { CustomInput } from "reactstrap";
import Header from "./TabHeader";
import Modal from "./VendorModal";
import { useAPI } from "../../../contexts/VendorContext";
import Loader from "../../../components/Loader";

const VendorTab = () => {
  const { vendors, refreshVendor } = useAPI();
  const [show, setShow] = useState(false);
  const [data, setData] = useState(vendors);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setData(vendors);
  }, [vendors]);

  const filter = (e) => {
    const { value } = e.target;
    setData(
      vendors.filter((text) =>
        text.vendorName.toLocaleLowerCase().startsWith(value)
      )
    );
  };

  const columns = [
    {
      dataField: "id",
      text: "SN",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
        width: "70px",
        textAlign: "center",
      },
      formatter: (cell, row, rowIndex) => {
        return (
          // let rowNumber = (this.state.currentPage - 1) * 10 + (rowIndex + 1);
          // return <span>{rowNumber}</span>;
          <span className="d-flex justify-content-center">{rowIndex + 1}</span>
        );
      },
    },
    {
      dataField: "vendorName",
      text: "Vendor Name",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
      },
    },
    {
      dataField: "walletBalance",
      text: "Wallet Ballance",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
      },
      formatter: (cell) => <span>₦{cell.toLocaleString()}</span>,
    },
    {
      dataField: "transSupported",
      text: "Transaction Supported",
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
        if (cell === true) {
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
        } else {
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
  const rowStyle = (row, rowIndex) => {
    const style = {
      border: "none",
    };
    if (vendors[rowIndex]?.status === "inactive") {
      style.backgroundColor = "rgba(223, 227, 232, 0.2)";
    }
    return style;
  };
  return (
    <ToolkitProvider keyField="id" data={data} columns={columns}>
      {(props) => (
        <div className="table">
          <p className="table_title">All Vendors</p>
          <Header
            placeholder="Find Vendors"
            filter={filter}
            refresh={refreshVendor}
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

export default VendorTab;
