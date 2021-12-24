import React, { useState } from "react";
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

export default function FreezeWalletDialog(props) {
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState("+23400000000");
    const [reasonForFreeze, setReasonForFreeze] = useState("Fraud suspected");

    return(
        <>
            <Modal isOpen={props.isOpen} toggle={props.toggle} className="admin-modal freeze-modal">
                <ModalHeader>Freeze Confirmation</ModalHeader>
                <ModalBody>
                    <div>
                        <div className="text-center">
                            <img src={securityIcon} className="mb-3" alt="security warning icon" />
                            <p>Are you sure you want to freeze this user’s account?</p>
                        </div>
                        <Form>
                            <FormGroup>
                                <InputBox
                                    type="text"
                                    name="customerPhoneNumber" 
                                    id="customerPhoneNumber"
                                    value={customerPhoneNumber}
                                    onChange={(e) => setCustomerPhoneNumber(e.target.value)}
                                />
                                <Label for="customerPhoneNumber">Customer Phone Number</Label>
                            </FormGroup>
                            <FormGroup className="pb-3">
                                <InputBox
                                    type="textarea"
                                    name="reasonForFreeze"
                                    id="reasonForFreeze"
                                    value={reasonForFreeze}
                                    rows="4"
                                    onChange={(e) => setReasonForFreeze(e.target.value)}
                                />
                            </FormGroup>
                        </Form>
                        <hr/>
                        <div className="d-flex justify-content-between">
                            <Button color="info" className="btn-cancel" onClick={props.toggle}>Cancel</Button>
                            <Button color="danger" className="btn-delete" onClick={props.onClick}>Yes, Freeze</Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}
