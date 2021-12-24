import React, { useState } from "react";
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
import checkIcon from "./../../../assets/img/icons/check.svg";
import securityIcon from "./../../../assets/img/icons/security-warning.svg";
import UpgradeSuccessModal from "./UpgradeSuccessDialog";
import BlacklistDeviceDialog from "../BlacklistDeviceDialog";
import UpgradeAccountDialog from "./UpgradeAccountDialog";

export default function MoreDropDown(props) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [upgradeSuccessModal, setUpgradeSuccessModal] = useState(false);
    const [upgradeAccountModal, setUpgradeAccountModal] = useState(false);

    const [blacklistAccount, setBlacklistAccount] = useState(false);

    const [adminFullName, setAdminFullName] = useState("Assurance uwangue");
    const [reasonForFreeze, setReasonForFreeze] = useState("Fraud suspected");

    const toggleFilter = () => setDropdownOpen(prevState => !prevState);
    const toggleBlacklistAccount = () => setBlacklistAccount(!blacklistAccount);

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
                    {props.name === "Super" ? "" : (
                        <DropdownItem 
                            onClick={() => setUpgradeAccountModal(true)}
                        >
                            Upgrade Agent
                        </DropdownItem>
                        )
                    }
                    <DropdownItem className={props.freeze ? "": "freeze"} onClick={props.freeze ? "" : props.toggle}>
                        {props.freeze ? "Activate Agent" : "Freeze Agent"}
                    </DropdownItem>
                    <DropdownItem onClick={() => setBlacklistAccount(true)}>Blacklist Device</DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <Modal isOpen={props.isOpen} toggle={props.toggle} className="admin-modal freeze-modal">
                <ModalHeader>Freeze Confirmation</ModalHeader>
                <ModalBody>
                    <div>
                        <div className="text-center">
                            <img src={securityIcon} className="mb-3" alt="security warning icon" />
                            <p>Are you sure you want to freeze this agent’s account?</p>
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

            <UpgradeSuccessModal 
                isOpen={upgradeSuccessModal} 
                toggle={() => setUpgradeSuccessModal(false)} 
            />

            <BlacklistDeviceDialog
                title="agent"
                isOpen={blacklistAccount}
                toggle={toggleBlacklistAccount}
            />

            <UpgradeAccountDialog 
                isOpen={upgradeAccountModal}
                toggle={() => setUpgradeAccountModal(false)}
            />
        </>
    );
}
