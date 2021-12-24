import React, { useState } from "react";
import { connect } from "react-redux";
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
import Loading from "../../components/Loading";
import CustomersRequest from "../../requests/customer";
import securityIcon from "./../../assets/img/icons/security-warning.svg";

function BlacklistDeviceDialog(props) {
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState("+2348030000000");
    const [reasonForBlacklist, setReasonForBlacklist] = useState("Fraud suspected");

    const [loading, setLoading] = useState(false);
    const { blacklistDevice } = CustomersRequest();

    const handleBlacklistDevice = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        const response = await blacklistDevice({
            adminName: props.fullName,
            adminEmail: props.email,
            customerPhone: customerPhoneNumber,
            reason: reasonForBlacklist,
            blacklist: true
        });

        if(response.code === "00") {
            console.log(response);
            alert("Blacklist Operation is successful");
            
            setCustomerPhoneNumber("+2348030000000");
            setReasonForBlacklist("Fraud suspected");
            props.toggle();
            setLoading(false);
            return true;
        } 
  
        setLoading(false);
        return false;
    }
    
    return(
        <>
            <Modal isOpen={props.isOpen} toggle={props.toggle} className="admin-modal freeze-modal">
                <ModalHeader>Blacklist Device</ModalHeader>
                <ModalBody>
                    <div>
                        <div className="text-center">
                            <img src={securityIcon} className="mb-3" alt="security warning icon" />
                            <p>Are you sure you want to blacklist the {props.title} device connected to this account?</p>
                        </div>
                        <Form>
                            <FormGroup>
                                <InputBox
                                    type="text"
                                    name="adminFullName" 
                                    id="adminFullName"
                                    value={customerPhoneNumber}
                                    onChange={(e) => setCustomerPhoneNumber(e.target.value)}
                                />
                                <Label for="adminFullName">Admin Full Name</Label>
                            </FormGroup>
                            <FormGroup className="pb-3">
                                <InputBox
                                    type="textarea"
                                    name="reasonForBlacklist"
                                    id="reasonForBlacklist"
                                    value={reasonForBlacklist}
                                    rows="4"
                                    onChange={(e) => setReasonForBlacklist(e.target.value)}
                                />
                            </FormGroup>
                        </Form>
                        <hr/>
                        <div className="d-flex justify-content-between">
                            <Button 
                                color="info" 
                                className="btn-cancel" 
                                onClick={props.toggle}
                            >
                                Cancel
                            </Button>
                            <Button 
                                color="danger" 
                                className="btn-delete" 
                                onClick={handleBlacklistDevice}
                            >
                                {loading ? <Loading /> : "Yes, Blacklist"}
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}

const mapStateToProps = (state) => ({
    fullName: state.user?.details?.admin?.fullname,
    email: state.user?.details?.admin?.email,
});

export default connect(mapStateToProps)(BlacklistDeviceDialog);