import React, { useState } from "react";
import { connect } from "react-redux";
import { 
    Button,
    Dropdown, 
    DropdownToggle, 
    DropdownMenu, 
    Modal, 
    ModalBody,
    ModalHeader,
    Form,
    FormGroup,
    Label 
} from "reactstrap";
import DropdownItem from "reactstrap/lib/DropdownItem";
import more from "../../../assets/img/icons/more.svg";
import InputBox from "../../../components/InputBox";
import UpgradeAccountDialog from "./UpgradeAccountDialog";
import checkIcon from "./../../../assets/img/icons/check.svg";
import securityIcon from "./../../../assets/img/icons/security-warning.svg";
import UpgradeSuccessModal from "./UpgradeSuccessDialog";
import BlacklistDeviceDialog from "../BlacklistDeviceDialog";
import Loading from "../../../components/Loading";
import Request from "../../../requests/customer";

function MoreDropDown(props) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [upgradeSuccessModal, setUpgradeSuccessModal] = useState(false);
    const [upgradeAccountModal, setUpgradeAccountModal] = useState(false);
    const [blacklistDevice, setBlacklistDevice] = useState(false);

    const [freeze, setfreeze] = useState(props.freeze);
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState("+2348030000000");
    const [reasonForFreeze, setReasonForFreeze] = useState("Fraud suspected");

    const [loading, setLoading] = useState(false);

    const toggleFilter = () => setDropdownOpen(prevState => !prevState);
    const toggleBlacklistDevice = () => setBlacklistDevice(!blacklistDevice);
    
    const { freezeWallet } = Request();

    const handleFreezeWallet = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        const response = await freezeWallet({
            AdminName: props.fullName,
            adminEmail: props.email,
            customerPhone: customerPhoneNumber,
            reason: reasonForFreeze
        });

        if(response.code === "00") {
            console.log(response);
            // setShowSuccess(true);
            alert("Freeze Operation is successful");
            setfreeze(true);
            setCustomerPhoneNumber("+2348030000000");
            setReasonForFreeze("Fraud suspected");
            props.toggle();
            setLoading(false);
            return true;
        } 
  
        setLoading(false);
        // setShowFailure(true);
        return false;
    }

    return(
        <>
            <Dropdown 
                isOpen={dropdownOpen} 
                toggle={toggleFilter} 
                className="mr-3 more-dropdown"
                id="more-dropdown"
            >
                <DropdownToggle caret>
                    <img src={more} alt="an icon" />
                </DropdownToggle>
                <DropdownMenu className="filter-dropdown-menu">
                    <DropdownItem 
                        onClick={() => setUpgradeAccountModal(true)}
                    >
                        Upgrade Customer
                    </DropdownItem>
                    <DropdownItem 
                        className={freeze ? "": "freeze"} 
                        onClick={freeze ? "" : props.toggle}
                    >
                        {freeze ? "Activate Wallet" : "Freeze Wallet"}
                    </DropdownItem>
                    <DropdownItem 
                        onClick={() => setBlacklistDevice(true)}
                    >
                        Blacklist Device
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

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
                                    onClick={handleFreezeWallet}
                                >
                                    {loading ? <Loading /> : " Yes, Freeze"}
                                </Button>
                            </div>
                        </Form>
                    </div>
                </ModalBody>
            </Modal>
            
            <Modal isOpen={props.isOpenSuccess} toggle={props.toggleSuccess} className="admin-modal success-modal">
                <ModalHeader toggle={props.toggleSuccess}>
                    <div className="d-flex">
                        <div className="mr-3">
                            <img src={checkIcon} alt="check icon" />
                        </div>
                        <div>
                            <h6>Success</h6>
                            <p>Freeze operation was sucessful</p>
                        </div>
                    </div>
                </ModalHeader>
            </Modal>

            <UpgradeSuccessModal isOpen={upgradeSuccessModal} toggle={() => setUpgradeSuccessModal(false)} />
            <UpgradeAccountDialog isOpen={upgradeAccountModal} toggle={() => setUpgradeAccountModal(false)} />
            <BlacklistDeviceDialog
                title="customer"
                isOpen={blacklistDevice}
                toggle={toggleBlacklistDevice}
            />
        </>
    );
}

const mapStateToProps = (state) => ({
    fullName: state.user?.details?.admin?.fullname,
    email: state.user?.details?.admin?.email,
});

export default connect(mapStateToProps)(MoreDropDown);