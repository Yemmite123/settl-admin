import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
    Button,
    Card,
    Row, Col, 
    Nav, NavItem, 
    NavLink,
    TabContent,
    TabPane
} from "reactstrap";
import classnames from 'classnames';
import user from "../../../assets/img/icons/user.svg";
import account from "../../../assets/img/icons/account.svg";
import transaction from "../../../assets/img/icons/transaction.svg";
import wallet from "../../../assets/img/icons/wallets.svg";
import referrals from "../../../assets/img/icons/referrals.svg";
import issue from "../../../assets/img/icons/issue-log.svg";
import frozen from "../../../assets/img/icons/frozen.svg";
import pos from "../../../assets/img/icons/fcmb-pos.svg";
import fcmb from "../../../assets/img/icons/fcmb.svg";
import pdf from "../../../assets/img/icons/pdf.svg";
import deleteIcon from "../../../assets/img/icons/delete.svg";
import MoreDropDown from "./MoreDropDown";
import UpdateDropDown from "./UpdateDropDown";
import ResetButton from "./../settl-customers/ResetButton";
import ResetPinDialog from "../ResetPinDialog";
import ReasonForSuspendedAccountDialog from "../ReasonForSuspendedAccountDialog";
import SubAgentTable from "./SubAgent/SubAgentTable";
import SubAgentCard from "./SubAgent/SubAgentCard";
import SubAgentDetails from "./SubAgent/SubAgentDetails";
import IssueLogTable from "../IssueLogTable";
import TransactionHistoryTable from "./TransactionHistoryTable";
import WalletTable from "./WalletTable";
import WalletCard from "./WalletCard";

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

const nextOfKinInfo = [
    {
        id: 1,
        title: "Full Name",
        value: "Evidence Uwangue"
    },
    {
        id: 2,
        title: "Email Address",
        value: "Uwangue"
    },
    {
        id: 3,
        title: "Phone Number",
        value: "08052498701"
    },
    {
        id: 4,
        title: "House Address",
        value: "5 Gongola Street, Garki 1, Abuja"
    },
]

