import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardSubtitle,
  Col,
  Form,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import Select from "react-select";
import InputBox from "../../components/InputBox";
import ButtonBox from "../../components/ButtonBox";
import AdminAvatar from "./../../assets/img/avatars/AdminAvatar.svg";
import AdminImage from "./../../assets/img/avatars/AdminImage.svg";
import securityIcon from "./../../assets/img/icons/security.svg";

export default function AdminCard(props) {
  const [deactivateModal, setDeactivateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [adminFullName, setAdminFullName] = useState("");
  const [adminEmailAddress, setAdminEmailAddress] = useState("");
  const [adminPhoneNumber, setAdminPhoneNumber] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [confirmAdminPassword, setConfirmAdminPassword] = useState("");

  const toggleDeactivateModal = () => setDeactivateModal(!deactivateModal);
  const toggleUpdateModal = () => setUpdateModal(!updateModal);
  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <>
      <Card
        className="admin-card mt-4"
        style={{ opacity: props.status === "Pending" ? "0.5" : "1" }}
      >
        <CardBody>
          {props.status === "Pending" ? (
            <img src={AdminAvatar} className="mb-3" alt="an avatar" />
          ) : (
            <img src={AdminImage} className="mb-3" alt="" />
          )}
          <CardTitle tag="h5">{props.name}</CardTitle>
          <CardText>{props.email}</CardText>
          <CardSubtitle
            tag="h6"
            className={
              props.role === "Pending" ? "text-pending" : "text-completed"
            }
          >
            {props.role}
          </CardSubtitle>
          <Row className="mt-3">
            <Col lg={6} md={12} sm={6}>
              <Button color="danger" onClick={toggleDeactivateModal}>
                Deactivate
              </Button>
            </Col>
            <Col lg={6} md={12} sm={6}>
              <Button color="info" onClick={toggleUpdateModal}>
                Edit
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>

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
          <Button color="danger" className="btn-delete">
            Yes, Delete
          </Button>{" "}
        </ModalFooter>
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
        <ModalBody className="pt-3 pb-0">
          <div className="tab">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "1" })}
                  onClick={() => toggleTab("1")}
                >
                  Profile Details
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "2" })}
                  onClick={() => toggleTab("2")}
                >
                  Security
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Form className="mt-3">
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
                    <Select
                      placeholder="Admin Type"
                      options={[
                        { value: "Admin", label: "Admin" },
                        { value: "Super Admin", label: "Super Admin" },
                      ]}
                      defaultValue={"Admin"}
                      isMulti
                      className="react-select"
                    />
                  </FormGroup>
                  <FormGroup>
                    <InputBox type="select" name="position" id="position">
                      <option value="backend-engineer">Backend Engineer</option>
                      <option value="frontend-engineer">
                        Frontend Engineer
                      </option>
                    </InputBox>
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
                    <ButtonBox onClick="" name="Update Details" />
                  </div>
                </Form>
              </TabPane>
              <TabPane tabId="2">
                <p className="mt-2">Change Admin password</p>
                <Form
                  className="d-flex flex-column justify-content-between"
                  style={{ height: "390px" }}
                >
                  <div>
                    <FormGroup>
                      <InputBox
                        type="password"
                        name="adminPassword"
                        id="adminPassword"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                      />
                      <Label for="adminPassword">Full Name</Label>
                    </FormGroup>
                    <FormGroup>
                      <InputBox
                        type="password"
                        name="confirmAdminPassword"
                        id="confirmAdminPassword"
                        value={confirmAdminPassword}
                        onChange={(e) =>
                          setConfirmAdminPassword(e.target.value)
                        }
                      />
                      <Label for="confirmAdminPassword">Confirm Password</Label>
                    </FormGroup>
                  </div>
                  <div>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <Button
                        color="info"
                        className="btn-cancel"
                        onClick={toggleUpdateModal}
                      >
                        Cancel
                      </Button>
                      <ButtonBox onClick="" name="Update Details" />
                    </div>
                  </div>
                </Form>
              </TabPane>
            </TabContent>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
