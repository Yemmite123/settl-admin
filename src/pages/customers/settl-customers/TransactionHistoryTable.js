import React, { useState } from "react";
import { Badge } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import Loader from "../../../components/Loader";
import TransactionHistoryTableHeader from "./TransactionHistoryTableHeader";

export default function TransactionHistoryTable({
  setShowTransactionDetails,
  tableData,
  setTransRef,
}) {
  const [isfiltered, setIsFiltered] = useState(false);
  const [data, setData] = useState(tableData);

  const Filter = (data) => {
    setData("");
    const currentDate = new Date();
    const currentDateFormat = currentDate.setHours(0, 0, 0, 0);
    const check =
      data.type.length > 0 ||
      data.status.length > 0 ||
      data.startDate !== currentDateFormat ||
      data.endDate !== currentDateFormat;

    setTimeout(() => {
      const filtered = tableData.filter((product) => {
        if (check) {
          setIsFiltered(true);
          const splitDate = product.date.slice(0, -6).split("/");
          const productDate = new Date(
            +splitDate[2],
            splitDate[1] - 1,
            +splitDate[0]
          ).setHours(0, 0, 0, 0);
          return (
            data.status.includes(product.transStatus.toLowerCase()) ||
            data.type.includes(product.tranxType.toLowerCase()) ||
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

  const tableColumns = [
    {
      dataField: "date",
      text: "Date",
      formatter: (cell, row, rowIndex) => {
        return cell.slice(0, -8);
      },
    },
    {
      dataField: "walletType",
      text: "Wallet Type",
    },
    {
      dataField: "tranxRef",
      text: "Tranx Ref.",
    },
    {
      dataField: "tranxType",
      text: "Tranx Type",
    },
    {
      dataField: "transAmount",
      text: "Amount",
      classes: "text-right",
      headerClasses: "text-right",
      formatter: (cell, row, rowIndex) => <span>₦{cell}</span>,
    },
    {
      dataField: "transStatus",
      text: "Status",
      headerClasses: "text-center",
      formatter: (cell, row, rowIndex) => {
        if (cell?.toLowerCase() === "success") {
          return (
            <Badge color="secondary" className="badge-active">
              {cell}
            </Badge>
          );
        }
        if (cell?.toLowerCase() === "pending") {
          return (
            <Badge color="secondary" className="badge-pending">
              {cell}
            </Badge>
          );
        }
        if (cell?.toLowerCase() === "failed") {
          return (
            <Badge color="secondary" className="badge-failed">
              {cell}
            </Badge>
          );
        }
      },
    },
  ];
  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing {from} to {to} of {size} Results
    </span>
  );

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      setShowTransactionDetails((prev) => !prev);
      setTransRef(row.tranxRef);
    },
  };

  return (
    <>
      <div className="admin-body">
        <div className="all-admins">
          <h6>Transaction History</h6>
          <div className="admin-table transaction-table">
            <ToolkitProvider
              responsive
              keyField="id"
              data={data ? data : []}
              columns={tableColumns}
              exportCSV={{
                fileName: "transaction history data.csv",
              }}
              search
            >
              {(props) => (
                <div>
                  <TransactionHistoryTableHeader
                    csvData={props.csvProps}
                    filter={Filter}
                    filtered={isfiltered}
                    dataLength={data?.length}
                    search={props.searchProps}
                  />
                  {!data ? (
                    <Loader />
                  ) : (
                    <BootstrapTable
                      bootstrap4
                      bordered={false}
                      wrapperClasses="table-responsive"
                      rowEvents={rowEvents}
                      pagination={paginationFactory({
                        sizePerPage: 9,
                        hideSizePerPage: true,
                        showTotal: true,
                        paginationTotalRenderer: customTotal,
                      })}
                      {...props.baseProps}
                    />
                  )}
                </div>
              )}
            </ToolkitProvider>
          </div>
        </div>
      </div>
    </>
  );
}
