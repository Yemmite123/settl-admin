import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { Plus } from "react-feather";
import InputBox from "../../components/InputBox";
import { Multiselect } from "multiselect-react-dropdown";
import adminRequest from "../../requests/admin";
import SuccessDialog from "../SuccessDialog";
import FailureDialog from "../FailureDialog";
import { useAPI } from "../../contexts/AdminContext";

const options = [
  {
    id: 1,
    name: "Admin"
  },
  {
    id: 2,
    name: "Super Admin"
  },
  {
    id: 3,
    name: "Support"
  },
];

const style = {
  border: "1px solid #4F1699",
  background: "#4F1699",
  fontSize: "15px",
  lineHeight: "18px",
  letterSpacing: "0.3px",
  width: "100%",
  padding: "15px",
};

function AddNewAdmin({ userName }) {
  const { changeUpdateStatus } = useAPI();
  const [addAdminModal, setAddAdminModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);
  const [employeeName, setEmployeeName] = useState("");
  const [employeeEmailAddress, setEmployeeEmailAddress] = useState("");
  const [employeePhoneNumber, setEmployeePhoneNumber] = useState("");
  const [employeeDepartment, setEmployeeDepartment] = useState("");
  const [adminRole, setAdminRole] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({
    message: "",
    data: "",
  });

  const { addAdmin } = adminRequest();

  const toggleModal = () => setAddAdminModal(!addAdminModal);
  const toggleCompleteModal = () => setCompleteModal(!completeModal);

  const checkInputValue = () => {
    if (
      employeeEmailAddress === "" ||
      employeeDepartment === "" ||
      employeePhoneNumber === "" ||
      employeeName === "" ||
      adminRole === ""
    )
      return true;
    return false;
  };

  const reset = () => {
    setEmployeeEmailAddress("");
    setEmployeeDepartment("");
    setEmployeePhoneNumber("");
    setEmployeeName("");
    setAdminRole("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await addAdmin(
      employeeName,
      employeeEmailAddress,
      employeePhoneNumber,
      adminRole,
      employeeDepartment,
      userName.split(" ")[0]
    );
    if (response.code === "00") {
      setLoading(false);
      setError(response);
      setAddAdminModal(false);
      setCompleteModal(true);
      changeUpdateStatus();
      reset();
      return true;
    }

    setError(response);
    setCompleteModal(true);
    setLoading(false);
    return false;
  };

  return (
    <>
      <div className="text-right">
        <Button color="primary" className="btn-add" onClick={toggleModal}>
          <Plus />
          New Admin
        </Button>
      </div>
      <Modal
        isOpen={addAdminModal}
        toggle={toggleModal}
        className="admin-modal"
      >
        <ModalHeader toggle={toggleModal}>Create New Admin</ModalHeader>
        <ModalBody>
          <Form
            method="post"
            onSubmit={handleSubmit}
            className="new-admin-form"
          >
            <FormGroup>
              <InputBox
                type="text"
                name="employeeName"
                id="employeeName"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
              />
              <Label for="employeeName">Employee Name</Label>
            </FormGroup>
            <FormGroup>
              <InputBox
                type="email"
                name="employeeEmailAddress"
                id="employeeEmailAddress"
                value={employeeEmailAddress}
                onChange={(e) => setEmployeeEmailAddress(e.target.value)}
              />
              <Label for="employeeEmailAddress">Email Address</Label>
            </FormGroup>
            <FormGroup>
              <InputBox
                type="text"
                name="employeePhoneNumber"
                id="employeePhoneNumber"
                value={employeePhoneNumber}
                onChange={(e) => setEmployeePhoneNumber(e.target.value)}
              />
              <Label for="employeePhoneNumber">Phone number</Label>
            </FormGroup>
            <FormGroup>
              <InputBox
                type="text"
                name="employeeDepartment"
                id="employeeDepartment"
                value={employeeDepartment}
                onChange={(e) => setEmployeeDepartment(e.target.value)}
              />
              <Label for="employeeDepartment">Department</Label>
            </FormGroup>
            <FormGroup>
              <Multiselect
                className="forget_pass_select"
                options={options}
                showCheckbox={true}
                showArrow={true}
                // style={ { border: "3px solid red", "border-bottom": "1px solid blue", "border-radius": "0px" } }
                placeholder={adminRole === "" ? "Admin Role" : adminRole}
                displayValue="name"
                onSelect={(e) => setAdminRole(e[0].id)}
                singleSelect={true}
              />
            </FormGroup>
            <hr />
            <Button
              color="primary"
              className="btn-add"
              type="submit"
              disabled={checkInputValue()}
              style={style}
            >
              Create Admin
              {loading ? (
                <div
                  className="spinner-border spinner-border-sm spinner text-white ml-2"
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                ""
              )}
            </Button>
          </Form>
        </ModalBody>
      </Modal>

      <SuccessDialog
        isOpen={completeModal}
        toggle={toggleCompleteModal}
        title={error.message}
        details={error.data}
      />

      <FailureDialog
        isOpen={completeModal}
        toggle={toggleCompleteModal}
        title={error.message}
        details={error.data}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  userName: state?.user?.details?.admin?.fullname,
});
export default connect(mapStateToProps)(AddNewAdmin);
