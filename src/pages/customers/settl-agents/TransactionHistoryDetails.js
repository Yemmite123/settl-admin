import React, { useState } from "react";
import {
    Badge,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Card,
    Row,
    Col
} from "reactstrap";
import { Link } from "react-router-dom";
import ResetButton from "./../settl-customers/ResetButton";
import TransactionMoreDropDown from "./TransactionMoreDropDown";
import funds from "./../../../assets/img/icons/funds.svg";
import RefundDialog from "../RefundDialog";
import ReprocessTransactionDialog from "../ReprocessTransactionDialog";

const data = [
    {
        id: "1",
        title: "Transaction Name",
        value: "Funds Transfer"
    },
    {
        id: "2",
        title: "Transaction Type",
        value: "Debit"
    },
    {
        id: "3",
        title: "Transaction Reference",
        value: "SETTL-P2P-674662824627-533772882"
    },
    {
        id: "4",
        title: "Paid at",
        value: "Apr 15,2021 19:51:55"
    },
    {
        id: "5",
        title: "Recipient Account Number",
        value:  <div className="d-flex align-items-center">
                    <div><p className="mb-0 mr-3">7703992903</p></div>
                    <div><ResetButton title="Blacklist biller ID" /></div>
                </div>
    },
    {
        id: "6",
        title: "Recipient Name",
        value: "Joy Ademola"
    },
    {
        id: "7",
        title: "Recipient Bank",
        value: "Wema Bank"
    },
    {
        id: "8",
        title: "Settl fee",
        value: "₦0.00"
    },
    {
        id: "9",
        title: "Transaction source",
        value: "Agent Wallet"
    },
    {
        id: "10",
        title: "Billing reference",
        value: "GED7OT27ETD923723Y8E2E632GDL"
    },
    {
        id: "11",
        title: "Biller",
        value: "Interswitch"
    },
    {
        id: "12",
        title: "Agent ID",
        value: <p className="agent-id">156620050467658789</p>
    },
    {
        id: "13",
        title: "Agent Wallet ID",
        value: "SETTL7OT27ETD923722E6322"
    },
    {
        id: "14",
        title: "Number of tries",
        value: "3"
    },
]

export default function TransactionHistoryDetails({setShowSubAgentTransactionDetails}) {
    const [refundAgent, setRefundAgent] = useState(false);
    const [reprocessTransaction, setReprocessTransaction] = useState(false);

    const toggleRefundAgentDialog = () => setRefundAgent(!refundAgent);
    const toggleReprocessTransactionDialog = () => setReprocessTransaction(!reprocessTransaction);

    return(
        <>
            <Breadcrumb className="align-items-center">
                <BreadcrumbItem>
                    <Link 
                        to="/customers/settl-agents"
                    >
                        Main Agent Profile
                    </Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <Link 
                        to="/customers/settl-agents"
                        onClick={() => setShowSubAgentTransactionDetails(prev => !prev)}
                    >
                        Sub-Agent Profile
                    </Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>Transaction Details</BreadcrumbItem>
            </Breadcrumb>
            <Card className="p-4">
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <div className="d-flex align-items-center">
                            <div>
                                <img src={funds} className="mr-2" alt="an icon" />
                            </div>
                            <div>
                                <p className="mb-0 fund-transfer">Funds Transfer Transaction Detail</p>
                            </div>
                        </div>
                        <div className="d-flex transaction-amount mt-3">
                            <div>
                                <h6 className="mb-0">₦13500.00</h6>
                                <p className="mb-0">Incl. 0.00</p>
                            </div>
                            <div>
                                <Badge className="badge-unresolved">Failed</Badge>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="d-flex">
                            <TransactionMoreDropDown />
                            <ResetButton 
                                title="Refund Agent"
                                className="mr-3"
                                onClick={() => setRefundAgent(true)}
                            />
                            <Button 
                                color="primary" 
                                className="btn-add"
                                onClick={() => setReprocessTransaction(true)}
                            >
                                Reprocess Transaction
                            </Button>
                        </div>
                    </div>
                </div>
                <hr className="transaction-line" />
                <div className="transaction-details">
                    {data.map((transaction) => (
                        <Row>
                            <Col md={5}>
                                <p className="title">{transaction.title}</p>
                            </Col>
                            <Col md={7}>
                                <p className="value">{transaction.value}</p>
                            </Col>
                        </Row>
                    ))}
                </div>
            </Card>

            <RefundDialog
                title="agent" 
                isOpen={refundAgent}
                toggle={toggleRefundAgentDialog}
            />

            <ReprocessTransactionDialog
                title="agent"
                isOpen={reprocessTransaction}
                toggle={toggleReprocessTransactionDialog}
            />
        </>
    );
}
