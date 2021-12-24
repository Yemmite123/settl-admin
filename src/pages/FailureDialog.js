import React from "react";
import { Modal, ModalHeader } from "reactstrap";
import failIcon from "./../assets/img/icons/fail.svg";

export default function FailureDialog(props) {
    return(
        <>
            <Modal 
                isOpen={props.isOpen} 
                toggle={props.toggle} 
                className="admin-modal success-modal"
                style={{maxWidth: "500px"}}
            >
                <ModalHeader toggle={props.toggle}>
                    <div className="d-flex">
                        <div className="mr-3">
                            <img src={failIcon} alt="check icon" />
                        </div>
                        <div>
                            <h6>{props.title}</h6>
                            <p className="mt-2 w-90" style={{lineHeight: "normal"}}>{props.details}</p>
                        </div>
                    </div>
                </ModalHeader>
            </Modal>
        </>
    );
}
