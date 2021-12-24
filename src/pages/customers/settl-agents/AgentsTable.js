import React, { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import paginationFactory from "react-bootstrap-table2-paginator";
import Loader from "../../../components/Loader";
import { Badge } from "reactstrap";
import AgentTableHeader from "./AgentTableHeader";

const tableData = [
    {
        id: 1,
        name: "Carolyn Harvey Super",
        phoneNumber: "08056389029",
        agentId: "SETT-27499066",
        walletBalance: "₦70,000.00",
        lastActive: "5-1-2021 10:38 AM",
        kycLevel: "2",
        status: "Active"
    },
    {
        id: 2,
        name: "Carolyn Harvey Sub",
        phoneNumber: "08056389029",
        agentId: "SETT-27499066",
        walletBalance: "₦70,000.00",
        lastActive: "5-1-2021 10:38 AM",
        kycLevel: "1",
        status: "Inactive"
    },
    {
        id: 3,
        name: "Carolyn Harvey Super",
        phoneNumber: "08056389029",
        agentId: "SETT-27499066",
        walletBalance: "₦70,000.00",
        lastActive: "5-1-2021 10:38 AM",
        kycLevel: "2",
        status: "New"
    },
    {
        id: 4,
        name: "Carolyn Harvey Sub",
        phoneNumber: "08056389029",
        agentId: "SETT-27499066",
        walletBalance: "₦70,000.00",
        lastActive: "5-1-2021 10:38 AM",
        kycLevel: "2",
        status: "Active"
    },
    {
        id: 5,
        name: "Carolyn Harvey Settl",
        phoneNumber: "08056389029",
        agentId: "SETT-27499066",
        walletBalance: "₦70,000.00",
        lastActive: "5-1-2021 10:38 AM",
        kycLevel: "3",
        status: "Inactive"
    },
    {
        id: 6,
        name: "Carolyn Harvey Settl",
        phoneNumber: "08056389029",
        agentId: "SETT-27499066",
        walletBalance: "₦70,000.00",
        lastActive: "5-1-2021 10:38 AM",
        kycLevel: "1",
        status: "New"
    },
    {
        id: 7,
        name: "Carolyn Harvey Super",
        phoneNumber: "08056389029",
        agentId: "SETT-27499066",
        walletBalance: "₦70,000.00",
        lastActive: "5-1-2021 10:38 AM",
        kycLevel: "1",
        status: "Dormant"
    },
    {
        id: 8,
        name: "Carolyn Harvey Super",
        phoneNumber: "08056389029",
        agentId: "SETT-27499066",
        walletBalance: "₦70,000.00",
        lastActive: "5-1-2021 10:38 AM",
        kycLevel: "2",
        status: "Active"
    },
    {
        id: 9,
        name: "Carolyn Harvey Sub",
        phoneNumber: "08056389029",
        agentId: "SETT-27499066",
        walletBalance: "₦70,000.00",
        lastActive: "5-1-2021 10:38 AM",
        kycLevel: "1",
        status: "Inactive"
    },
    {
        id: 10,
        name: "Carolyn Harvey Super",
        phoneNumber: "08056389029",
        agentId: "SETT-27499066",
        walletBalance: "₦70,000.00",
        lastActive: "5-1-2021 10:38 AM",
        kycLevel: "2",
        status: "New"
    },
    {
        id: 11,
        name: "Carolyn Harvey Sub",
        phoneNumber: "08056389029",
        agentId: "SETT-27499066",
        walletBalance: "₦70,000.00",
        lastActive: "5-1-2021 10:38 AM",
        kycLevel: "2",
        status: "Active"
    },
    {
        id: 12,
        name: "Carolyn Harvey Settl",
        phoneNumber: "08056389029",
        agentId: "SETT-27499066",
        walletBalance: "₦70,000.00",
        lastActive: "5-1-2021 10:38 AM",
        kycLevel: "3",
        status: "Inactive"
    },
    {
        id: 13,
        name: "Carolyn Harvey Settl",
        phoneNumber: "08056389029",
        agentId: "SETT-27499066",
        walletBalance: "₦70,000.00",
        lastActive: "5-1-2021 10:38 AM",
        kycLevel: "1",
        status: "New"
    },
    {
        id: 14,
        name: "Carolyn Harvey Super",
        phoneNumber: "08056389029",
        agentId: "SETT-27499066",
        walletBalance: "₦70,000.00",
        lastActive: "5-1-2021 10:38 AM",
        kycLevel: "1",
        status: "Dormant"
    },
]

const tableColumns = [
    {
      dataField: "name",
      text: "Name"
    },
    {
      dataField: "phoneNumber",
      text: "Phone number"
    },
    {
      dataField: "agentId",
      text: "Agent ID"
    },
    {
        dataField: "walletBalance",
        text: "Wallet Balance",
        classes: "text-right",
        headerClasses: "text-right",
    },
    {
      dataField: "lastActive",
      text: "Last active"
    },
    {
        dataField: "kycLevel",
        text: "KYC Level"
    },
    {
        dataField: "status",
        text: "Status",
        headerClasses: "text-center",
        formatter: (cell, row, rowIndex) => {
            if (cell.toLowerCase() === "inactive") {
                return <Badge color="secondary" className="badge-inactive">{cell}</Badge>
            }
            if (cell.toLowerCase() === "active") {
                return <Badge color="secondary" className="badge-active">{cell}</Badge>
            }
            if (cell.toLowerCase() === "new") {
                return <Badge color="secondary" className="badge-new">{cell}</Badge>
            }
            if (cell.toLowerCase() === "dormant") {
                return <Badge color="secondary" className="badge-dormant">{cell}</Badge>
            }
        }
    }
];

export default function AgentsTable({setShowDetails}) {
    const [isfiltered, setIsFiltered] = useState(false);
    const [data, setData] = useState(tableData);

    const Filter = (data) => {
        setData("");
        const check = data.status.length > 0 || data.type.length > 0
    
        setTimeout(() => {
          const filtered = tableData.filter((product) => {
            if (check) {
              setIsFiltered(true);
              return (
                data.status.includes(product.status.toLowerCase()) ||
                data.type.includes(product.name.toLowerCase())
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
            setShowDetails((prev) => !prev);
        }
    }
    
    return(
        <>
            <div className="admin-body">
                <div className="all-admins">
                    <h6 className="table-title mb-0">All Settl Agents</h6>
                    <div className="admin-table">
                        <ToolkitProvider
                            keyField="id"
                            data={data}
                            columns={tableColumns}
                            exportCSV={{
                                fileName: "agent data.csv",
                            }}
                            search
                        >
                            {
                                props => (
                                <div>
                                    <AgentTableHeader 
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
