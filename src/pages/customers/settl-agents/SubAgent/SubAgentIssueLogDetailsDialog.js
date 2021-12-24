import React, { useState } from "react";
import { ReactComponent as Close } from "../../../../BgImages/close.svg";
import { Modal, ModalHeader, ModalBody, Button, Input } from "reactstrap";
import issueimg from "../../../../assets/img/photos/issueimage.png";

export default function SubAgentIssueLogDetailsDialog (props) {
  const [className, setClassName] = useState("failed");

  const handleChange = (e) => {
    const { value } = e.target;
    setClassName(value);
  };

  const information = [
    {
      id: "1",
      title: <p>Issue created by</p>,
      value: 
        <p
          style={{
            color: " #451B7D",
            borderBottom: "1px solid  #451B7D",
            width: "fit-content",
          }}
        >
          Carolyn Harvey
        </p>
    },
    {
      id: "2",
      title: <p>Transaction ID</p>,
      value:
        <p
          style={{
            color: " #451B7D",
            borderBottom: "1px solid  #451B7D",
            width: "fit-content",
          }}
        >
          STTL10933W822
        </p>
    },
    { 
      id: "3",
      title: <p>Transaction type</p>,
      value: <p className="text-lighter">Transfer</p>
    },
    {
      id: "4",
      title: "Status",
      value:
        <Input
          type="select"
          name="status"
          className={`mb-3 status ${className}`}
          style={{
            width: "fit-content",
            border: "none",
          }}
          onChange={handleChange}
        >
          <option value="failed" className="status failed">
            {" "}
            Unresolved
          </option>
          <option value="success" className="status success">
            Success
          </option>
          <option value="pending" className="status pending">
            Pending
          </option>
        </Input>,
    },
    {
      id: "5",
      title: <p>Description</p>,
      value: <p className="text-lighter mr-4">Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</p>,
    },
    {
      id: "6",
      title: <p>Image</p>,
      value: <img src={issueimg} className="mb-4" alt="" />,
    },
  ];
  
  return (
    <Modal
      isOpen={props.isOpen}
      toggle={props.toggle}
      className="admin-modal issue-details-modal"
      centered
      contentClassName="custom_modal"
      size="lg"
    >
      <ModalHeader>
        Issue Details
        <Close
          className="close-modal"
          onClick={props.toggle}
        />
      </ModalHeader>
      <ModalBody className="px-4">
        <div className="d-flex justify-content-between"
          style={{
            padding: ".6rem 0",
            fontSize: "15px",
          }}
        >
          <p className="font-weight-bold">
            Issue ID <span className="font-weight-normal">STTL10933W822</span>
          </p>
          <p className="font-weight-bold">
            Date Created <span className="font-weight-normal">05-5-2021</span>
          </p>
          <p className="font-weight-bold">
            Time Created <span className="font-weight-normal">10:38 AM</span>
          </p>
        </div>
        <hr />
        <div className="mt-5">
          {information.map((info) => (
            <div className="d-flex mb-2" key={info.id}>
              <div className="w-50 font-weight-bold">
                {info.title}
              </div>
              <div className="w-50">
                {info.value}
              </div>
            </div>
          ))}
        </div>
        <hr />
        <div className="text-right w-100">
          <Button
            color="primary"
            className="btn-add"
            onClick={props.toggle}
            style={{
              padding: ".6rem 1.5rem",
            }}
          >
            Update Status
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};
