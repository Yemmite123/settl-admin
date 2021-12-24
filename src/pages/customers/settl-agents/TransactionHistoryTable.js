import React, { useState } from "react";
import { Badge } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import Loader from "../../../components/Loader";
import SubAgentTransactionHistoryTableHeader from "./TransactionHistoryTableHeader";

const tableData = [
    {
        id: 1,
        date: "10-01-2020",
        transactionRef: "SETTL7OT213...",
        transactionType: "PHCN",
        amount: "70,000.00",
        status: "Success"
    },
    {
        id: 2,
        date: "10-01-2020",
        transactionRef: "SETTL7OT213...",
        transactionType: "DSTV",
        amount: "70,000.00",
        status: "Pending"
    },
    {
        id: 3,
        date: "10-01-2020",
        transactionRef: "SETTL7OT213...",
        transactionType: "PHCN",
        amount: "70,000.00",
        status: "Success"
    },
    {
        id: 4,
        date: "10-01-2020",
        transactionRef: "SETTL7OT213...",
        transactionType: "DSTV",
        amount: "70,000.00",
        status: "Success"
    },
    {
        id: 5,
        date: "10-01-2020",
        transactionRef: "SETTL7OT213...",
        transactionType: "DSTV",
        amount: "70,000.00",
        status: "Success"
    },
    {
        id: 6,
        date: "10-01-2020",
        transactionRef: "SETTL7OT213...",
        transactionType: "PHCN",
        amount: "70,000.00",
        status: "Success"
    },
    {
        id: 7,
        date: "10-01-2020",
        transactionRef: "SETTL7OT213...",
        transactionType: "DSTV",
        amount: "70,000.00",
        status: "Success"
    },
    {
        id: 8,
        date: "10-01-2020",
        transactionRef: "SETTL7OT213...",
        transactionType: "PHCN",
        amount: "70,000.00",
        status: "Success"
    },
    {
        id: 9,
        date: "10-01-2020",
        transactionRef: "SETTL7OT213...",
        transactionType: "DSTV",
        amount: "70,000.00",
        status: "Success"
    },
    {
        id: 10,
        date: "10-01-2020",
        transactionRef: "SETTL7OT213...",
        transactionType: "DSTV",
        amount: "70,000.00",
        status: "Success"
    }
]

const tableColumns = [
    {
      dataField: "date",
      text: "Date"
    },
    {
        dataField: "transactionRef",
        text: "Transaction Ref."
    },
    {
        dataField: "transactionType",
        text: "Transaction Type"
    },
    {
        dataField: "amount",
        text: "Amount(NGN)",
        classes: "text-right",
        headerClasses: "text-right"
    },
    {
        dataField: "status",
        text: "Status",
        headerClasses: "text-center",
        formatter: (cell, row, rowIndex) => {
            if (cell.toLowerCase() === "success") {
                return <Badge color="secondary" className="badge-active">{cell}</Badge>
            }
            if (cell.toLowerCase() === "pending") {
                return <Badge color="secondary" className="badge-pending">{cell}</Badge>
            }
        }
    }
];

export default function TransactionHistoryTable({setShowSubAgentTransactionDetails}) {
    const [isfiltered, setIsFiltered] = useState(false);
    const [data, setData] = useState(tableData);

    const Filter = (data) => {
        setData("");
        const check = data.type.length > 0 || data.status.length > 0
    
        setTimeout(() => {
          const filtered = tableData.filter((product) => {
            if (check) {
              setIsFiltered(true);
              return (
                data.status.includes(product.status.toLowerCase()) ||
                data.type.includes(product.transactionType.toLowerCase())
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
            Showing { from } to { to } of { size } Results
        </span>
    );

    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            setShowSubAgentTransactionDetails((prev) => !prev);
        }
    }


    return(
        <>
            <div className="admin-body">
                <div className="all-admins">
                    <h6>Recent Transactions</h6>
                    <div className="admin-table transaction-table mt-2">
                        <ToolkitProvider
                            keyField="id"
                            data={data}
                            columns={tableColumns}
                            exportCSV={{
                                fileName: "transaction history data.csv",
                            }}
                            search
                        >
                            {
                                props => (
                                <div>
                                    <SubAgentTransactionHistoryTableHeader
                                        csvData={props.csvProps}
                                        filter={Filter}
                                        filtered={isfiltered}
                                        dataLength={data.length}
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
                                            { ...props.baseProps }
                                        />
                                    )}
                                </div>)
                            }
                        </ToolkitProvider>
                    </div>
                </div>
            </div>
        </>
    );
}
