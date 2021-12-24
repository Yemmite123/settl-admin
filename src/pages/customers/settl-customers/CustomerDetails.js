import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import user from "../../../assets/img/icons/user.svg";
import account from "../../../assets/img/icons/account.svg";
import transaction from "../../../assets/img/icons/transaction.svg";
import wallet from "../../../assets/img/icons/wallets.svg";
import referrals from "../../../assets/img/icons/referrals.svg";
import issue from "../../../assets/img/icons/issue-log.svg";
import frozen from "../../../assets/img/icons/frozen.svg";
import MoreDropDown from "./MoreDropDown";
import UpdateDropDown from "./UpdateDropDown";
import ResetButton from "./ResetButton";
import ReferralTable from "./ReferralTable";
import TransactionHistoryTable from "./TransactionHistoryTable";
import CustomerWalletTab from "./CustomerWalletTab";
import ResetPinDialog from "../ResetPinDialog";
import TransactionHistoryDetails from "./TransactionHistoryDetails";
import ReasonForSuspendedAccountDialog from "../ReasonForSuspendedAccountDialog";
import IssueLogTable from "../IssueLogTable";
import Loader from "../../../components/Loader";
import Request from "../../../requests/customer";

export default function CustomerDetails({ setTableData }) {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const { getConsumerInfo } = Request();
  const [activeTab, setActiveTab] = useState("1");
  const [resetCustomerPin, setResetCustomerPin] = useState(false);
  const [suspendedAccount, setSuspendedAccount] = useState(false);
  const [freeze, setFreeze] = useState(false);
  const [freezeModal, setFreezeModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [showTransactionDetails, setShowTransactionDetails] = useState(false);
  const toggleFreezeModal = () => setFreezeModal(!freezeModal);
  const toggleSuccessModal = () => setSuccessModal(!successModal);
  const [transRef, setTransRef] = useState("");

  const accountInfo = [
    {
      id: "1",
      title: (
        <div className="d-flex">
          <p className="mb-0 mr-2">User ID</p>
          {data?.accountInfo?.isReferred && (
            <Badge className="badge-referred">Referred</Badge>
          )}
        </div>
      ),
      value: data?.accountInfo?.userId,
    },
    {
      id: "2",
      title: "First Name",
      value: data?.accountInfo?.firstName,
    },
    {
      id: "3",
      title: "Last Name",
      value: data?.accountInfo?.lastName,
    },
    {
      id: "4",
      title: "Email",
      value: data?.accountInfo?.email,
    },
    {
      id: "5",
      title: "Gender",
      value: data?.accountInfo?.gender,
    },
    {
      id: "6",
      title: "Phone Number",
      value: data?.accountInfo?.phoneno,
    },
    {
      id: "7",
      title: "BVN",
      value: data?.accountInfo?.bvn,
    },
    {
      id: "8",
      title: "Date Created",
      value: data?.accountInfo?.dateCreated,
    },
    {
      id: "9",
      title: "Number of referral",
      value: data?.accountInfo?.noOfReferral,
    },
  ];

  const nextOfKinInfo = [
    {
      id: "1",
      title: "Full Name",
      value: data?.accountInfo?.nokName,
    },
    {
      id: "2",
      title: "Email Address",
      value: data?.accountInfo?.nokEmail,
    },
    {
      id: "3",
      title: "Phone Number",
      value: data?.accountInfo?.nokPhoneNo,
    },
    {
      id: "4",
      title: "House Address",
      value: data?.accountInfo?.nokHouseAddress,
    },
  ];

  const toggleResetCustomerPinModal = () =>
    setResetCustomerPin(!resetCustomerPin);
  const toggleSuspendedAccountModal = () =>
    setSuspendedAccount(!suspendedAccount);

  // const freezeAccount = () => {
  //   setFreeze(true);
  //   setFreezeModal(false);
  //   setSuccessModal(true);
  // };

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const fetchData = async () => {
    const response = await getConsumerInfo(id);
    if (response.code === "00") {
      setData(response.data);
      console.log(response.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Link to="/customers/settl-customers" className="back">
        Back to All Settl Customers
      </Link>
      {!data ? (
        <Loader />
      ) : (
        <>
          {!showTransactionDetails ? (
            <>
              <div className="customer-card text-center">
                <Row>
                  <Col md={4} lg={4}>
                    {freeze ? (
                      <div className="alert-wrapper">
                        <div className="d-flex">
                          <div className="mr-3">
                            <img src={frozen} alt="an icon" />
                          </div>
                          <div className="mt-1">
                            <h6>Account Frozen</h6>
                            <p>
                              The reason why this account was suspended stays
                              here...
                              <Button
                                color="link"
                                onClick={() => setSuspendedAccount(true)}
                              >
                                Learn more
                              </Button>
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <Card className="p-3">
                      <div className="customer-card-header">
                        <div className="text-right">
                          <MoreDropDown
                            isOpen={freezeModal}
                            toggle={toggleFreezeModal}
                            isOpenSuccess={successModal}
                            toggleSuccess={toggleSuccessModal}
                            freeze={freeze}
                          />
                        </div>
                        <img
                          src={data?.accountInfo?.passport || user}
                          alt="profile"
                          style={{
                            width: "96px",
                            height: "96px",
                            borderRadius: "50%",
                            display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                            objectFit: "cover",
                          }}
                        />
                        <h6 className="mt-3">{`${data?.accountInfo?.firstName} ${data?.accountInfo?.lastName}`}</h6>
                        <div className="badge badge-level">
                          KYC Level {data?.accountInfo?.kycLevel}
                        </div>
                        <span className="d-block mt-3">Available Balance</span>
                        <p>
                          N
                          {Number(
                            data?.accountInfo?.availBalance
                          ).toLocaleString()}
                        </p>
                      </div>
                      <Nav tabs>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === "1",
                            })}
                            onClick={() => {
                              toggle("1");
                            }}
                          >
                            <div className="icon-wrapper">
                              <img src={account} alt="an icon" />
                            </div>
                            Account Information
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === "2",
                            })}
                            onClick={() => {
                              toggle("2");
                            }}
                          >
                            <div className="icon-wrapper">
                              <img src={transaction} alt="an icon" />
                            </div>
                            Transaction History
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === "3",
                            })}
                            onClick={() => {
                              toggle("3");
                            }}
                          >
                            <div className="icon-wrapper">
                              <img src={wallet} alt="an icon" />
                            </div>
                            Customer Wallet
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === "4",
                            })}
                            onClick={() => {
                              toggle("4");
                            }}
                          >
                            <div className="icon-wrapper">
                              <img src={referrals} alt="an icon" />
                            </div>
                            Referrals
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === "5",
                            })}
                            onClick={() => {
                              toggle("5");
                            }}
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
                    <Card
                      style={{ background: "transparent", boxShadow: "none" }}
                    >
                      <TabContent activeTab={activeTab}>
                        <TabPane
                          tabId="1"
                          style={{
                            background: "#fff",
                            boxShadow: "0 0 0.875rem 0 rgb(53 64 82 / 5%",
                          }}
                        >
                          <Row>
                            <Col sm="12">
                              <div className="pb-0 pt-3 px-4 account-information">
                                <div className="d-flex align-items-center justify-content-between">
                                  <div>
                                    <h6>Account Information</h6>
                                  </div>
                                  <div className="d-flex">
                                    <ResetButton
                                      title="Reset Customer Pin"
                                      className="mr-3"
                                      onClick={() => setResetCustomerPin(true)}
                                    />
                                    <UpdateDropDown
                                      data={data?.accountInfo}
                                      setTableData={setTableData}
                                    />
                                  </div>
                                </div>
                                <hr />
                                <Row>
                                  <Col md={4} className="border-right pr-0">
                                    <Nav tabs className="account-tab pt-4">
                                      <NavItem>
                                        <NavLink
                                          className="active"
                                          href="#account-info"
                                        >
                                          Account Information
                                        </NavLink>
                                      </NavItem>
                                      <NavItem>
                                        <NavLink href="#nextofkin-info">
                                          Next of Kin Information
                                        </NavLink>
                                      </NavItem>
                                      <NavItem>
                                        <NavLink href="#kyc-doc">
                                          KYC Document
                                        </NavLink>
                                      </NavItem>
                                    </Nav>
                                  </Col>
                                  <Col md={8}>
                                    <TabContent
                                      activeTab={activeTab}
                                      className="pt-4 pl-3 account-content"
                                    >
                                      <TabPane tabId="1">
                                        <div>
                                          <div id="account-info">
                                            <div className="account-wrapper">
                                              <p className="mb-0">
                                                Account Information
                                              </p>
                                            </div>
                                            <div>
                                              {accountInfo.map((data) => (
                                                <div
                                                  className="d-flex justify-content-between"
                                                  key={data.id}
                                                >
                                                  <div>
                                                    <p className="my-3">
                                                      {data.title}
                                                    </p>
                                                  </div>
                                                  <div>
                                                    <p className="my-3">
                                                      {data.value}
                                                    </p>
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                          <div
                                            className="mt-4"
                                            id="nextofkin-info"
                                          >
                                            <div className="account-wrapper">
                                              <p className="mb-0">
                                                Next of Kin
                                              </p>
                                            </div>
                                            <div>
                                              {nextOfKinInfo.map((data) => (
                                                <div
                                                  className="d-flex justify-content-between"
                                                  key={data.id}
                                                >
                                                  <div>
                                                    <p className="my-3">
                                                      {data.title}
                                                    </p>
                                                  </div>
                                                  <div>
                                                    <p className="my-3">
                                                      {data.value}
                                                    </p>
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                          <div
                                            className="mt-4 pb-3"
                                            id="kyc-doc"
                                          >
                                            <div className="account-wrapper">
                                              <p className="mb-0">KYC Data</p>
                                            </div>
                                            <div>
                                              <p className="text-left">
                                                No Document Provided yet
                                              </p>
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
                          <TransactionHistoryTable
                            setShowTransactionDetails={
                              setShowTransactionDetails
                            }
                            tableData={data.getTransactions}
                            setTransRef={setTransRef}
                          />
                        </TabPane>
                        <TabPane tabId="3">
                          <CustomerWalletTab data={data.customerWallet} />
                        </TabPane>
                        <TabPane tabId="4">
                          <ReferralTable tableData={data.referralLogs} />
                        </TabPane>
                        <TabPane tabId="5">
                          <IssueLogTable tableData={data.getIssueLogs} />
                        </TabPane>
                      </TabContent>
                    </Card>
                  </Col>
                </Row>
              </div>
            </>
          ) : (
            <TransactionHistoryDetails
              setShowTransactionDetails={setShowTransactionDetails}
              transRef={transRef}
            />
          )}

          <ResetPinDialog
            title="customer"
            isOpen={resetCustomerPin}
            toggle={toggleResetCustomerPinModal}
            phoneNumber={data?.accountInfo?.phoneno}
          />

          <ReasonForSuspendedAccountDialog
            isOpen={suspendedAccount}
            toggle={toggleSuspendedAccountModal}
          />
        </>
      )}
    </>
  );
}
