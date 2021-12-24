import React, { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import Loader from "../../../components/Loader";
import WalletTableHeader from "./WalletTableHeader";

const tableData = [
    {
        id: 1,
        date: "5-1-2021 10:38 AM",
        transactionRef: "SETTL-DST...",
        amount: "70,000.00",
        transactionType: "Debit",
        source: "Refund",
        transactionName: "DSTV"
    },
    {
        id: 2,
        date: "5-1-2021 10:38 AM",
        transactionRef: "SETTL-DST...",
        amount: "70,000.00",
        transactionType: "Debit",
        source: "Payment",
        transactionName: "Transfer"
    },
    {
        id: 3,
        date: "5-1-2021 10:38 AM",
        transactionRef: "SETTL-DST...",
        amount: "70,000.00",
        transactionType: "Credit",
        source: "Commission",
        transactionName: "Transfer"
    },
    {
        id: 4,
        date: "5-1-2021 10:38 AM",
        transactionRef: "SETTL-DST...",
        amount: "70,000.00",
        transactionType: "Debit",
        source: "Refund",
        transactionName: "DSTV"
    },
    {
        id: 5,
        date: "5-1-2021 10:38 AM",
        transactionRef: "SETTL-DST...",
        amount: "70,000.00",
        transactionType: "Debit",
        source: "Payment",
        transactionName: "Transfer"
    },
    {
        id: 6,
        date: "5-1-2021 10:38 AM",
        transactionRef: "SETTL-DST...",
        amount: "70,000.00",
        transactionType: "Credit",
        source: "Commission",
        transactionName: "Transfer"
    },
    {
        id: 7,
        date: "5-1-2021 10:38 AM",
        transactionRef: "SETTL-DST...",
        amount: "70,000.00",
        transactionType: "Debit",
        source: "Refund",
        transactionName: "DSTV"
    },
    {
        id: 8,
        date: "5-1-2021 10:38 AM",
        transactionRef: "SETTL-DST...",
        amount: "70,000.00",
        transactionType: "Debit",
        source: "Payment",
        transactionName: "Transfer"
    },
    {
        id: 9,
        date: "5-1-2021 10:38 AM",
        transactionRef: "SETTL-DST...",
        amount: "70,000.00",
        transactionType: "Credit",
        source: "Commission",
        transactionName: "Transfer"
    },
    {
        id: 10,
        date: "5-1-2021 10:38 AM",
        transactionRef: "SETTL-DST...",
        amount: "70,000.00",
        transactionType: "Credit",
        source: "Commission",
        transactionName: "Transfer"
    }
]

const tableColumns = [
    {
      dataField: "date",
      text: "Date"
    },
    {
        dataField: "transactionRef",
        text: "Transaction Ref"
    },
    {
        dataField: "amount",
        text: "Amount(N)"
    },
    {
        dataField: "transactionType",
        text: "Tranx Type"
    },
    {
        dataField: "source",
        text: "Source",
    },
    {
        dataField: "transactionName",
        text: "Tranx Name"
    }
];

export default function WalletTable() {
    const [isfiltered, setIsFiltered] = useState(false);
    const [data, setData] = useState(tableData);

    const Filter = (data) => {
        setData("");
        const check = data.type.length > 0
    
        setTimeout(() => {
          const filtered = tableData.filter((product) => {
            if (check) {
              setIsFiltered(true);
              return (
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
            console.log(rowIndex)
        }
    }


    return(
        <>
            <div className="admin-body">
                <div className="all-admins">
                    <h6>Wallet History</h6>
                    <div className="admin-table">
                        <ToolkitProvider
                            keyField="id"
                            data={data}
                            columns={tableColumns}
                            exportCSV={{
                                fileName: "sub agents data.csv",
                            }}
                            search
                        >
                            {
                                props => (
                                <div>
                                    <WalletTableHeader 
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
