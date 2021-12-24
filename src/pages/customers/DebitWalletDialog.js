import React, { useState } from "react";
import { connect } from "react-redux";
import Loading from "../../components/Loading";
import SuccessDialog from "../../pages/SuccessDialog";
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
import request from "../../requests/customer";

const DebitWalletDialog = (props) => {
  const { creditOrDebitCustomer } = request();
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (reason.length < -1 || reason.length === 0) {
      setError("The Reason field is required.");
    } else {
      setError("");
    }
    setLoading(true);

    const response = await creditOrDebitCustomer({
      transId: props.transRef,
      fullName: props.fullName,
      adminEmail: props.email,
      amount: props.amount,
      reason: reason,
      customerPhoneNo: props.phoneNo,
      transactionType: 2,
    });

    if (response.code === "00") {
      setLoading(false);
      setMessage(response.data);
      setSuccessModal(true);
    } else {
      setLoading(false);
    }
  };

  const toggle = () => setSuccessModal((prevState) => !prevState);

  return (
    <>
      <SuccessDialog
        title="Wallet successfully debited"
        details={message}
        isOpen={successModal}
        toggle={toggle}
      />
      <Modal
        isOpen={props.isOpen}
        toggle={props.toggle}
        className="admin-modal freeze-modal debit-modal"
      >
        <ModalHeader>Debit Customer Wallet </ModalHeader>
        <ModalBody>
          <div>
            <div className="text-center">
              <p>You are about to fund a customer wallet</p>
            </div>
            <Form>
              <FormGroup>
                <InputBox
                  type="text"
                  name="transactionRef"
                  id="transactionRef"
                  value={props.transRef}
                />
                <Label for="transactionRef">Transaction Reference</Label>
              </FormGroup>
              <FormGroup>
                <InputBox
                  type="text"
                  name="amount"
                  id="amount"
                  value={`₦ ${props.amount}`}
                />
                <Label for="amount">Amount</Label>
              </FormGroup>
              <FormGroup className="pb-3">
                <InputBox
                  type="textarea"
                  name="reason"
                  id="reason"
                  value={reason}
                  rows="4"
                  onChange={(e) => setReason(e.target.value)}
                />
                <Label for="reason">Reason why this is been initiated...</Label>
              </FormGroup>
            </Form>
            <p className="text-danger">{error}</p>
            <hr />
            <div className="d-flex justify-content-between">
              <Button
                color="info"
                className="btn-cancel"
                onClick={props.toggle}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                className="btn-add cursor-pointer"
                type="submit"
                onClick={(event) => handleSubmit(event)}
              >
                {loading ? <Loading /> : "Debit wallet"}
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  email: state.user?.details?.admin?.email,
});

export default connect(mapStateToProps, null)(DebitWalletDialog);
