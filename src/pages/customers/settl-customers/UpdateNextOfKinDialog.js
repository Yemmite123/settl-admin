import React, { useState } from "react";
import { ReactComponent as Close } from "../../../BgImages/close.svg";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import InputBox from "../../../components/InputBox";
import Loading from "../../../components/Loading";
import Request from "../../../requests/customer";
import { useHistory } from "react-router-dom";

export default function UpdateNextOfKinDialog(props) {
  const history = useHistory();
  const { updateNextOfKin } = Request();
  const [fullName, setFullName] = useState(props.data?.nokName);
  const [emailAddress, setEmailAddress] = useState(props.data?.nokEmail);
  const [phoneNumber, setPhoneNumber] = useState(props.data?.nokPhoneNo);
  const [loading, setLoading] = useState(false);
  const updateInfo = async () => {
    setLoading(true);
    const response = await updateNextOfKin({
      consumerPhoneNumber: props.data?.phoneno,
      nextOfKinFullName: fullName,
      nextOfKinEmail: emailAddress,
      nextOfKinPhoneNumber: phoneNumber,
    });
    if (response.code === "00") {
      props.toggle();
      history.push(`/customers/details/${props.data.phoneno}`);
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
          Update Next of Kin Information
          <Close className="close-modal" onClick={props.toggle} />
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <InputBox
                type="text"
                name="fullName"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <Label for="fulltName">Full Name</Label>
            </FormGroup>
            <FormGroup>
              <InputBox
                type="text"
                name="emailAddress"
                id="emailAddress"
                value={emailAddress}
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
