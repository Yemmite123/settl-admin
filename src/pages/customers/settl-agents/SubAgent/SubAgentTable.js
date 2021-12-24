import React, { useState, createRef, useEffect } from "react";
import { Badge, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import Loader from "../../../../components/Loader";
import SubAgentTableHeader from "./SubAgentTableHeader";
import more from "./../../../../assets/img/icons/more.svg";

const tableColumns = [
    {
      dataField: "name",
      text: "Name"
    },
    {
        dataField: "agentId",
        text: "Agent ID"
    },
    {
        dataField: "phoneNumber",
        text: "Phone Number"
    },
    {
        dataField: "lastActive",
        text: "Last Active"
    },
    {
        dataField: "status",
        text: "Status",
        headerClasses: "text-center",
        formatter: (cell) => {
            if (cell.toLowerCase() === "active") {
                return <Badge color="secondary" className="badge-active">{cell}</Badge>
            }
            if (cell.toLowerCase() === "inactive") {
                return <Badge color="secondary" className="badge-inactive">{cell}</Badge>
            }
        }
    },
    {
        dataField: "actions",
        text: ""
    }
];


export default function SubAgentTable({setShowSubAgentDetails}) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleAction = () => setDropdownOpen(!dropdownOpen);

    const actionRef = createRef();

    const tableData = [
        {
            id: 1,
            name: "Kikelomo Tobi",
            agentId: "005622311",
            phoneNumber: "09029266338",
            lastActive: "5-1-2021 10:38 AM",
            status: "Active",
 
            actions:  <Dropdown isOpen={dropdownOpen} toggle={toggleAction}>
                <DropdownToggle caret>
                    <img src={more} alt="an icon" />
                </DropdownToggle>
                <DropdownMenu ref={actionRef}>
                    <DropdownItem>Remove Sub-Admin</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        },
        {
            id: 2,
            name: "Kikelomo Tobi",
            agentId: "005622311",
            phoneNumber: "09029266338",
            lastActive: "5-1-2021 10:38 AM",
            status: "Inactive"
        },
        {
            id: 3,
            name: "Kikelomo Tobi",
            agentId: "005622311",
            phoneNumber: "09029266338",
            lastActive: "5-1-2021 10:38 AM",
            status: "Active"
        },
        {
            id: 4,
            name: "Kikelomo Tobi",
            agentId: "005622311",
            phoneNumber: "09029266338",
            lastActive: "5-1-2021 10:38 AM",
            status: "Active"
        },
        {
            id: 5,
            name: "Kikelomo Tobi",
            agentId: "005622311",
            phoneNumber: "09029266338",
            lastActive: "5-1-2021 10:38 AM",
            status: "Active"
        },
        {
            id: 6,
            name: "Kikelomo Tobi",
            agentId: "005622311",
            phoneNumber: "09029266338",
            lastActive: "5-1-2021 10:38 AM",
            status: "Active"
        },
        {
            id: 7,
            name: "Kikelomo Tobi",
            agentId: "005622311",
            phoneNumber: "09029266338",
            lastActive: "5-1-2021 10:38 AM",
            status: "Active"
        },
        {
            id: 8,
            name: "Kikelomo Tobi",
            agentId: "005622311",
            phoneNumber: "09029266338",
            lastActive: "5-1-2021 10:38 AM",
            status: "Inactive"
        },
        {
            id: 9,
            name: "Kikelomo Tobi",
            agentId: "005622311",
            phoneNumber: "09029266338",
            lastActive: "5-1-2021 10:38 AM",
            status: "Active"
        },
        {
            id: 10,
            name: "Kikelomo Tobi",
            agentId: "005622311",
            phoneNumber: "09029266338",
            lastActive: "5-1-2021 10:38 AM",
            status: "Active"
        }
    ]

    const [isfiltered, setIsFiltered] = useState(false);
    const [data, setData] = useState(tableData);

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

    // const rowEvents = {
    //     onClick: (e, row, rowIndex) => {
    //         setShowSubAgentDetails((prev) => !prev);
    //     }
    // }

    return(
        <>
            <div className="admin-body">
                <div className="all-admins">
                    <h6>Sub Agents</h6>
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
                                    <SubAgentTableHeader 
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
                                            // rowEvents={rowEvents}
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
