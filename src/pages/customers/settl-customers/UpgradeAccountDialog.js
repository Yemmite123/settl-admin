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
import CustomersRequest from "../../../requests/customer";

const options = [
    {
        label: "International Passport",
        value: "International Passport"
    },
    {
        label: "National ID",
        value: "National ID"
    },
    {
        label: "Voter’s Card",
        value: "Voter’s Card"
    },
    {
        label: "Driver's License",
        value: "Driver's License"
    }
] 

export default function UpgradeAccountDialog(props) {
    const [customerPassport, setCustomerPassport] = useState();
    const [idType, setIdType] = useState("select");
    const [idNumber, setIdNumber] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        let files = e.target.files;
        setCustomerPassport({ customerPassport: files[0] }, () => { console.log(customerPassport) });
        console.log(customerPassport);
    }

    const { upgradeCustomer } = CustomersRequest();

    const handleUpgradeCustomer = async (e) => {
        e.preventDefault();
        setLoading(true);

        var formData = new FormData();
        formData.append("PhoneNumber", props.customerPhoneNumber);
        formData.append("CustomerPassport", customerPassport);
        formData.append("IdType", idType);
        formData.append("IdNumber", idNumber);
        formData.append("IdDocument", "");
        formData.append("IdExtension", "");
    
        const response = await upgradeCustomer(formData);

        if(response.code === "00") {
            console.log(response);
            // setShowSuccess(true);
            alert("Upgrading Account Operation is successful");
            // setfreeze(true);
            setCustomerPassport([]);
            setIdNumber("");
            props.toggle();
            setLoading(false);
            console.log(customerPassport);
            return true;
        } 
  
        setLoading(false);
        console.log(customerPassport);
        // setShowFailure(true);
        return false;
    }

    return(
        <>
            <Modal isOpen={props.isOpen} toggle={props.toggle} className="admin-modal upgrade-modal">
                <ModalHeader>
                    Upgrade Customer  Account
                    <Close
                        className="close-modal"
                        onClick={props.toggle}
                    />
                </ModalHeader>
                <ModalBody>
                    <div className="text-center">
                        <p>Please provide the customer passport and a verification document. Each file size shouldn’t exceed 50kb</p>
                    </div>
                    <Form className="px-3 mt-4">
                        <FormGroup>
                            <Label for="customerPassport">Customer Passport</Label>
                            <Input 
                                type="file" 
                                name="customerPassport"
                                id="customerPassport" 
                                onChange={(handleChange)}
                            />
                        </FormGroup>
                        <FormGroup className="mt-4">
                            <Input 
                                type="select" 
                                name="idType" 
                                id="idType"
                                value={ idType }
                                onChange={(e) => setIdType(e.target.value)}
                            >
                                <option value="select" defaultValue disabled>Select Identification document</option>
                                {options.map((option) => (
                                    <option value={option.value} key={option.label}>{option.label}</option>
                                ))}
                            </Input>
                        </FormGroup>
                        {
                            idType === "International Passport" ? (
                            <FormGroup className="mt-4">
                                <Label for="idDocument">International Passport</Label>
                                <Input type="file" id="idDocument" />
                            </FormGroup>) : ("")
                        }
                        {
                            idType === "National ID" ? (
                                <FormGroup className="mt-4">
                                    <Label for="idDocument">National ID</Label>
                                    <Input type="file" id="idDocument" />
                                </FormGroup>
                            ) : ("")
                        }
                        {
                            idType === "Voter’s Card" ? (
                                <FormGroup className="mt-4">
                                    <Label for="Document">Voter’s Card</Label>
                                    <Input type="file" id="idDocument" />
                                </FormGroup>
                            ) : ("")
                        }
                        {
                            idType === "Driver's License" ? (
                                <FormGroup className="mt-4">
                                    <Label for="idDocument">Driver's License</Label>
                                    <Input type="file" id="idDocument" />
                                </FormGroup>
                            ) : ("")
                        }
                        <FormGroup className="mt-4">
                            <Label for="idNumber">ID Number</Label>
                            <Input 
                                type="text"
                                name="idNumber"
                                id="idNumber"
                                value={idNumber}
                                onChange={(e) => setIdNumber(e.target.value)} 
                            />
                        </FormGroup>
                    </Form>
                    <br/><br/><br/><br/>
                    <hr/>
                    <div className="d-flex justify-content-between">
                        <Button color="info" className="btn-cancel" onClick={props.toggle}>Cancel</Button>
                        <Button 
                            color="primary" 
                            className="btn-add" 
                            onClick={handleUpgradeCustomer}
                        >
                            Upgrade Account
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}
