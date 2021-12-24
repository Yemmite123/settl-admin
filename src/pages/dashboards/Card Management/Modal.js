import React from "react";
import { ReactComponent as Close } from "../../../BgImages/close.svg";
import { Modal, Button } from "react-bootstrap";
import { ReactComponent as SecurityWarning } from "../../../assets/img/icons/security.svg";

const CardManagementModal = ({ show, setShow, onClick }) => (
  <Modal
    show={show}
    centered
    onHide={() => setShow(setShow)}
    className="decline-modal"
  >
    <div
      style={{
        display: "relative",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          borderBottom: "1px solid rgba(231, 231, 237, 0.6)",
          padding: "1.5rem 0",
        }}
      >
        Decline Confirmation
      </h3>
      <Close
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          cursor: "pointer",
        }}
        onClick={() => setShow(false)}
      />
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "30px",
        maxWidth: "60%",
        textAlign: "center",
        margin: "5% auto",
      }}
    >
      <SecurityWarning
        style={{
          transform: "scale(1.5)",
        }}
      />
      <p
        style={{
          fontSize: "16px",
          opacity: "0.5",
        }}
      >
        Are you sure you want to decline this customer Card request?
      </p>
    </div>
    <div
      style={{
        position: "absolute",
        bottom: "25px",
        borderTop: "1px solid rgba(231, 231, 237, 0.6)",
        width: "100%",
        display: "flex",
        padding: "0 20px",
        justifyContent: "space-between",
      }}
    >
      <Button
        onClick={() => setShow(false)}
        style={{
          border: "1px solid #DADDE1",
          padding: ".6rem 1.5rem",
          marginRight: "1rem",
          marginTop: "1rem",
          backgroundColor: "white",
          color: "black",
        }}
      >
        Cancel
      </Button>
      <Button
        onClick={onClick}
        style={{
          backgroundColor: "red",
          padding: ".6rem 1.5rem",
          marginRight: "1rem",
          marginTop: "1rem",
          color: "white",
          border: "none",
        }}
      >
        Yes, Decline
      </Button>
    </div>
  </Modal>
);

export default CardManagementModal;
