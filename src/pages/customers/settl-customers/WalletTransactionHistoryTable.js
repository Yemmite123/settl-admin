import React, { useState, createRef, useEffect } from "react";
import ReactDOM from "react-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import WalletTransactionHistoryTableHeader from "./WalletTransactionHistoryTableHeader";
import Loader from "../../../components/Loader";
import actionIcon from "../../../assets/img/icons/threedots.svg";
import {
  DropdownMenu,
  DropdownToggle,
  Dropdown,
  DropdownItem,
} from "reactstrap";
import CreditWalletDialog from "../CreditWalletDialog";
import DebitWalletDialog from "../DebitWalletDialog";
import Moment from "react-moment";

export default function WalletTransactionHistoryTable({ tableData }) {
  const [isfiltered, setIsFiltered] = useState(false);
  const [data, setData] = useState(tableData);
  const currentDate = new Date();
  const currentDateFormat = currentDate.setHours(0, 0, 0, 0);

  const [currentTransId, setCurrentTransId] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [index, setIndex] = useState(null);
  const [debitModal, setDebitModal] = useState(false);
  const [creditModal, setCreditModal] = useState(false);

  const toggleCreditModal = () => setCreditModal(!creditModal);
  const toggleDebitModal = () => setDebitModal(!debitModal);

  const itemOne = createRef();
  const itemTwo = createRef();
  useEffect(() => {
    let option1 = ReactDOM.findDOMNode(itemOne?.current);
    let option2 = ReactDOM.findDOMNode(itemTwo?.current);
    if (option1) {
      option1.addEventListener("click", () => {
        setCreditModal(true);
      });
    }
    if (option2) {
      option2.addEventListener("click", () => {
        setDebitModal(true);
      });
    }
  }, [itemOne, itemTwo]);

  const customerTrans = data.map(dat => dat.transId);
  const customerAmount = data.map(amount => amount.transAmount);

 const fullName =  data.map(customerDetail => customerDetail.tocustomerName)
 const  customerPhone=  data.map(customerDetail => customerDetail.tocustomerId)
 
 

  const Filter = (data) => {
    setData("");
    const check =
      data.source.length > 0 ||
      data.endDate !== currentDateFormat ||
      data.startDate !== currentDateFormat;

    setTimeout(() => {
      const filtered = tableData.filter((product) => {
        if (check) {
          setIsFiltered(true);
          const dataDate = new Date(product.transDate).setHours(0, 0, 0, 0);
          return (
            data.source.includes(product.fundSource.toLowerCase()) ||
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
  const tableColumns = [
    {
      dataField: "transDate",
      text: "Date",
      formatter: (cell, row, rowIndex) => <Moment format="DD/MM/YYYY HH:mm">{cell}</Moment>
    },
    {
      dataField: "fundSource",
      text: "Wallet Type",
    },
    {
      dataField: "transId",
      text: "Tranx Ref.",
    },
    {
      dataField: "transType",
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
      dataField: "transChannel",
      text: "Payment Source",
    },
    {
      dataField: "!",
      text: "",
      headerStyle: {
        backgroundColor: "#fdfcff",
        borderBottom: "none",
        width: "20px",
      },
      style: () => ({
        cursor: "pointer",
      }),
      formatter: (cell, row, rowIndex) => {
        return (
          <Dropdown
            isOpen={data[rowIndex].dropdown}
            toggle={() => setIndex(null)}
          >
            <DropdownToggle>
              <img src={actionIcon} alt="actionIcon" />
            </DropdownToggle>
            {rowIndex == index && (
              <DropdownMenu
                style={{
                  left: "-100px",
                }}
              >
                <DropdownItem className="item" ref={itemOne}>
                  Credit Wallet
                </DropdownItem>
                <DropdownItem ref={itemTwo} className="item">
                  Debit Wallet
                </DropdownItem>
              </DropdownMenu>
            )}
          </Dropdown>
        );
      },
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          setIndex(rowIndex);
          setCurrentTransId(customerTrans[rowIndex]);
          setCurrentAmount(customerAmount[rowIndex]);
          data[rowIndex].dropdown = true;
        },
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
      console.log(rowIndex);
    },
  };

  return (
    <>
      <div className="admin-body">
        <div className="all-admins">
          <h6>Transaction History</h6>
          <div className="admin-table">
            <ToolkitProvider
              responsive
              keyField="id"
              data={data}
              columns={tableColumns}
              exportCSV={{
                fileName: "wallet transaction history data.csv",
              }}
              search
            >
              {(props) => (
                <div>
                  <WalletTransactionHistoryTableHeader
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
                      {...props.baseProps}
                    />
                  )}
                </div>
              )}
            </ToolkitProvider>
          </div>
        </div>
      </div>
      <CreditWalletDialog
        isOpen={creditModal}
        toggle={toggleCreditModal}
        transRef={currentTransId}
        amount={currentAmount}
        fullName={fullName[0]}
        phoneNo = {customerPhone[0]}
      />
      <DebitWalletDialog
       transRef={currentTransId}
       amount={currentAmount}
       fullName={fullName[0]}
       phoneNo = {customerPhone[0]}
      isOpen={debitModal} 
      toggle={toggleDebitModal} />
    </>
  );
}
