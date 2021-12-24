import React, { useState } from "react";
import { 
    Row, Col, 
    Nav, NavItem, 
    NavLink,
    TabContent,
    TabPane
} from "reactstrap";
import UpdateDropDown from "./UpdateDropDown";
import ResetButton from "./../settl-customers/ResetButton";
import ResetPinDialog from "../ResetPinDialog";
import pos from "../../../assets/img/icons/fcmb-pos.svg";
import fcmb from "../../../assets/img/icons/fcmb.svg";
import pdf from "../../../assets/img/icons/pdf.svg";
import deleteIcon from "../../../assets/img/icons/delete.svg";

const accountInfo = [
    {
        id: "1",
        title: "User ID",
        value: "12564"
    },
    {
        id: "2",
        title: "First Name",
        value: "Assurance"
    },
    {
        id: "3",
        title: "Last Name",
        value: "Uwangue"
    },
    {
        id: "4",
        title: "Gender",
        value: "Male"
    },
    {
        id: "5",
        title: "Email",
        value:"Assurance@gmail.com"
    },
    {
        id: "6",
        title: "Phone Number",
        value: "+234 7062 390 301"
    },
    {
        id: "7",
        title: "Date Created",
        value: "10-01-2020"
    },
    {
        id: "8",
        title: "Agent ID",
        value: "156620050467658789"
    },
    {
        id: "9",
        title: "Wallet ID",
        value: "WELL20050467658789"
    },
    {
        id: "10",
        title: "BVN",
        value: "2203564890"
    },
    {
        id: "11",
        title: "NIN",
        value: "102035674890"
    },
]

export default function AccountInformationTab() {
    const [activeTab] = useState('1');
    const [resetAgentPin, setResetAgentPin] = useState(false);

    const toggleResetAgentPinModal = () => setResetAgentPin(!resetAgentPin);

    return(
        <>
            <Row>
                <Col sm="12">
                    <div className="pb-0 pt-3 px-4 account-information">
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <h6>Account Information</h6>
                            </div>
                            <div className="d-flex">
                                <ResetButton 
                                    title="Reset Agent Pin"
                                    className="mr-3"
                                    onClick={() => setResetAgentPin(true)}
                                />
                                <UpdateDropDown />
                            </div>
                        </div>
                        <hr />
                        <Row>
                            <Col md={4} className="border-right pr-0">
                                <Nav tabs className="account-tab pt-4">
                                    <NavItem>
                                        <NavLink className="active" href="#account-info">
                                            Account Information
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#pos-terminal">
                                            POS Terminal
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#saved-banks">
                                            Saved Banks
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#kyc-doc">
                                            KYC Data
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </Col>
                            <Col md={8}>
                                <TabContent activeTab={activeTab} className="pt-4 pl-3 account-content">
                                    <TabPane tabId="1">
                                        <div>
                                            <div id="account-info">
                                                <div className="account-wrapper">
                                                    <p className="mb-0">Account Information</p>
                                                </div>
                                                <div>
                                                    {accountInfo.map((data) => (
                                                        <div className="d-flex justify-content-between" key={data.id}>
                                                            <div>
                                                                <p className="my-3">{data.title}</p>   
                                                            </div>
                                                            <div>
                                                                <p className="my-3">{data.value}</p>   
                                                            </div>
                                                        </div> 
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="mt-4" id="pos-terminal">
                                                <div className="account-wrapper">
                                                    <p className="mb-0">POS Terminal</p>
                                                </div>
                                                <div className="d-flex terminal">
                                                    <div className="mr-3">
                                                        <img src={pos} alt="bank logo" />
                                                    </div>
                                                    <div>
                                                        <h6>FCMB</h6>
                                                        <p>Terminal ID: 1234567</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4 pt-3" id="saved-banks">
                                                <div className="account-wrapper">
                                                    <p className="mb-0">Saved Banks</p>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between terminal">
                                                    <div className="d-flex align-items-center">
                                                        <div className="mr-3">
                                                            <img src={fcmb} alt="bank logo" />
                                                        </div>
                                                        <div>
                                                            <p className="mb-0">FCMB</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <img src={deleteIcon} alt="delete icon" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4 py-3 pb-4" id="kyc-doc">
                                                <div className="account-wrapper">
                                                    <p className="mb-0">KYC Data</p>
                                                </div>
                                                <div>
                                                    <p className="text-left">Identification Document:</p>
                                                    <div className="document-wrapper align-items-center d-flex">
                                                        <div className="mr-3">
                                                            <img src={pdf} alt="pdf icon" />
                                                        </div>
                                                        <div>
                                                            <p className="mb-0">drivers_license_nelson.jpg</p>
                                                        </div>
                                                    </div>
                                                    <div className="document-wrapper align-items-center d-flex mt-3">
                                                        <div className="mr-3">
                                                            <img src={pdf} alt="pdf icon" />
                                                        </div>
                                                        <div>
                                                            <p className="mb-0">drivers_license_nelson.jpg</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPane>
                                </TabContent>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>

            <ResetPinDialog 
                title="agent"
                isOpen={resetAgentPin}
                toggle={toggleResetAgentPinModal}
            />
        </>
    );
}
