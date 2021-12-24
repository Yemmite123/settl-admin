import React, { useEffect } from "react";
import checkIcon from "../../assets/img/icons/check.svg";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { ReactComponent as Close } from "../../BgImages/close.svg";

const SuccessModal = ({ show, setShow }) => {
  // setTimeout(() => {
  //   setShow(false);
  // }, 2000);
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 2000);
  }, []);
  return (
    <Modal
      isOpen={show}
      toggle={() => setShow(false)}
      className="admin-modal complete-modal"
    >
      <ModalHeader></ModalHeader>
      <ModalBody className="W-75">
        <div className="d-flex py-2 position-relative">
          <div className="mr-3" onClick={() => setShow(false)}>
            <img src={checkIcon} alt="lock icon" />
            <br />
          </div>
          <div>
            <h4>Success message</h4>
            <p>Reconcilation Data sucessfully created</p>
          </div>
          <Close
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              cursor: "pointer",
            }}
          />
        </div>
      </ModalBody>
    </Modal>
  );
};
export default SuccessModal;
