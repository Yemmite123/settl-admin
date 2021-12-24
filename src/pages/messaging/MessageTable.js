import React, { useState, useEffect } from "react";
import { Badge  } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import Loader from "./../../components/Loader";
import MessageTableHeader from "./MessageTableHeader";
import messageRequest from "../../requests/message";


const tableColumns = [
    {
      dataField: "date",
      text: "Date",
      formatter: (cell, row, rowIndex) => {
        return cell.slice(0, -5);
      }
    },
    {
        dataField: "messageTypes",
        text: "Type"
    },
    {
        dataField: "sender",
        text: "Sender"
    },
    {
        dataField: "messageTitle",
        text: "Title"
    },
    {
        dataField: "messageDescription",
        text: "Message",
    },
    {
      dataField: "status",
      text: "Status",
      headerClasses: "text-center",
      formatter: (cell, row, rowIndex) => {
        if (cell.toLowerCase() === "sent") {
            return <Badge color="secondary" className="badge-active">{cell}</Badge>
        }
        if (cell.toLowerCase() === "draft") {
            return <Badge color="secondary" className="badge-pending">{cell}</Badge>
        }
        if (cell.toLowerCase() === "failed") {
            return <Badge color="secondary" className="badge-unresolved">{cell}</Badge>
        }
      }
    }
];

export default function MessageTable({setShowMessageDetails, setDetails}) {
    const [isfiltered, setIsFiltered] = useState(false);
    const [data, setData] = useState("");
    const [tableData, setTableData] = useState("");

    const { getAllMessages } = messageRequest();

    const getRecentMessagesList = async() => {
        const response = await getAllMessages();
        if(response.code === "00") {
          console.log(response.data);
          setData(response.data);
          setTableData(response.data);
        }
    }

    useEffect(() => {
        getRecentMessagesList();
    }, []);

    const Filter = (data) => {
        setData("");
        const check = data.status.length > 0
    
        setTimeout(() => {
          const filtered = tableData.filter((product) => {
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

    const rowEvents = {
        onClick:  (e, row, rowIndex) => {
            setDetails(row);
            setShowMessageDetails((prev) => !prev);
        }
    }

    return(
        <>
            <div className="admin-table message-table mt-4">
                <ToolkitProvider
                    keyField="id"
                    data={data}
                    columns={tableColumns}
                >
                    {
                        props => (
                        <div>
                            <MessageTableHeader
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
                                    rowEvents={rowEvents}
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
        </>
    );
}
