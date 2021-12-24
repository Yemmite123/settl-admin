import React, { useState } from "react";
import { Badge } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import Loader from "../../../components/Loader";
import ReferralTableHeader from "./ReferralTableHeader";

const tableColumns = [
  {
    dataField: "referralName",
    text: "Referral Name",
  },
  {
    dataField: "date",
    text: "Date",
  },
  {
    dataField: "bonusStatus",
    text: "Bonus Status",
    headerClasses: "text-center",
    formatter: (cell, row, rowIndex) => {
      if (cell?.toLowerCase() === "paid") {
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
    },
  },
  {
    dataField: "bonus",
    text: "Bonus",
  },
  {
    dataField: "referralStatus",
    text: "Referral Status",
    headerClasses: "text-center",
    formatter: (cell, row, rowIndex) => {
      if (!cell) {
        return (
          <Badge color="secondary" className="badge-inactive">
            Inactive
          </Badge>
        );
      }
      if (cell) {
        return (
          <Badge color="secondary" className="badge-active">
            Active
          </Badge>
        );
      }
    },
  },
];

export default function ReferralTable({ tableData }) {
  const [isfiltered, setIsFiltered] = useState(false);
  const [data, setData] = useState(tableData);
  const currentDate = new Date();
  const currentDateFormat = currentDate.setHours(0, 0, 0, 0);

  const Filter = (data) => {
    setData("");
    const check =
      data.status.length > 0 ||
      data.endDate !== currentDateFormat ||
      data.startDate !== currentDateFormat;
    setTimeout(() => {
      const filtered = tableData.filter((product) => {
        if (check) {
          setIsFiltered(true);
          const splitDate = product.date.slice(0, -6).split("/");
          const dataDate = new Date(
            +splitDate[2],
            splitDate[1] - 1,
            +splitDate[0]
          ).setHours(0, 0, 0, 0);
          const status = product.referralStatus ? "active" : "inactive";
          return (
            data.status.includes(status) ||
            (dataDate >= data.startDate && dataDate <= data.endDate)
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

  return (
    <>
      <div className="admin-body">
        <div className="all-admins">
          <h6>Referred Customers</h6>
          <ToolkitProvider
            responsive
            keyField="id"
            data={data}
            columns={tableColumns}
            search
          >
            {(props) => (
              <div>
                <ReferralTableHeader
                  filter={Filter}
                  filtered={isfiltered}
                  dataLength={data.length}
                  search={props.searchProps}
                />
                {!data ? (
                  <Loader />
                ) : (
                  <div className="admin-table">
                    <BootstrapTable
                      bootstrap4
                      bordered={false}
                      wrapperClasses="table-responsive"
                      pagination={paginationFactory({
                        sizePerPage: 9,
                        hideSizePerPage: true,
                        showTotal: true,
                        paginationTotalRenderer: customTotal,
                      })}
                      {...props.baseProps}
                    />
                  </div>
                )}
              </div>
            )}
          </ToolkitProvider>
        </div>
      </div>
    </>
  );
}
