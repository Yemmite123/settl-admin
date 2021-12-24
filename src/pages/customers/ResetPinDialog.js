import React, { useState } from "react";
import { connect } from "react-redux";
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
import Loading from "../../components/Loading";
import InputBox from "../../components/InputBox";
import Request from "../../requests/customer";

function ResetPinDialog(props) {
  const { resetTransactionPin } = Request();
  const [adminFullName, setAdminFullName] = useState(props.fullName);
  const [loading, setLoading] = useState(false);
  const resetPin = async () => {
    setLoading(true);
    const response = await resetTransactionPin({
      phoneNumber: props.phoneNumber,
      adminFullName: props.fullName,
      adminEmail: props.email,
    });
    if (response.code === "00") {
      alert("PIN Reset Successful");
      props.toggle();
    }
    setLoading(false);
  };
  return (
    <>
      <Modal
        isOpen={props.isOpen}
        toggle={props.toggle}
        className="admin-modal freeze-modal"
      >
        <ModalHeader style={{ textTransform: "capitalize" }}>
          Reset {props.title} Pin
          <Close className="close-modal" onClick={props.toggle} />
        </ModalHeader>
        <ModalBody>
          <div>
            <div className="text-center">
              <p>
                Please confirm this is the right {props.title} account before
                initiating this process
              </p>
            </div>
            <Form>
              <FormGroup>
                <InputBox
                  type="text"
                  name="adminFullName"
                  id="adminFullName"
                  value={adminFullName}
                />
                <Label for="adminFullName">Admin Full Name</Label>
              </FormGroup>
            </Form>
            <div className="w-100 mt-5 pt-5">
              <Button
                color="primary"
                className="btn-add w-100 py-3"
                onClick={resetPin}
              >
                {loading ? <Loading /> : " Continue"}
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
const mapStateToProps = (state) => ({
  fullName: state.user?.details?.admin?.fullname,
  email: state.user?.details?.admin?.email,
});
export default connect(mapStateToProps)(ResetPinDialog);
