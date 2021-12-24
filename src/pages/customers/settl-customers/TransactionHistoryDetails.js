import React, { useState, useEffect } from "react";
import {
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import ResetButton from "./../settl-customers/ResetButton";
import TransactionMoreDropDown from "./TransactionMoreDropdown";
import funds from "./../../../assets/img/icons/funds.svg";
import RefundDialog from "../RefundDialog";
import ReprocessTransactionDialog from "../ReprocessTransactionDialog";
import Loader from "../../../components/Loader";
import TransactionDetails from "../../../requests/transactions";
import Moment from "react-moment";

export default function TransactionHistoryDetails({
  setShowTransactionDetails,
  transRef,
}) {
  const { getTransactionDetails } = TransactionDetails();
  const [refundCustomer, setRefundCustomer] = useState(false);
  const [reprocessTransaction, setReprocessTransaction] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const toggleRefundCustomerDialog = () => setRefundCustomer(!refundCustomer);
  const toggleReprocessTransactionDialog = () =>
    setReprocessTransaction(!reprocessTransaction);

  const fetchData = async () => {
    setLoading(true);
    const response = await getTransactionDetails(transRef);
    if (response.code === "00") {
      setData(response.data);
      console.log(response.data);
    }
    setLoading(false);
  };

  const dataTemplate = [
    {
      id: "1",
      title: "Transaction Name",
      value: data.payMethod,
    },
    {
      id: "2",
      title: "Transaction Type",
      value: data.transType,
    },
    {
      id: "3",
      title: "Transaction Reference",
      value: data.transId,
    },
    {
      id: "4",
      title: "Paid at",
      value: <Moment format="DD-MM-YYYY hh:mm">{data.transDate}</Moment>,
    },
    {
      id: "5",
      title: "Recipient Account Number",
      value: (
        <div className="d-flex align-items-center">
          <div>
            <p className="mb-0 mr-3">{data.toCustomerAcctNo}</p>
          </div>
          <div>
            <ResetButton title="Blacklist biller ID" />
          </div>
        </div>
      ),
    },
    {
      id: "6",
      title: "Recipient Name",
      value: data.toCustomerName,
    },
    {
      id: "7",
      title: "Recipient Bank",
      value: "Wema Bank",
    },
    {
      id: "8",
      title: "Settl fee",
      value: "₦0.00",
    },
    {
      id: "9",
      title: "Transaction source",
      value: data.fundSource,
    },
    {
      id: "10",
      title: "Billing reference",
      value: data.referenceNo,
    },
    {
      id: "11",
      title: "Biller",
      value: "Interswitch",
    },
    {
      id: "12",
      title: "Description",
      value: data.transDescription,
    },
  ];
  const Classes = (option) => {
    if (option?.toLowerCase() === "pending") return "status pending";
    if (option?.toLowerCase() === "success") return "status success";
    if (option?.toLowerCase() === "failed") return "status failed";
    return "";
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Breadcrumb className="align-items-center">
        <BreadcrumbItem>
          <Link
            to="/customers/settl-customers"
            onClick={() => setShowTransactionDetails((prev) => !prev)}
          >
            Customer Profile
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>Transaction Details</BreadcrumbItem>
      </Breadcrumb>
      {loading ? (
        <Loader />
      ) : (
        <Card className="p-4">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <div className="d-flex align-items-center">
                <div>
                  <img src={funds} className="mr-2" alt="an icon" />
                </div>
                <div>
                  <p className="mb-0 fund-transfer">
                    Funds Transfer Transaction Detail
                  </p>
                </div>
              </div>
              <div className="d-flex transaction-amount mt-3">
                <div>
                  <h6 className="mb-0">
                    ₦{data?.transAmount?.toLocaleString()}
                  </h6>
                  <p className="mb-0">Incl. 0.00</p>
                </div>
                <div>
                  <p className={Classes(data.transStatus)}>
                    {data.transStatus}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="d-flex">
                <TransactionMoreDropDown />
                <ResetButton
                  title="Refund Customer"
                  className="mr-3"
                  onClick={() => setRefundCustomer(true)}
                />
                <Button
                  color="primary"
                  className="btn-add"
                  onClick={() => setReprocessTransaction(true)}
                >
                  Reprocess Transaction
                </Button>
              </div>
            </div>
          </div>
          <hr className="transaction-line" />
          <div className="transaction-details">
            {dataTemplate.map((transaction) => (
              <Row>
                <Col md={5}>
                  <p className="title">{transaction.title}</p>
                </Col>
                <Col md={7}>
                  <p className="value">{transaction.value}</p>
                </Col>
              </Row>
            ))}
          </div>
        </Card>
      )}
      <RefundDialog
        title="customer"
        isOpen={refundCustomer}
        toggle={toggleRefundCustomerDialog}
      />

      <ReprocessTransactionDialog
        title="customer"
        isOpen={reprocessTransaction}
        toggle={toggleReprocessTransactionDialog}
      />
    </>
  );
}
