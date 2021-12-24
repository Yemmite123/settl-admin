import React, { useState } from "react";
import { Badge } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import paginationFactory from "react-bootstrap-table2-paginator";
import Loader from "../../../../components/Loader";
import SubAgentIssueLogTableHeader from "./SubAgentIssueLogTableHeader";
import SubAgentIssueLogDetailsDialog from "./SubAgentIssueLogDetailsDialog";

const tableData = [
    {
        id: 1,
        transactionId: "ISO12600-66627023",
        issueId: "STTL10933W8...",
        transactionType: "Transfer",
        dateReported: "05-01-2021",
        status: "Resolved"
    },
    {
        id: 2,
        transactionId: "ISO12600-66627023",
        issueId: "STTL10933W8...",
        transactionType: "Bill Payment",
        dateReported: "05-01-2021",
        status: "Active"
    },
    {
        id: 3,
        transactionId: "ISO12600-66627023",
        issueId: "STTL10933W8...",
        transactionType: "Transfer",
        dateReported: "05-01-2021",
        status: "Unresolved"
    },
    {
        id: 4,
        transactionId: "ISO12600-66627023",
        issueId: "STTL10933W8...",
        transactionType: "Bill Payment",
        dateReported: "05-01-2021",
        status: "Unresolved"
    },
    {
        id: 5,
        transactionId: "ISO12600-66627023",
        issueId: "STTL10933W8...",
        transactionType: "Transfer",
        dateReported: "05-01-2021",
        status: "Resolved"
    },
    {
        id: 6,
        transactionId: "ISO12600-66627023",
        issueId: "STTL10933W8...",
        transactionType: "Bill Payment",
        dateReported: "05-01-2021",
        status: "Unresolved"
    },
    {
        id: 7,
        transactionId: "ISO12600-66627023",
        issueId: "STTL10933W8...",
        transactionType: "Transfer",
        dateReported: "05-01-2021",
        status: "Resolved"
    },
    {
        id: 8,
        transactionId: "ISO12600-66627023",
        issueId: "STTL10933W8...",
        transactionType: "Bill Payment",
        dateReported: "05-01-2021",
        status: "Unresolved"
    },
    {
        id: 9,
        transactionId: "ISO12600-66627023",
        issueId: "STTL10933W8...",
        transactionType: "Transfer",
        dateReported: "05-01-2021",
        status: "Resolved"
    },
    {
        id: 10,
        transactionId: "ISO12600-66627023",
        issueId: "STTL10933W8...",
        transactionType: "Bill Payment",
        dateReported: "05-01-2021",
        status: "Unresolved"
    }
]

const tableColumns = [
    {
      dataField: "transactionId",
      text: "Transaction ID"
    },
    {
      dataField: "issueId",
      text: "Issue ID"
    },
    {
      dataField: "transactionType",
      text: "Transaction Type"
    },
    {
      dataField: "dateReported",
      text: "Date Reported",
    },
    {
        dataField: "status",
        text: "Status",
        headerClasses: "text-center",
        formatter: (cell, row, rowIndex) => {
            if (cell.toLowerCase() === "active" || cell.toLowerCase() === "resolved") {
                return <Badge color="secondary" className="badge-active">{cell}</Badge>
            }
            if (cell.toLowerCase() === "unresolved") {
                return <Badge color="secondary" className="badge-unresolved">{cell}</Badge>
            }
        }
    }
];

export default function SubAgentIssueLogTable() {
    const [isfiltered, setIsFiltered] = useState(false);
    const [data, setData] = useState(tableData);
    const [showIssueLogDetails, setShowIssueLogDetails] = useState(false);

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
        onClick: (rowIndex) => {
            console.log(rowIndex);
            setShowIssueLogDetails(true);
        }
    }

    return(
        <>
            <div className="admin-body">
                <div className="all-admins">
                    <h6 className="table-title mb-0">Reported Issues</h6>
                    <ToolkitProvider
                        keyField="id"
                        data={data}
                        columns={tableColumns}
                        search
                    >
                        {
                            props => (
                                <div>
                                    <SubAgentIssueLogTableHeader
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
                                                rowEvents={rowEvents} 
                                                pagination={paginationFactory({
                                                    sizePerPage: 9,
                                                    hideSizePerPage: true,
                                                    showTotal: true,
                                                    paginationTotalRenderer: customTotal,
                                                })}
                                                { ...props.baseProps }
                                            />
                                        </div>
                                    )} 
                                </div>
                            )
                        }
                    </ToolkitProvider>
                </div>
            </div>

            <SubAgentIssueLogDetailsDialog
                isOpen={showIssueLogDetails}
                toggle={() => setShowIssueLogDetails(!showIssueLogDetails)}
            />
        </>
    );
}
