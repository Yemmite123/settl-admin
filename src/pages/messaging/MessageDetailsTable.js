import React, { useState } from "react";
import { Badge } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import Loader from "./../../components/Loader";
import MessageDetailsTableHeader from "./MessageDetailsTableHeader";

// const tableData = [
//     {
//         id: 1,
//         recipientName: "Carolyn Harvey",
//         phoneNumber: "090273788899",
//         status: "Sent"
//     },
//     {
//         id: 2,
//         recipientName: "Carolyn Harvey",
//         phoneNumber: "090273788899",
//         status: "Sent"
//     },
//     {
//         id: 3,
//         recipientName: "Carolyn Harvey",
//         phoneNumber: "090273788899",
//         status: "Sent"
//     },
//     {
//         id: 4,
//         recipientName: "Carolyn Harvey",
//         phoneNumber: "090273788899",
//         status: "Sent"
//     },
//     {
//         id: 5,
//         recipientName: "Carolyn Harvey",
//         phoneNumber: "090273788899",
//         status: "Sent"
//     },
//     {
//         id: 6,
//         recipientName: "Carolyn Harvey",
//         phoneNumber: "090273788899",
//         status: "Sent"
//     },
//     {
//         id: 7,
//         recipientName: "Carolyn Harvey",
//         phoneNumber: "090273788899",
//         status: "Sent"
//     },
//     {
//         id: 8,
//         recipientName: "Carolyn Harvey",
//         phoneNumber: "090273788899",
//         status: "Sent"
//     },
//     {
//         id: 9,
//         recipientName: "Carolyn Harvey",
//         phoneNumber: "090273788899",
//         status: "Sent"
//     },
//     {
//         id: 10,
//         recipientName: "Carolyn Harvey",
//         phoneNumber: "090273788899",
//         status: "Delivered"
//     }
// ]

const tableColumns = [
    {
      dataField: "recipientName",
      text: "Recipient Name"
    },
    {
        dataField: "phoneNumber",
        text: "Phone Number"
    },
    {
      dataField: "status",
      text: "Status",
      headerClasses: "text-center",
      formatter: (cell, row, rowIndex) => {
        if (cell.toLowerCase() === "sent") {
            return <Badge color="secondary" className="badge-active">{cell}</Badge>
        }
        if (cell.toLowerCase() === "delivered") {
            return <Badge color="secondary" className="badge-pending">{cell}</Badge>
        }
      }
    }
];

export default function MessageDetailsTable(props) {
    const [isfiltered, setIsFiltered] = useState(false);
    const [data, setData] = useState(props.tableData);

    const Filter = (data) => {
        setData("");
        const check = data.status.length > 0
    
        setTimeout(() => {
          const filtered = props.tableData.filter((product) => {
            if (check) {
              setIsFiltered(true);
              return (
                data.status.includes(product.status.toLowerCase())
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

    return(
        <>
            <div className="admin-body" style={{ height: "200px", overflowY: "auto" }}>
                <div className="all-admins pt-0">
                    <div className="admin-table message-table">
                        <ToolkitProvider
                            keyField="id"
                            data={data}
                            columns={tableColumns}
                        >
                            {
                                props => (
                                <div>
                                    <MessageDetailsTableHeader
                                        filter={Filter}
                                        filtered={isfiltered}
                                        dataLength={data.length}
                                    />
                                    {!data ? (
                                        <Loader />
                                    ) :(
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
