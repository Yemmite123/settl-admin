import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import Loader from "../../../components/Loader";
import { Badge } from "reactstrap";
import CustomerTableHeader from "./CustomerTableHeader";
import { useHistory } from "react-router-dom";

const tableColumns = [
  {
    dataField: "name",
    text: "Name",
  },
  {
    dataField: "phoneno",
    text: "Phone number",
  },
  {
    dataField: "customerId",
    text: "Customer ID",
  },
  {
    dataField: "kycLevel",
    text: "KYC Level",
  },
  {
    dataField: "primaryWalletBal",
    text: "Prim. Wallet Balance",
    classes: "text-right",
    headerClasses: "text-right",
    formatter: (cell, row, rowIndex) => <span>₦{cell.toLocaleString()}</span>,
  },
  {
    dataField: "lastActive",
    text: "Last active",
  },
  {
    dataField: "status",
    text: "Status",
    headerClasses: "text-center",
    formatter: (cell, row, rowIndex) => {
      if (cell.toLowerCase() === "inactive") {
        return (
          <Badge color="secondary" className="badge-inactive">
            {cell}
          </Badge>
        );
      }
      if (cell.toLowerCase() === "active") {
        return (
          <Badge color="secondary" className="badge-active">
            {cell}
          </Badge>
        );
      }
      if (cell.toLowerCase() === "new") {
        return (
          <Badge color="secondary" className="badge-new">
            {cell}
          </Badge>
        );
      }
      if (cell.toLowerCase() === "dormant") {
        return (
          <Badge color="secondary" className="badge-dormant">
            {cell}
          </Badge>
        );
      }
    },
  },
];

export default function CustomerTable({
  setShowDetails,
  tableData,
  setPhoneNumber,
}) {
  const history = useHistory();
  const [isfiltered, setIsFiltered] = useState(false);
  const [data, setData] = useState(tableData);
  useEffect(() => {
    setData(tableData);
  }, [tableData]);

  const Filter = (data) => {
    setData("");
    const check = data.status.length > 0 || data.kycLevel.length > 0;

    setTimeout(() => {
      const filtered = tableData.filter((product) => {
        if (check) {
          setIsFiltered(true);
          return (
            data.status.includes(product.status.toLowerCase()) ||
            data.kycLevel.includes(product.kycLevel.toString().toLowerCase())
          );
        } else {
          setIsFiltered(false);
          return product;
        }
      });
      setData(filtered);
    }, 500);
  };

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing {from} to {to} of {size} Results
    </span>
  );

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      // setShowDetails((prev) => !prev);
      setPhoneNumber(row.phoneno);
      history.push(`/customers/details/${row.phoneno}`);
    },
  };

  return (
    <>
      <div className="admin-body">
        <div className="all-admins">
          <h6 className="table-title">All Settl Customers</h6>
          <div className="admin-table">
            <ToolkitProvider
              responsive
              keyField="id"
              data={data ? data : []}
              columns={tableColumns}
              exportCSV={{
                fileName: "customer data.csv",
              }}
              search
            >
              {(props) => (
                <div>
                  <CustomerTableHeader
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
