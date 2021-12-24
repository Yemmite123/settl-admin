import React, { useState } from "react";
import { ReactComponent as Close } from "../../BgImages/close.svg";
import { 
    Button,
    Modal, 
    ModalBody,
    ModalHeader,
    Form,
    FormGroup,
    Label 
} from "reactstrap";
import InputBox from "../../components/InputBox";

export default function RefundDialog(props) {
    const [adminFullName, setAdminFullName] = useState("Assurance uwangue");
    const [reasonForRefund, setReasonForRefund] = useState("");
    
    return(
        <>
            <Modal isOpen={props.isOpen} toggle={props.toggle} className="admin-modal freeze-modal">
                <ModalHeader style={{textTransform: "capitalize"}}>
                    Refund {props.title}
                    <Close
                        className="close-modal"
                        onClick={props.toggle}
                    />
                </ModalHeader>
                <ModalBody>
                    <div>
                        <div className="text-center">
                            <p>Please confirm this is the right {props.title} account before initiating this process</p>
                        </div>
                        <Form>
                            <FormGroup>
                                <InputBox
                                    type="text"
                                    name="adminFullName" 
                                    id="adminFullName"
                                    value={adminFullName}
                                    onChange={(e) => setAdminFullName(e.target.value)}
                                />
                                <Label for="adminFullName">Admin Full Name</Label>
                            </FormGroup>
                            <FormGroup className="pb-3">
                                <InputBox
                                    type="textarea"
                                    name="reasonForRefund"
                                    id="reasonForRefunc"
                                    placeholder="Refund Reason"
                                    value={reasonForRefund}
                                    rows="4"
                                    onChange={(e) => setReasonForRefund(e.target.value)}
                                />
                            </FormGroup>
                        </Form>
                        <div className="w-100 mt-4">
                            <Button color="primary" className="btn-add w-100 py-3">Initiate Refund</Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}
