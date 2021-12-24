import React, { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import moment from "moment";
//import productsData from "./products";
import Header from "./Header";
import Loader from "../../../components/Loader";

const Table = ({
  title,
  clicked,
  index,
  setIndex,
  number,
  productsData,
  setTransRef,
}) => {
  const [products, setProducts] = useState(productsData ? productsData : []);
  const [isfiltered, setIsFiltered] = useState(false);
  const currentDate = new Date();
  const currentDateFormat = currentDate.setHours(0, 0, 0, 0);
  const SearchFilter = (data) => {
    let filtered = productsData;
    if (data.name === "Settl Transaction Reference") {
      filtered = productsData.filter((product) =>
        product.tranxRef.toLocaleLowerCase().startsWith(data.value.trim())
      );
    }
    setProducts(filtered);
  };
  const Filter = (data) => {
    setProducts("");
    const check =
      data.status.length > 0 ||
      data.transactionType.length > 0 ||
      data.startDate !== currentDateFormat ||
      data.endDate !== currentDateFormat;

    setTimeout(() => {
      const filtered = productsData.filter((product) => {
        if (check) {
          setIsFiltered(true);

          const splitDate = product.date.split("/");
          const productDate = new Date(
            +splitDate[2],
            splitDate[1] - 1,
            +splitDate[0]
          ).setHours(0, 0, 0, 0);
          const isDate =
            data.startDate !== currentDateFormat &&
            data.endDate !== currentDateFormat;
          console.log("date", isDate);
          return (
            data.transactionType.includes(product.transType.toLowerCase()) ||
            data.status.includes(product.transStatus.toLowerCase()) ||
            (isDate &&
              productDate >= data.startDate &&
              productDate <= data.endDate)
          );
        } else {
          setIsFiltered(false);
          return product;
        }
      });

      setProducts(filtered);
    }, 500);
  };
  const columns = [
    {
      dataField: "tranxRef",
      text: "Tranx Ref",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
      },
    },
    {
      dataField: "transType",
      text: "Transaction Type",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
      },
    },
    {
      dataField: "customerNumber",
      text: `${number} Number`,
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
      },
    },
    {
      dataField: "transEntry",
      text: "Entry",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
      },
    },
    {
      dataField: "amount",
      text: "Amount",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
      },
    },
    {
      dataField: "date",
      text: "Date",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
        // textAlign: "center",
      },
      formatter: (cell, row, rowIndex) => {
        return cell;
      },
    },
    {
      dataField: "transStatus",
      text: "Transaction Status",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
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
        if (cell?.toLowerCase() === "success") {
          return <p className="status success">{cell}</p>;
        }
        if (cell?.toLowerCase() === "pending") {
          return <p className="status pending">{cell}</p>;
        }
        if (cell?.toLowerCase() === "failed") {
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
    cursor: "pointer",
  };
  const rowEvents = {
    onClick: (e, row) => {
      if (clicked) {
        clicked(true);
        setIndex(index);
        setTransRef(row.tranxRef);
      }
    },
  };
  return (
    <ToolkitProvider
      responsive
      keyField="id"
      data={products} 
      columns={columns}
      exportCSV={{
        fileName: "transaction report.csv",
      }}
      search
    >
      {(props) => (
        <>
          <div className="table">
            <p className="table_title">{title} Transaction Reports</p>
            <Header
              csvData={props.csvProps}
              filter={Filter}
              filtered={isfiltered}
              productLength={products.length}
              search={props.searchProps}
              SearchFilter={SearchFilter}
            />
            {!products ? (
              <Loader />
            ) : (
              <BootstrapTable
                {...props.baseProps}
                bootstrap4
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
        </>
      )}
    </ToolkitProvider>
  );
};
export default Table;
