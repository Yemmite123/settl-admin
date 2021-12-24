import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import logo from "../../../assets/img/icons/customercard.svg";
import { MoreVertical } from "react-feather";
import { DropdownMenu, DropdownToggle, Dropdown } from "reactstrap";
import Modal from "./modal";
import Loader from "../../../components/Loader";
import TransactionDetails from "../../../requests/transactions";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const Customer = ({ setShowDetails, title, type, transRef }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { getTransactionDetails } = TransactionDetails();
  const dataTemplate = [
    { "Transaction Name": data.payMethod },
    { "Transaction Type": data.transType },
    { "Transaction reference": data.transId },
    { "Paid at": <Moment format="DD/MM/YYYY">{data.transDate}</Moment> },
    { "Transaction Channel": data.transChannel },
    { "Recipient Name": data.toCustomerName },
    {
      "Recipient ID": (
        <Link to={"/customers/details/" + data.toCustomerId}>
          <p className="name">{data.toCustomerId}</p>
        </Link>
      ),
    },
    { "Settl fee": "₦0.00" },
    { "Transaction source": data.fundSource },
    { "Billing reference": data.referenceNo },
    { Description: data.transDescription },
  ];

  const refund = {
    title: `Refund ${type}`,
    reason: "Refund Reason",
    type,
    placeholder: "Initiate Refund",
  };
  const reprocess = {
    title: "Reprocess Transaction",
    reason: "Reprocess Reason",
    type,
    placeholder: "Reprocess",
  };
  const [modalDetail, setModalDetail] = useState(null);
  const [dropdownOpen, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);

  const fetchData = async () => {
    setLoading(true);
    const response = await getTransactionDetails(transRef);
    if (response.code === "00") {
      console.log(response.data);
      setData(response.data);
    }
    setLoading(false);
  };
  const Classes = (option) => {
    if (option?.toLowerCase() === "pending") return "status pending";
    if (option?.toLowerCase() === "success") return "status success";
    if (option?.toLowerCase() === "failed") return "status failed";
    return "";
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "10px",
              marginTop: "2rem",
            }}
          >
            <span
              style={{ color: "#4f1699", cursor: "pointer" }}
              onClick={() => setShowDetails((prev) => !prev)}
            >
              {title}
            </span>
            <span style={{ color: "#304762" }}>{" > "}</span>{" "}
            <span style={{ color: "#304762" }}>{title} Details</span>
          </div>
          <div className="customer_card_body">
            <div className="flex">
              <div>
                <div>
                  <h4 className="greeting">
                    <img src={logo} className="" alt="Settl Logo" />
                    <span className="pl-2">{title} Details </span>
                  </h4>
                  <div className="flex">
                    <p className="price">
                      ₦{data?.transAmount?.toLocaleString()}
                    </p>
                    <p className={Classes(data.transStatus)}>
                      {data.transStatus}
                    </p>
                  </div>
                  <p style={{ color: "rgba(48, 71, 98, 0.8);" }}>Incl. 0.00</p>
                </div>
              </div>
              <div className="buttons">
                <Dropdown
                  isOpen={dropdownOpen}
                  toggle={toggle}
                  style={{
                    outline: "none",
                  }}
                >
                  <DropdownToggle
                    style={{
                      backgroundColor: "white",
                      border: "none",
                    }}
                  >
                    <div className="button_neutral">
                      <MoreVertical />
                    </div>
                    <DropdownMenu className="dropdown_menu" style={{}}>
                      <p className="dropdown_option"> Requery Transaction</p>
                      <p className="dropdown_option">View Agent Profile</p>
                    </DropdownMenu>
                  </DropdownToggle>
                </Dropdown>

                <Button
                  className="button_neutral"
                  onClick={() => {
                    setModalDetail(refund);
                    setShow(true);
                  }}
                >
                  Refund {type}
                </Button>
                <Button
                  className="button_approve"
                  onClick={async () => {
                    setModalDetail(reprocess);
                    setShow(true);
                  }}
                >
                  Reprocess Transaction
                </Button>
              </div>
            </div>
            <div className="details">
              {dataTemplate.map((info) => (
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <p
                    style={{
                      width: "50%",
                      color: "rgba(48, 71, 98, 0.8)",
                    }}
                  >
                    {Object.keys(info)}
                  </p>
                  <p
                    style={{
                      width: "50%",
                      color: "#304762",
                      fontWeight: 500,
                    }}
                  >
                    {Object.values(info)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {modalDetail && (
        <Modal show={show} setShow={setShow} data={modalDetail} />
      )}
    </>
  );
};
export default Customer;
