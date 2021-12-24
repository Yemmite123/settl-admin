import React from "react";

const customerData = [
  { "Transaction Name": "Savings" },
  { "Savings Wallet": "Kids" },
  { "Wallet Name": "Promise School Fees" },
  { "Transaction Type": "Credit" },
  { "Transaction Reference": "Debit" },
  { Date: "Apr 15,2021 19:51:55" },
  { "Charge Fee": "₦0.00" },
  { Biller: "Interswitch" },
  { "Customer ID": <p className="name">210415054800036197</p> },
  { "Customer Wallet ID": "SETTL7OT27ETD923722E6322" },
  { "Number of tries": "3" },
];
const PeerToPeer = [
  { "Agent ID": <p className="name"> 156620050467658789</p> },
  { "Agent Wallet ID": "210415054800036197" },
  { "Agent Phone": "07062390301" },
  {
    "Recipient Account Number": (
      <p
        style={{
          margin: "0",
        }}
      >
        #1003992903{" "}
        <button className="details_button">Blacklist biller ID</button>
      </p>
    ),
  },
  { "Charge fee": "₦0.00" },
  { Date: "Apr 15,2021 19:51:55" },
  { "Recipient phone number": "08054278901" },
  { "Transaction source": "Card Payment" },
  { "Billing reference": "GED7OT27ETD923723Y8E2E632GDL" },
  { "Transaction reference": "SETTL-P2P-674662824627-533772882" },
  { Biller: "Interswitch" },
  { "Agent ID": <p className="name">156620050467658789</p> },
  { "Agent Wallet ID": "SETTL7OT27ETD923722E6322" },
  { "Number of tries": 3 },
];
const Transfer = [
  { "Transaction Name": "Funds Transfer" },
  { "Transaction Type": "Debit" },
  { "Transaction reference": "SETTL-P2P-674662824627-533772882" },
  { "Paid at": "Apr 15,2021 19:51:55" },
  {
    "Recipient Account Number": (
      <p
        style={{
          margin: "0",
        }}
      >
        7703992903{" "}
        <button className="details_button">Blacklist biller ID</button>
      </p>
    ),
  },
  { "Recipient Name": "Joy Ademola" },
  { "Recipient Bank": "Wema Bank" },
  { "Settl fee": "₦0.00" },
  { "Transaction source": "Card Payment" },
  { "Billing reference": "GED7OT27ETD923723Y8E2E632GDL" },
  { "Transaction reference": "SETTL-P2P-674662824627-533772882" },
  { Biller: "Interswitch" },
  { "Agent ID": <p className="name">156620050467658789</p> },
  { "Agent Wallet ID": "SETTL7OT27ETD923722E6322" },
  { "Number of tries": 3 },
];
const cashWithdrawal = [
  { "Transaction Name": "Cash Withdrawal" },
  { "Transaction Type": "Debit" },
  { "Transaction reference": "SETTL-P2P-674662824627-533772882" },
  { "Paid at": "Apr 15,2021 19:51:55" },
  { "Withdrawal Source": "USSD Withdrawal" },
  { "Recipient Name": "Joy Ademola" },
  { "Recipient Bnak": "Wema Bank" },
  { "Settl fee": "₦0.00" },
  { "Transaction source": "Card Payment" },
  { "Billing reference": "GED7OT27ETD923723Y8E2E632GDL" },
  { Biller: "Interswitch" },
  { "Agent ID": <p className="name">156620050467658789</p> },
  { "Agent Wallet ID": "SETTL7OT27ETD923722E6322" },
  { "Number of tries": 3 },
];
const POSWithdrawal = [
  { "Transaction Name": "POS Withdrawal" },
  { "Transaction Type": "Credit" },
  { "Transaction reference": "SETTL-P2P-674662824627-533772882" },
  { "Paid at": "Apr 15,2021 19:51:55" },
  { "Settl fee": "₦0.00" },
  { "Terminal Bank": "Sterling" },
  { "Transaction source": "Card Payment" },
  { "Agent ID": <p className="name">156620050467658789</p> },
  { "Agent Wallet ID": "SETTL7OT27ETD923722E6322" },
  { "Number of tries": 3 },
];
const WalletTopUp = [
  { "Transaction Name": "Wallet top-up" },
  { "Transaction Type": "Credit" },
  { "Transaction reference": "SETTL-P2P-674662824627-533772882" },
  { "Paid at": "Apr 15,2021 19:51:55" },
  { "Funding Source": "Bank Transfer" },
  { "Transaction source": "Card Payment" },
  { "Transaction source": "Card Payment" },
  { "Billing Reference": "GED790DGDHYEEE990088765" },
  { Biller: "Interswitch" },
  {
    "Agent ID": <p className="name">156620050467658789</p>,
  },
  { "Agent Wallet ID": "SETTL7OT27ETD923722E6322" },
  { "Transaction Charge": "₦9.00" },
  { "Number of tries": 3 },
];
const BillPayment = [
  { "Transaction Name": "TV Cable" },
  { "Transaction Type": "Debit" },
  { "Transaction reference": "SETTL-P2P-674662824627-533772882" },
  { "Paid at": "Apr 15,2021 19:51:55" },
  { "Decoder Number": "201129390" },
  { "Settl Fee": "₦9.00" },
  { "Customer’s Phone Number": "08052367890" },
  { "Number of Tries": 6 },
  { "Agent ID": <p className="name">SETT-128993009eu0d88889333</p> },
  { "Agent Wallet ID": "WALL-3103889940099" },
  { "Billing Refrence": "GEDHFUFIIIIRRDL52367890" },
  { "Billing Vendor": "vtpass" },
];
const data = [
  PeerToPeer,
  PeerToPeer,
  Transfer,
  BillPayment,
  POSWithdrawal,
  cashWithdrawal,
  WalletTopUp,
  cashWithdrawal,
];
export default data;
