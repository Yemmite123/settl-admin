import React, { useState, useEffect } from "react";
import { ReactComponent as Close } from "../../../BgImages/close.svg";
import { Modal, Button } from "react-bootstrap";
import {
  Input,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal as ImageModal,
} from "reactstrap";
import Loading from "../../../components/Loading";
import issueimg from "../../../assets/img/photos/issueimage.png";
import viewTransaction from "../../../assets/img/photos/View transaction.png";
import Request from "./request";

const IssuesModal = ({ show, setShow, data, setData }) => {
  const { statusUpdate } = Request();
  const [imageShow, setImageShow] = useState(false);
  const [status, setStatus] = useState(data?.status?.toLowerCase());
  const [loading, setLoading] = useState(false);
  let optionStatus = ["pending", "resolved", "unresolved"].filter(
    (option) => option !== status?.toLowerCase()
  );
  const imageClose = (
    <Close
      onClick={() => setImageShow(false)}
      className="close"
      style={{
        position: "absolute",
        top: "70px",
        right: "150px",
        cursor: "pointer",
      }}
    />
  );
  useEffect(() => {
    setStatus(data?.status);
    optionStatus = ["pending", "resolved", "unresolved"].filter(
      (option) => option !== status?.toLowerCase()
    );
  }, [data]);
  const Classes = (option) => {
    if (option?.toLowerCase() === "pending") return "status pending";
    if (option?.toLowerCase() === "resolved") return "status success";
    if (option?.toLowerCase() === "unresolved") return "status failed";
    return "";
  };

  const updateStatus = async (update) => {
    setLoading(true);
    if (update.status === "pending") {
      update.status = 3;
    }
    if (update.status === "resolved") {
      update.status = 1;
    }
    if (update.status === "unresolved") {
      update.status = 2;
    }
    console.log(update);
    const response = await statusUpdate(update);
    if (response.code === "00") {
      console.log(response);
    }
    setLoading(false);
  };
  const information = [
    {
      "Issue created by": (
        <p
          style={{
            color: " #451B7D",
            borderBottom: "1px solid  #451B7D",
            width: "fit-content",
          }}
        >
          {data?.createdBy}
        </p>
      ),
    },
    {
      "Transaction ID": (
        <p
          style={{
            color: " #451B7D",
            borderBottom: "1px solid  #451B7D",
            width: "fit-content",
          }}
        >
          {data?.transactionId}
        </p>
      ),
    },
    { "Transaction type": data?.transactionType },
    {
      Status: (
        <UncontrolledDropdown className="d-inline filter-dropdown">
          <DropdownToggle
            color="light"
            className={Classes(status)}
            style={{
              border: "none",
            }}
          >
            {status?.toUpperCase()}
          </DropdownToggle>
          <DropdownMenu
            right
            style={{
              top: "25px",
              padding: "0.5rem",
            }}
          >
            {optionStatus.map((option, i) => (
              <DropdownItem
                key={i}
                className={Classes(option)}
                style={{
                  width: "fit-content",
                  margin: "0.5rem",
                  borderRadius: "4px",
                }}
                onClick={() => setStatus(option)}
              >
                {option.toUpperCase()}
              </DropdownItem>
            ))}
            {/* <DropdownItem
              className=" success"
              style={{
                width: "fit-content",
                margin: "0.5rem",
                borderRadius: "4px",
              }}
            >
              Resolved
            </DropdownItem>
            <DropdownItem
              className=" pending"
              style={{
                width: "fit-content",
                borderRadius: "4px",
              }}
            >
              Pending
            </DropdownItem> */}
          </DropdownMenu>
        </UncontrolledDropdown>
      ),
    },
    {
      Description: (
        <p
          style={{
            opacity: "0.5",
            fontSize: "14px",
          }}
        >
          {data?.description}
        </p>
      ),
    },
    {
      Image: (
        <img
          styl={{
            cursor: "pointer",
          }}
          src={issueimg}
          alt="ssueimage"
          onClick={() => setImageShow(true)}
        />
      ),
    },
  ];
  return (
    <>
      <Modal
        show={show}
        centered
        onHide={() => setShow(false)}
        className="issue-modal"
        size="lg"
        style={{
          color: "#171725",
        }}
      >
        <div
          style={{
            display: "relative",
          }}
        >
          <h3
            style={{
              textAlign: "center",
              borderBottom: "1px solid rgba(231, 231, 237, 0.6)",
              padding: "1.5rem 0",
            }}
          >
            Issue Details
          </h3>
          <Close
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              cursor: "pointer",
            }}
            onClick={() => setShow(false)}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0 1.5rem",
            padding: ".6rem 0",
            borderBottom: "1px solid rgba(231, 231, 237, 0.6)",
            fontSize: "13px",
          }}
        >
          <p>
            <span style={{ fontWeight: "600", color: "" }}>Issue ID </span>{" "}
            <span
              style={{
                opacity: "0.5",
              }}
            >
              {data?.issueId}
            </span>
          </p>
          <p>
            <span style={{ fontWeight: "600" }}>Date Created </span>{" "}
            <span
              style={{
                opacity: "0.5",
              }}
            >
              {data?.createdDate}
            </span>
          </p>
          <p>
            <span style={{ fontWeight: "600" }}>Time Created </span>{" "}
            <span
              style={{
                opacity: "0.5",
              }}
            >
              {data?.createdTime}
            </span>
          </p>
        </div>
        <div
          style={{
            margin: "0 1.5rem",
            padding: "1rem 0",
          }}
        >
          {information.map((info) => (
            <div
              style={{
                display: "flex",
              }}
            >
              <p
                style={{
                  width: "50%",
                  fontWeight: "600",
                }}
              >
                {Object.keys(info)}
              </p>
              <p
                style={{
                  width: "50%",
                }}
              >
                {Object.values(info)}
              </p>
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "25px",
            borderTop: "1px solid rgba(231, 231, 237, 0.6)",
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button 
            onClick={async () => {
              await updateStatus({ Id: data.id, status });
              setShow(false);
              setData(null);
            }}
            style={{
              backgroundColor: "#4F1699",
              padding: ".6rem 1.5rem",
              marginRight: "1rem",
              marginTop: "1rem",
              width: "150px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {loading ? <Loading /> : "Update Status"}
          </Button>
        </div>
      </Modal>
      <ImageModal
        centered
        isOpen={imageShow}
        className="image-modal"
        centered
        external={imageClose}
      >
        <img src={viewTransaction} />
      </ImageModal>
    </>
  );
};
export default IssuesModal;
