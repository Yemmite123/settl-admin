import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import logo from "../../../assets/img/icons/customercard.svg";
import Modal from "./Modal";
import cardRequests from "../../../requests/card-management";

const CustomerDetails = ({setShowCustomerDetails, details}) => {
  const [show, setShow] = useState(false);
  const { getCardById, approveRequest, declineRequest } = cardRequests();
  const [customerDetails, setCustomerDetails] = useState("");

  const getCardDetails = async () => {
    console.log(details);
    const response = await getCardById(details.phoneno);
    if(response.code === "00") {
      console.log(response.data);
      setCustomerDetails(response.data);
    }
  }

  const customerData = [
    { "Customer Phone Number": customerDetails.phoneno },
    { "Created at": customerDetails.createdAt },
    { "Customer ID": <p className="name">{customerDetails.customerId}</p> },
    { "Customer BVN": customerDetails.bvn },
    { "Wallet associated with Card": customerDetails.walletAssociated },
    { "Card Type": customerDetails.cardType },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    getCardDetails();
  }, []);

  const handleApproval = async () => {
    const response = await approveRequest(details.phoneno);
    if(response.code === "06") {
      console.log(response.data);
      setShowCustomerDetails(false);
    }
    setShowCustomerDetails(false)
  }

  const handleDecline = async () => {
    const response = await declineRequest(details.phoneno);
    if(response.code === "00") {
      console.log(response.data);
      setShowCustomerDetails(false);
      setShow(false);
    }
    setShowCustomerDetails(false);
    setShow(false);
  }

  return (
    <>
      <div style={{ display: "flex", gap: "10px", padding: "10px" }}>
        <span
          style={{ color: "#4f1699", cursor: "pointer" }}
          onClick={() => setShowCustomerDetails((prev) => !prev)}
        >
          Card Management
        </span>
        <span style={{ color: "#304762" }}>{" > "}</span>{" "}
        <span style={{ color: "#304762" }}>Card Request Details</span>
      </div>
      <div className="customer_card_body">
        <div className="flex">
          <div>
            <h4 className="greeting">
              <img src={logo} className="" alt="Settl Logo" />
              <span className="pl-2">Customer Card Request </span>
            </h4>
            <p className="status pending">Pending</p>
          </div>
          <div className="buttons">
            <Button className="button_decline" onClick={() => setShow(true)}>
              Decline Request
            </Button>
            <Button 
              className="button_approve"
              onClick={handleApproval}
            >
              Approve Request
            </Button>
          </div>
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
      <Modal show={show} setShow={setShow} onClick={handleDecline} />
    </>
  );
};
export default CustomerDetails;
