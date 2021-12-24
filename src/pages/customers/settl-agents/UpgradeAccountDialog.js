import React, { useState } from "react";
import { ReactComponent as Close } from "../../../BgImages/close.svg";
import { 
    Button,
    Modal, 
    ModalBody,
    ModalHeader,
    Form,
    FormGroup,
    Input,
    Label
} from "reactstrap";
import InputBox from "../../../components/InputBox";

export default function UpgradeAccountDialog(props) {
    const [cacNumber, setCacNumber] = useState("27689508969");

    return(
        <>
            <Modal isOpen={props.isOpen} toggle={props.toggle} className="admin-modal upgrade-modal">
                <ModalHeader>
                    Upgrade Settl Account
                    <Close
                        className="close-modal"
                        onClick={props.toggle}
                    />
                </ModalHeader>
                <ModalBody>
                    <div className="text-center">
                        <p>Please provide the following document to upgrade this accoiunt to a super agent account. Each file size shouldn’t exceed 50kb</p>
                    </div>
                    <Form className="px-3 mt-4">
                        <FormGroup className="cacNumber">
                            <InputBox 
                                type="text"
                                name="cacNumber" 
                                id="cacNumber"
                                value={cacNumber}
                                onChange={(e) => setCacNumber(e.target.value)} 
                            />
                            <Label for="cacNumber">CAC Number</Label>
                        </FormGroup>
                        <FormGroup className="mt-4">
                            <Label for="cacDocument">CAC document</Label>
                            <Input type="file" id="cacDocument" />
                        </FormGroup>
                        <FormGroup className="mt-4">
                            <Label for="utilityBill">Utility Bill</Label>
                            <Input type="file" id="utilityBill" />
                        </FormGroup>
                    </Form>
                    <br/><br/><br/><br/>
                    <hr/>
                    <div className="d-flex justify-content-between">
                        <Button color="info" className="btn-cancel" onClick={props.toggle}>Cancel</Button>
                        <Button color="primary" className="btn-add">Upgrade Account</Button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}
