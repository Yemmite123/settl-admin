import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import Header from "./TableHeader";
import Loader from "../../../components/Loader";
import Moment from 'react-moment';

const Table = ({tableData, setShowCustomerDetails, setDetails}) => {
  const [isfiltered, setIsFiltered] = useState(false);
  const [data, setData] = useState(tableData);
  const currentDate = new Date();
  const currentDateFormat = currentDate.setHours(0, 0, 0, 0);

  useEffect(()=>{
    setData(tableData)
  },[tableData])

  const Filter = (data) => {
    setData("");
    const check =
      data.type.length > 0 ||
      data.startDate !== currentDateFormat ||
      data.endDate !== currentDateFormat;

    setTimeout(() => {
      const filtered = tableData.filter((product) => {
        if (check) {
          setIsFiltered(true);
          const productDate = new Date(product.dateCreated).setHours(
            0,
            0,
            0,
            0
          );
          return (
            data.type.includes(product.cardtype.toLowerCase()) ||
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
  
  const Search = (data) => {
    setData(
      tableData.filter((product) => product.phoneno.startsWith(data.trim()))
    );
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
      },
    },
    {
      dataField: "phoneno",
      text: "Phone Number",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
      },
    },
    {
      dataField: "cardtype",
      text: "Card Type",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
      },
    },
    {
      dataField: "requestedOn",
      text: "Requested On",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
      },
      formatter: (cell, row, rowIndex) => {
        return(
          <Moment format="YYYY/MM/DD">
            {cell}
          </Moment>
        );
      }
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
        if (cell.toLowerCase() === "approved") {
          return <p className="status success">{cell}</p>;
        }
        else if (cell.toLowerCase() === "pending") {
          return <p className="status pending">{cell}</p>;
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
    padding: "21px",
    cursor: "pointer",
  };
  const rowEvent = {
    onClick: async (e, row, rowIndex) => {
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
        fileName: "all-card-request.csv",
      }}
      search
    >
      {(props) => (
        <>
          <div className="table">
            <p className="table_title">All Card Request</p>
            <Header
              csvData={props.csvProps}
              search={props.searchProps}
              filter={Filter}
              filtered={isfiltered}
              dataLength={data.length}
              Search={Search}
            />
            {!data ? (
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
          </div>
        </>
      )}
    </ToolkitProvider>
  );
};
export default Table;
