import React, { useState } from "react";
import { ReactComponent as Close } from "../../../BgImages/close.svg";
import { Modal, Button } from "react-bootstrap";
import { Input } from "reactstrap";
const ReportsModal = ({ show, setShow, data }) => {
  const [name, setName] = useState("Assurance Uwangue");
  const [reason, setReason] = useState("");
  const handleChange = (e, set) => {
    const { value } = e.target;
    set(value);
  };
  return (
    <Modal
      show={show}
      centered
      onHide={() => setShow(false)}
      className="transaction-modal"
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
          {data.title}
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
          padding: "3rem 2rem",
          height: "100%",
          gap: "30px",
        }}
      >
        <p
          style={{
            textAlign: "center",
            margin: "0 auto",
            fontSize: "16px",
          }}
        >
          Please confirm this is the right {data.type.toLowerCase()} account
          before initiating this process
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <fieldset
            className="float-label"
            style={{
              margin: "0",
            }}
          >
            <Input
              name="name"
              autoComplete="off"
              type="text"
              className="form-control shadow-none"
              value={name}
              style={{
                margin: "0",
              }}
              onChange={(e) => handleChange(e, setName)}
              required
            />
            <label htmlFor="Full_Name">Admin Full Name</label>
          </fieldset>
          <Input
            type="textarea"
            className="form-control shadow-none"
            style={{
              backgroundColor: "#FAFAFA",
              resize: "none",
              height: "200px",
              padding: "20px",
            }}
            onChange={(e) => handleChange(e, setReason)}
            placeholder={data.reason}
          />
        </div>

        <Button
          onClick={() => setShow(false)}
          style={{
            backgroundColor: "#4F1699",
            padding: ".6rem 1.5rem",
            marginTop: "1rem",
          }}
        >
          {data.placeholder}
        </Button>
      </div>
    </Modal>
  );
};

export default ReportsModal;
