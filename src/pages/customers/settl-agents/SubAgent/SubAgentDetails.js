import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
    Button,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Row, Col, 
    Nav, NavItem, 
    NavLink,
    TabContent,
    TabPane
} from "reactstrap";
import classnames from 'classnames';
import user from "../../../../assets/img/icons/user.svg";
import account from "../../../../assets/img/icons/account.svg";
import transaction from "../../../../assets/img/icons/transaction.svg";
import wallet from "../../../../assets/img/icons/wallets.svg";
import issue from "../../../../assets/img/icons/issue-log.svg";
import frozen from "../../../../assets/img/icons/frozen.svg";
import MoreDropDown from "../MoreDropDown";
import SubAgentIssueLogTable from "./SubAgentIssueLogTable";
import TransactionHistoryTable from "../TransactionHistoryTable";
import TransactionHistoryDetails from "../TransactionHistoryDetails";
import AccountInformationTab from "../AccountInformationTab";
import WalletCard from "../WalletCard";
import WalletTable from "../WalletTable";
import ReasonForSuspendedAccountDialog from "../../ReasonForSuspendedAccountDialog";

export default function SubAgentDetails({setShowSubAgentDetails}) {
    const [activeTab, setActiveTab] = useState('1');
    const [suspendedAccount, setSuspendedAccount] = useState(false);
    const [freeze, setFreeze] = useState(false);
    const [freezeModal, setFreezeModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [showSubAgentTransactionDetails, setShowSubAgentTransactionDetails] = useState(false);

    const toggleFreezeModal = () => setFreezeModal(!freezeModal);
    const toggleSuccessModal = () => setSuccessModal(!successModal);
    const toggleSuspendedAccountModal = () => setSuspendedAccount(!suspendedAccount);
    
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
        {!showSubAgentTransactionDetails ? (
            <>
                <Breadcrumb className="align-items-center">
                    <BreadcrumbItem>
                        <Link 
                            to="/customers/settl-agents" 
                            onClick={()=> setShowSubAgentDetails(prev => !prev)}
                        >
                            Main Agent Profile
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Sub-Agent Profile</BreadcrumbItem>
                </Breadcrumb>
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
                                        />
                                    </div>
                                    <img src={user} alt="" />
                                    <h6 className="mt-3">Sub-Agent Name</h6>
                                    <div className="badge badge-agent">SUB</div>
                                    <span className="d-block mt-3">Available Balance</span>
                                    <p>N1,000,000.00</p>
                                </div>
                                <Nav tabs>
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
                                                <img src={transaction} alt="an icon" />
                                            </div>
                                            Transaction History
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '4' })}
                                            onClick={() => { toggle('4'); }}
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
                                        <AccountInformationTab />
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <WalletCard />
                                        <WalletTable />
                                    </TabPane>
                                    <TabPane tabId="3">
                                        <div className="sub-agent-transaction">
                                            <TransactionHistoryTable setShowSubAgentTransactionDetails={setShowSubAgentTransactionDetails} />
                                        </div>
                                    </TabPane>
                                    <TabPane tabId="4">
                                        <div className="sub-agent-issue-log">
                                            <SubAgentIssueLogTable />
                                        </div>
                                    </TabPane>
                                </TabContent>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
            ) : (
                <TransactionHistoryDetails setShowSubAgentTransactionDetails={setShowSubAgentTransactionDetails} />
            )
        }

            <ReasonForSuspendedAccountDialog
                isOpen={suspendedAccount}
                toggle={toggleSuspendedAccountModal}
            />
        </>
    );
}