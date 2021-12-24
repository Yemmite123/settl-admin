import React, { useState } from "react";
import { ReactComponent as Close } from "../../BgImages/close.svg";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import InputBox from "../../components/InputBox";
import Loading from "../../components/Loading";
import Request from "../../requests/customer";

export default function UpdateAccountInformationDialog(props) {
  const { updateAccountInfo } = Request();
  const [firstName, setFirstName] = useState(props.data?.firstName);
  const [lastName, setLastName] = useState(props.data?.lastName);
  const [email, setEmailAddress] = useState(props.data?.email);
  const [phoneNumber, setPhoneNumber] = useState(props.data?.phoneno);
  const [loading, setLoading] = useState(false);

  const updateInfo = async () => {
    setLoading(true);
    const response = await updateAccountInfo({
      firstName,
      lastName,
      email,
      phoneNumber,
    });
    if (response.code === "00") {
      props.toggle();
      props.setShowDetails(false);
      props.setTableData(null);
    }
    setLoading(false);
  };

  return (
    <>
      <Modal
        isOpen={props.isOpen}
        toggle={props.toggle}
        className="admin-modal suspended-modal"
      >
        <ModalHeader>
          Update Account Information
          <Close className="close-modal" onClick={props.toggle} />
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <InputBox
                type="text"
                name="firstName"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Label for="firstName">First Name</Label>
            </FormGroup>
            <FormGroup>
              <InputBox
                type="text"
                name="lastName"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Label for="lastName">Last Name</Label>
            </FormGroup>
            <FormGroup>
              <InputBox
                type="text"
                name="emailAddress"
                id="emailAddress"
                value={email}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
              <Label for="emailAddress">Email address</Label>
            </FormGroup>
            <FormGroup>
              <InputBox
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <Label for="adminFullName">Phone number</Label>
            </FormGroup>
          </Form>
          <br />
          <br />
          <br />
          <br />
          <hr />
          <div className="d-flex justify-content-between">
            <Button color="info" className="btn-cancel" onClick={props.toggle}>
              Cancel
            </Button>
            <Button
              color="primary"
              className="btn-add"
              onClick={updateInfo}
              disabled
            >
              {loading ? <Loading /> : "Update"}
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
