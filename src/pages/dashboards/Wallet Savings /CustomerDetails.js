import { Transfer } from "antd";
import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import logo from "../../../assets/img/icons/customercard.svg";
import Modal from "./Modal";
import { Link } from "react-router-dom";

const CustomerDetails = ({ setShowCustomerDetails, details }) => {
  const refund = {
    title: `Refund Customer`,
    reason: "Refund Reason",

    placeholder: "Initiate Refund",
  };
  const reprocess = {
    title: "Reprocess Transaction",
    reason: "Reprocess Reason",
    placeholder: "Reprocess",
  };

  const [modalDetail, setModalDetail] = useState(null);
  const [show, setShow] = useState(false);
  const [transId] = useState(details.transId);

  const customerData = [
    { "Transaction Name": details.transDomain },
    { "Savings Wallet": details.fundSource },
    { "Wallet Name": details.transType },
    { "Transaction Type": details.transEntry },
    // { "Transaction Reference": "Debit" },
    { "Created at": details.transDate },
    {
      "Customer ID": (
        <Link to={"/customers/details/" + details.customerId}>
          <p className="name">{details.customerId}</p>{" "}
        </Link>
      ),
    },
    { "Customer Wallet ID": details.transId },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div style={{ display: "flex", gap: "10px", padding: "10px" }}>
        <span
          style={{ color: "#4f1699", cursor: "pointer" }}
          onClick={() => setShowCustomerDetails((prev) => !prev)}
        >
          All Saving Transactions
        </span>
        <span style={{ color: "#304762" }}>{" > "}</span>{" "}
        <span style={{ color: "#304762" }}>Savings Transaction Details</span>
      </div>
      <div className="customer_card_body">
        <div className="flex">
          <div>
            <div>
              <h4 className="greeting">
                <img src={logo} className="" alt="Settl Logo" />
                <span className="pl-2">Savings Transaction Details </span>
              </h4>
              <div className="flex">
                <p className="price">{`₦${details.transAmount}.00`}</p>
                <p
                  className={
                    "status " +
                    (details.transStatus === "SUCCESS"
                      ? "success"
                      : details.transStatus === "REFUNDED"
                      ? "registered"
                      : "failed")
                  }
                >
                  {details.transStatus}
                </p>
              </div>
            </div>
          </div>
          {details.transStatus === "FAILED" ? (
            <div className="buttons">
              <Button
                className="button_neutral"
                onClick={() => {
                  setModalDetail(refund);
                  setShow(true);
                }}
              >
                Refund Customer
              </Button>
              <Button
                className="button_approve"
                onClick={() => {
                  setModalDetail(reprocess);
                  setShow(true);
                }}
              >
                Reprocess Transaction
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="details">
          {customerData.map((info) => (
            <div
              style={{
                display: "flex",
              }}
            >
              <p
                style={{
                  width: "50%",
                  color: "rgba(48, 71, 98, 0.8)",
                }}
              >
                {Object.keys(info)}
              </p>
              <p
                style={{
                  width: "50%",
                  color: "#304762",
                  fontWeight: 500,
                }}
              >
                {Object.values(info)}
              </p>
            </div>
          ))}
        </div>
      </div>
      {modalDetail && (
        <Modal
          show={show}
          setShow={setShow}
          data={modalDetail}
          transId={transId}
          // reload={setShowCustomerDetails(false)}
        />
      )}
    </>
  );
};
export default CustomerDetails;
