import React from "react";
import { Modal, ModalHeader } from "reactstrap";
import checkIcon from "./../../../assets/img/icons/check.svg";

export default function UpgradeSuccessDialog(props) {
    return(
        <>
            <Modal isOpen={props.isOpen} toggle={props.toggle} className="admin-modal success-modal">
                <ModalHeader toggle={props.toggle}>
                    <div className="d-flex">
                        <div className="mr-3">
                            <img src={checkIcon} alt="check icon" />
                        </div>
                        <div>
                            <h6>Success</h6>
                            <p>Account upgrade request sent sucessfully</p>
                        </div>
                    </div>
                </ModalHeader>
            </Modal>
        </>
    );
}