export default function AgentDetails({setShowDetails}) {
    const [activeTab, setActiveTab] = useState('1');
    const [resetAgentPin, setResetAgentPin] = useState(false);
    const [suspendedAccount, setSuspendedAccount] = useState(false);
    const [freeze, setFreeze] = useState(false);
    const [freezeModal, setFreezeModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [showSubAgentDetails, setShowSubAgentDetails] = useState(false);
    const [showSubAgentTransactionDetails, setShowSubAgentTransactionDetails] = useState(false);
    const [agentType, setAgentType] = useState("Super");

    const toggleFreezeModal = () => setFreezeModal(!freezeModal);
    const toggleSuccessModal = () => setSuccessModal(!successModal);
    const toggleResetAgentPinModal = () => setResetAgentPin(!resetAgentPin);
    const toggleSuspendedAccountModal = () => setSuspendedAccount(!suspendedAccount);

    const accountDetails = [
        {
            id: 1,
            title: "Available Balance",
            value: <p className="mb-0">N1000,000.00</p>
        },
        {
            id: 2,
            title: "Agent Type",
            value: <div className="badge badge-agent">{agentType}</div>
        },
        {
            id: 3,
            title: "Agent Level",
            value: <p className="mb-0">Tier 3</p>
        }
    ]

    const freezeAccount = () => {
        setFreeze(true);
        setFreezeModal(false);
        setSuccessModal(true);
    }

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    return(
        <>
            {!showSubAgentDetails ? (
                <>
                    <Link 
                        to="/customers/settl-agents"
                        className="back"
                        onClick={() => setShowDetails((prev) => !prev)}
                    >
                        Back to All Agents
                    </Link>
                    
                    <div className="customer-card text-center">
                        <Row>
                            <Col md={4} lg={4}>
                                { freeze ? (
                                    <div className="alert-wrapper">
                                        <div className="d-flex">
                                            <div className="mr-3">
                                                <img src={frozen} alt="an icon" />
                                            </div>
                                            <div className="mt-1">
                                                <h6>Account Frozen</h6>
                                                <p>
                                                    The reason why this account was suspended stays here... 
                                                    <Button color="link" onClick={() => setSuspendedAccount(true)}>Learn more</Button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>) : ""
                                }
                                <Card className="p-3">
                                    <div className="customer-card-header">
                                        <div className="text-right">
                                            <MoreDropDown
                                                isOpen={freezeModal} 
                                                toggle={toggleFreezeModal}
                                                onClick={freezeAccount}
                                                isOpenSuccess={successModal}
                                                toggleSuccess={toggleSuccessModal}
                                                freeze={freeze}
                                                name={agentType}
                                            />
                                        </div>
                                        <img src={user} alt="profile" />
                                        <h6 className="mt-3">Assurance Uwangue</h6>
                                        <div className="account-details pb-4">
                                            {accountDetails.map((account) => (
                                                <div 
                                                    className="d-flex justify-content-between align-items-center pt-1 pb-2"
                                                    key={account.id}
                                                >
                                                    <div><span>{account.title}</span></div>
                                                    <div>{account.value}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <Nav>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: activeTab === '1' })}
                                                onClick={() => { toggle('1'); }}
                                            >
                                                <div className="icon-wrapper">
                                                    <img src={account} alt="an icon" />
                                                </div>
                                                Account Information
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: activeTab === '2' })}
                                                onClick={() => { toggle('2'); }}
                                            >
                                                <div className="icon-wrapper">
                                                    <img src={wallet} alt="an icon" />
                                                </div>
                                                Agent Wallet
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: activeTab === '3' })}
                                                onClick={() => { toggle('3'); }}
                                            >
                                                <div className="icon-wrapper">
                                                    <img src={referrals} alt="an icon" />
                                                </div>
                                                Sub Agents
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: activeTab === '4' })}
                                                onClick={() => { toggle('4'); }}
                                            >
                                                <div className="icon-wrapper">
                                                    <img src={transaction} alt="an icon" />
                                                </div>
                                                Transaction History
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: activeTab === '5' })}
                                                onClick={() => { toggle('5'); }}
                                            >
                                                <div className="icon-wrapper">
                                                    <img src={issue} alt="an icon" />
                                                </div>
                                                Issue Log
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </Card>
                            </Col>
                            <Col md={8} lg={8}>
                                <Card style={{background: "transparent", boxShadow: "none"}}>
                                    <TabContent activeTab={activeTab}>
                                        <TabPane tabId="1" style={{background: "#fff", boxShadow: "0 0 0.875rem 0 rgb(53 64 82 / 5%"}}>
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
                                                                        <NavLink href="#next-of-kin">
                                                                            Next of Kin Information
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
                                                                            <div className="mt-4" id="nex-of-kin">
                                                                                <div className="account-wrapper">
                                                                                    <p className="mb-0">Next of Kin</p>
                                                                                </div>
                                                                                <div>
                                                                                    {nextOfKinInfo.map((data) => (
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
                                                                                        <img 
                                                                                            src={deleteIcon} 
                                                                                            alt="delete icon" 
                                                                                            role="button"
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="mt-4 py-3 pb-4" id="kyc-doc">
                                                                                <div className="account-wrapper">
                                                                                    <p className="mb-0">KYC Data</p>
                                                                                </div>
                                                                                <div>
                                                                                    <p className="text-left">Identification Document:</p>
                                                                                    <div className="d-flex align-items-center">
                                                                                        <div className="document-wrapper align-items-center d-flex w-100">
                                                                                            <div className="mr-3">
                                                                                                <img src={pdf} alt="pdf icon" />
                                                                                            </div>
                                                                                            <div>
                                                                                                <p className="mb-0">drivers_license_nelson.jpg</p>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="ml-4">
                                                                                            <img 
                                                                                                src={deleteIcon} 
                                                                                                alt="delete icon" 
                                                                                                role="button"
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="d-flex align-items-center">
                                                                                        <div className="document-wrapper align-items-center d-flex mt-3 w-100">
                                                                                            <div className="mr-3">
                                                                                                <img src={pdf} alt="pdf icon" />
                                                                                            </div>
                                                                                            <div>
                                                                                                <p className="mb-0">drivers_license_nelson.jpg</p>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="ml-4">
                                                                                            <img 
                                                                                                src={deleteIcon} 
                                                                                                alt="delete icon" 
                                                                                                role="button"
                                                                                            />
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
                                        </TabPane>
                                        <TabPane tabId="2">
                                            <WalletCard />
                                            <WalletTable />
                                        </TabPane>
                                        <TabPane tabId="3">
                                            <SubAgentCard   />
                                            <SubAgentTable setShowSubAgentDetails={setShowSubAgentDetails} />
                                        </TabPane>
                                        <TabPane tabId="4">
                                            <TransactionHistoryTable setShowSubAgentTransactionDetails={setShowSubAgentTransactionDetails} />
                                        </TabPane>
                                        <TabPane tabId="5">
                                            <IssueLogTable />
                                        </TabPane>
                                    </TabContent>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </>
             ) : (
                <SubAgentDetails setShowSubAgentDetails={setShowSubAgentDetails} />
            )}

            <ResetPinDialog 
                title="agent"
                isOpen={resetAgentPin}
                toggle={toggleResetAgentPinModal}
            />

            <ReasonForSuspendedAccountDialog
                isOpen={suspendedAccount}
                toggle={toggleSuspendedAccountModal}
            />

        </>
    );
}
