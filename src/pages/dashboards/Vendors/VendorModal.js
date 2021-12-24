import React, { useEffect } from "react";
import { ReactComponent as Close } from "../../../BgImages/close.svg";
import { ReactComponent as SecurityWarning } from "../../../assets/img/icons/security-warning.svg";
import { Modal, Button } from "react-bootstrap";
import { useAPI } from "../../../contexts/VendorContext";
import vendorsRequest from "./../../../requests/vendor-management";

const VendorModal = ({ show, setShow, index, setData }) => {
  const { vendors } = useAPI();
  const { modifyVendorStatus } = vendorsRequest();

  const deactivate = async () => {
    const data = vendors;
    //data[index].status ? !data[index].status : data[index].status
    //setData(data);
    if (data[index].status === true) {
      data[index].status = !data[index].status;
    } else {
      data[index].status = !data[index].status;
    }

    const response = await modifyVendorStatus({
      id: data[index].id,
      status: data[index].status,
    });
    if (response.code == "00") {
      console.log(response.data);
      setShow(false);
    } else {
      setShow(true);
      data[index].status = !data[index].status;
    }
  };

  return (
    <Modal
      show={show}
      centered
      onHide={() => setShow(false)}
      className="vendor-modal"
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
          {vendors[index]?.status ? "Deactivation" : "Activation"} Confirmation
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
          gap: "10px",

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
            color: "#19283C",
            maxWidth: "70%",
            opacity: ".5",
            padding: "10px 0",
          }}
        >
          This means {vendors[index]?.vendorName} will{" "}
          {vendors[index]?.status ? "no longer" : ""} process transfer
          transaction on Settl
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
          onClick={() => {
            deactivate();
          }}
          style={{
            backgroundColor: `${vendors[index]?.status ? "red" : "#4F1699"}`,
            padding: ".6rem 1.5rem",
            marginRight: "1rem",
            marginTop: "1rem",
            color: "white",
            border: "none",
          }}
        >
          {vendors[index]?.status ? "Yes, Deactivate" : "Activate"}
        </Button>
      </div>
    </Modal>
  );
};
export default VendorModal;
