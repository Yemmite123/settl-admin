import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Badge,
  Button,
  Col,
  Form,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Row,
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import InputBox from "../../components/InputBox";
import { Multiselect } from "multiselect-react-dropdown";
import { Edit2, Trash } from "react-feather";
import securityIcon from "./../../assets/img/icons/security.svg";
import online from "./../../assets/img/icons/online.svg";
import Loader from "../../components/Loader";
import { useAPI } from "../../contexts/AdminContext";
import adminRequest from "../../requests/admin";
import SuccessDialog from "../SuccessDialog";
import FailureDialog from "../FailureDialog";
import AdminFilter from "./AdminFilter";

const tableColumns = [
    {
        dataField: "employeeName",
        text: "Name"
    },
    {
        dataField: "position",
        text: "Department"
    },
    {
        dataField: "adminRole",
        text: "Type",
        formatter: (cell, row, rowIndex) => {
            return (
                cell.charAt(0).toUpperCase() + cell.substr(1).toLowerCase()
            );
        },
    },
    {
        dataField: "isActive",
        text: "Status",
        headerClasses: "text-center",
        formatter: (cell, row, rowIndex) => {
            return (
                cell ? <Badge color="secondary" className="badge-active">Active</Badge> :
                <Badge color="secondary" className="badge-pending">Deactivated</Badge>
            );
        },
        classes: (cell, row, rowIndex, colIndex) => { 
            return cell ? "opacity" : ""
        }
    },
    {
        dataField: "actions",
        text: "Action",
        formatter: (cell, row, rowIndex) => {
            return (
                <div>
                    <Edit2 className="align-middle edit mr-3" size={18} />
                    <Trash className="align-middle delete" size={18} />
                </div>
            );
        },
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

function AdminTable({ userName, email, filterText }) {
  const { adminData } = useAPI();
  const { getAdminById, updateAdmin, deactivateAdmin } = adminRequest();
  const [data, setData] = useState(adminData);
  const [singleAdminData, setSingleAdminData] = useState("");
  const [adminDetailsModal, setAdminDetailsModal] = useState(false);
  const [deactivateModal, setDeactivateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const [adminId, setAdminId] = useState("");
  const [adminFullName, setAdminFullName] = useState("");
  const [adminEmailAddress, setAdminEmailAddress] = useState("");
  const [adminPhoneNumber, setAdminPhoneNumber] = useState("");
  const [adminDepartment, setAdminDepartment] = useState("");
  const [adminRole, setAdminRole] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [loading, setLoading] = useState(false);

    const [isfiltered, setIsFiltered] = useState(false);

    const getSingleAdminData = () => {
        setAdminId(singleAdminData.id);
        setAdminFullName(singleAdminData.employeeName);
        setAdminEmailAddress(singleAdminData.emailAddress);
        setAdminPhoneNumber(singleAdminData.phoneNumber);
        setAdminDepartment(singleAdminData.position);
        setAdminRole(singleAdminData.adminRole);
    }

  console.log("admin", adminRole);
  const [options] = useState([
    { name: "Admin", id: 1 },
    { name: "Super Admin", id: 2 },
    { name: "Support", id: 3 },
  ]);

  const toggleDeactivateModal = () => setDeactivateModal(!deactivateModal);
  const toggleUpdateModal = () => setUpdateModal(!updateModal);
  const toggleDetailsModal = () => setAdminDetailsModal(!adminDetailsModal);

  useEffect(() => {
    setData(adminData);
    getSingleAdminData();
  }, [adminData, singleAdminData]);

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing {from} to {to} of {size} Results
    </span>
  );

  const rowEvents = {
    onClick: async (e, row, rowIndex) => {
      const response = await getAdminById(row.id);
      if (response.code === "00") {
        setSingleAdminData(response.data);
      }
      toggleDetailsModal();
    },
  };

  const detailsData = [
    {
      title: "Name",
      value: <p className="details-value">{singleAdminData.employeeName}</p>,
    },
    {
      title: "Email",
      value: <p className="details-value">{singleAdminData.emailAddress}</p>,
    },
    {
      title: "Phone Number",
      value: <p className="details-value">{singleAdminData.phoneNumber}</p>,
    },
    {
      title: "Department",
      value: <p className="details-value">{singleAdminData.position}</p>,
    },
    {
      title: "Level",
      value: <p className="details-value">{`Tier ${singleAdminData.level}`}</p>,
    },
    {
      title: "Status",
      value: (
        <div className="d-flex align-items-center">
          <img src={online} className="mr-2" alt="" /> Active
        </div>
      ),
    },
  ];

  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedAdminData = new FormData();
    updatedAdminData.append("Id", adminId);
    updatedAdminData.append("EmployeeName", adminFullName);
    updatedAdminData.append("EmailAddress", adminEmailAddress);
    updatedAdminData.append("PhoneNumber", adminPhoneNumber);
    updatedAdminData.append("AdminRole", adminRole);
    updatedAdminData.append("Position", adminDepartment);
    updatedAdminData.append("CreatedBy", userName);

    const response = await updateAdmin(updatedAdminData);

    if (response.code === "00") {
      setLoading(false);
      console.log(response.data);
      setAdminDetailsModal(false);
      setUpdateModal(false);
      setShowSuccess(true);
    } else {
      setLoading(false);
      setShowFailure(true);
    }
  };

    const handleDeactivateAdmin = async () => {
        setLoading(true);

        const response = await deactivateAdmin(adminId, false, email);

        if (response.code === "00") {
        setLoading(false);
        console.log(response.data);
        setAdminDetailsModal(false);
        setDeactivateModal(false);
        setShowSuccess(true);
        return true;
        }
        setLoading(false);
        setShowFailure(true);
        return false;
    };

    // to filter data on the table
    const Filter = (data) => {
        setData("");
        const check =
          data.status.length > 0 || data.type.length > 0;
    
        setTimeout(() => {
          const filtered = adminData.filter((admin) => {
            if (check) {
              setIsFiltered(true);
              return (
                data.status.includes(admin.isActive.toString().toLowerCase()) ||
                data.type.includes(admin.adminRole.toLowerCase())
              );
            } else {
              setIsFiltered(false);
              return admin;
            }
          });
          setData(filtered);
        }, 500);
    };
    
    return (
        <>
            <AdminFilter
                filter={Filter}
                filtered={isfiltered}
                dataLength={data.length}
            />
            <div className="admin-table mt-4">
                {
                    data.length === 0 ? <Loader /> :
                    <BootstrapTable
                        keyField="id"
                        data={data.filter((d) =>
                            d.employeeName.toLowerCase().includes(filterText)
                        )}
                        columns={tableColumns}
                        rowEvents={rowEvents}
                        bootstrap4
                        bordered={false}
                        pagination={paginationFactory({
                        sizePerPage: 9,
                        hideSizePerPage: true,
                        showTotal: true,
                            paginationTotalRenderer: customTotal,
                        })}
                    />
                }
            </div>

            {/* Single Admin Details */}
            <Modal
                isOpen={adminDetailsModal}
                toggle={toggleDetailsModal}
                className="details-modal"
            >
                <ModalBody>
                    <div>
                        <h6 className="p-3 mb-3">Admin Details</h6>
                        {detailsData.map((data, index) => {
                            return (
                                <div
                                    className="details-wrapper d-flex justify-content-between px-3 mb-3"
                                    key={index}
                                >
                                    <div>
                                        <p className="details-title">{data.title}</p>
                                    </div>
                                    <div>{data.value}</div>
                                </div>
                            );
                        })}
                    </div>
                    <Row className="px-3">
                        <Col md={6}>
                            <div>
                                <Button
                                    color="info"
                                    className="btn-cancel"
                                    onClick={toggleUpdateModal}
                                >
                                    Update Admin
                                </Button>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div>
                                <Button
                                    color="danger"
                                    className="btn-delete w-100"
                                    onClick={toggleDeactivateModal}
                                >
                                    Deactivate Admin
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>

            {/* Update modal  */}
            <Modal
                isOpen={updateModal}
                toggle={toggleUpdateModal}
                className="admin-modal update-modal"
            >
                <ModalHeader toggle={toggleUpdateModal}>
                Update Admin details
                </ModalHeader>
                <ModalBody className="pt-3">
                    <Form
                        method="post"
                        onSubmit={handleUpdateDetails}
                        className="mt-3 new-admin-form"
                    >
                        <FormGroup>
                            <InputBox
                                type="text"
                                name="adminFullName"
                                id="adminFullName"
                                value={adminFullName}
                                onChange={(e) => setAdminFullName(e.target.value)}
                            />
                            <Label for="adminFullName">Full Name</Label>
                        </FormGroup>
                        <FormGroup>
                            <InputBox
                                type="email"
                                name="adminEmailAddress"
                                id="adminEmailAddress"
                                value={adminEmailAddress}
                                onChange={(e) => setAdminEmailAddress(e.target.value)}
                            />
                            <Label for="adminEmailAddress">Email Address</Label>
                        </FormGroup>
                        <FormGroup>
                            <InputBox
                                type="text"
                                name="adminPhoneNumber"
                                id="adminPhoneNumber"
                                value={adminPhoneNumber}
                                onChange={(e) => setAdminPhoneNumber(e.target.value)}
                            />
                            <Label for="adminPhoneNumber">Phone number</Label>
                        </FormGroup>
                        <FormGroup>
                            <InputBox
                                type="text"
                                name="adminDepartment"
                                id="adminDepartment"
                                value={adminDepartment}
                                onChange={(e) => setAdminDepartment(e.target.value)}
                            />
                            <Label for="adminDepartment">Department</Label>
                        </FormGroup>
                        <FormGroup>
                            <Multiselect
                                className="forget_pass_select"
                                options={options}
                                showCheckbox={true}
                                showArrow={true}
                                // style={ { border: "3px solid red", "border-bottom": "1px solid blue", "border-radius": "0px" } }
                                placeholder={adminRole === "" ? "Choose Role" : adminRole}
                                displayValue="name"
                                onSelect={(e) => setAdminRole(e[0].id)}
                                singleSelect={true}
                            />
                        </FormGroup>
                        <hr />
                        <div className="d-flex justify-content-between">
                            <Button
                                color="info"
                                className="btn-cancel"
                                onClick={toggleUpdateModal}
                            >
                                Cancel
                            </Button>
                            <Button
                                color="primary"
                                className="btn-add"
                                type="submit"
                                style={style}
                            >
                                Update Details
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
                        </div>
                    </Form>
                </ModalBody>
            </Modal>

            {/* Deactivate Modal */}
            <Modal
                isOpen={deactivateModal}
                toggle={toggleDeactivateModal}
                className="admin-modal deactivate-modal"
            >
                <ModalHeader toggle={toggleDeactivateModal}>
                    Deactivation Confirmation
                </ModalHeader>
                <ModalBody className="text-center pt-4 px-5 mx-2">
                    <img src={securityIcon} alt="an icon" />
                    <p className="pt-3">
                        Deactivating this admin user means they willl no longer be able to
                        view their Dashboard. Are you sure you want to continue?
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="info"
                        className="btn-cancel"
                        onClick={toggleDeactivateModal}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="danger"
                        className="btn-delete"
                        onClick={handleDeactivateAdmin}
                    >
                        Yes, Delete
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
                </ModalFooter>
            </Modal>

            <SuccessDialog
                isOpen={showSuccess}
                toggle={() => setShowSuccess(!showSuccess)}
                title="Success Message"
                details="Your data has been successfully updated"
            />

            <FailureDialog
                isOpen={showFailure}
                toggle={() => setShowFailure(!showFailure)}
                title="Failure Message"
                details="Oops! An error occured"
            />
        </>
    );
}

const mapStateToProps = (state) => ({
  userName: state?.user?.details?.admin?.fullname,
  email: state?.user?.details?.admin?.email,
});
export default connect(mapStateToProps)(AdminTable);
