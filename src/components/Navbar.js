import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { toggleSidebar } from "../redux/actions/sidebarActions";
import { ReactComponent as Close } from "../BgImages/close.svg";
import { Modal, Button } from "react-bootstrap";
import { ReactComponent as SettingsIcon } from "../assets/img/icons/cog.svg";
import { ReactComponent as NotificationIcon } from "../assets/img/icons/bell.svg";
import { setUserDetails } from "../redux/actions/userAction";

import {
  Row,
  Col,
  Collapse,
  Navbar,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ListGroup,
  ListGroupItem,
  TabContent,
  TabPane,
  Input,
} from "reactstrap";

import {
  AlertCircle,
  Bell,
  Home,
  PieChart,
  Settings,
  User,
  UserPlus,
} from "react-feather";

import avatar1 from "../assets/img/avatars/avatar.svg";

const notifications = [
  // {
  //   type: "important",
  //   title: "Wole Olonleke",
  //   description: "has upgraded to Tier 3 Admin",
  //   time: "2 minutes ago",
  // },
  // {
  //   type: "default",
  //   title: "Wole Olonleke",
  //   description: "has upgraded to Tier 3 Admin",
  //   time: "2 minutes ago",
  // },
  // {
  //   type: "login",
  //   title: "Wole Olonleke",
  //   description: "has upgraded to Tier 3 Admin",
  //   time: "2 minutes ago",
  // },
  // {
  //   type: "request",
  //   title: "Asurance Uwangne",
  //   description: "has upgraded to Tier 3 Admin",
  //   time: "2 days ago",
  // },
];
const requests = [
  // {
  //   title: "Joy Oranu",
  //   description: "has created a bulk transaction request",
  //   time: "20 minutes ago",
  // },
  // {
  //   title: "Joy Oranu",
  //   description: "has created a bulk transaction request",
  //   time: "20 minutes ago",
  // },
];

const NavbarDropdown = ({ children, count, showBadge, footer, icon: Icon }) => (
  <UncontrolledDropdown nav inNavbar className="mr-2 relative">
    <DropdownToggle nav className="nav-icon dropdown-toggle">
      <div className="position-relative">
        <Icon
          className="align-middle"
          style={{
            transform: "scale(1.2)",
          }}
        />
        {showBadge ? <span className="indicator">{count}</span> : null}
      </div>
    </DropdownToggle>
    <DropdownMenu className="dropdown-menu-lg py-30 notification">
      <ListGroup>{children}</ListGroup>
      <DropdownItem header className="dropdown-menu-footer ">
        <span className="text-muted notification_footer">{footer}</span>
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
);

const NavbarDropdownItem = ({ title, description, time, spacing, type }) => {
  const splitName = title.split(" ");
  const initial = [...splitName[0]][0] + [...splitName[1]][0];

  return (
    <ListGroupItem>
      <Row
        noGutters
        style={{
          display: "flex",
        }}
      >
        <div
          className="initial"
          style={{
            backgroundColor: `${type === "requests" ? "#0CC784" : "#7997f0"}`,
          }}
        >
          {initial}
        </div>
        <Col className={spacing ? "pl-1" : "pl-3 pr-0"}>
          <div className="text-dark">
            {title} <span className="text-muted small mt-1">{description}</span>
          </div>
          <div className="text-muted small mt-1">{time}</div>
          {type == "requests" && (
            <div className="request_button">
              <p> Accept</p>
              <p>Decline </p>
              <p>View</p>
            </div>
          )}
        </Col>
      </Row>
    </ListGroupItem>
  );
};

const NavbarComponent = ({ dispatch, name, role}) => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  let initial = "";
  if (name) {
    const splitName = name.split(" ");
    initial = [...splitName[0]][0] + [...splitName[1]][0];
  }

  return (
    <Navbar color="white" light expand>
      <span
        className="sidebar-toggle d-flex mr-2"
        onClick={() => {
          dispatch(toggleSidebar());
        }}
      >
        {/* <i className="hamburger align-self-center" /> */}
        <svg
          className="align-self-center"
          width="18"
          height="16"
          viewBox="0 0 18 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 0H18V2H0V0ZM0 7H12V9H0V7ZM0 14H18V16H0V14Z"
            fill="#304762"
          />
        </svg>
      </span>

      <Collapse navbar>
        <Nav className="ml-auto" navbar>
          <NavbarDropdown
            footer="View all >"
            icon={NotificationIcon}
            count={notifications.length}
          >
            <div className="nav">
              <div
                onClick={() => setActiveTab("1")}
                className={`${activeTab === "1" ? "active_nav" : ""}`}
              >
                <p>Notifications ({notifications.length})</p>
              </div>
              <div
                onClick={() => setActiveTab("2")}
                className={`${activeTab === "2" ? "active_nav" : ""}`}
              >
                <p>Approval Request ({requests.length})</p>
              </div>
              <div
                style={{
                  position: "absolute",
                  right: "10px",
                }}
              >
                <SettingsIcon />
              </div>
            </div>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                {notifications?.map((item, key) => {
                  return (
                    <NavbarDropdownItem
                      key={key}
                      title={item.title}
                      description={item.description}
                      time={item.time}
                    />
                  );
                })}
              </TabPane>
              <TabPane tabId="2">
                {requests?.map((item, key) => {
                  return (
                    <NavbarDropdownItem
                      key={key}
                      title={item.title}
                      description={item.description}
                      time={item.time}
                      type="requests"
                    />
                  );
                })}
              </TabPane>
            </TabContent>
          </NavbarDropdown>
          <UncontrolledDropdown nav inNavbar>
            <span className="d-inline-block d-sm-none">
              <DropdownToggle nav caret>
                <Settings size={18} className="align-middle" />
              </DropdownToggle>
            </span>
            <span className="d-none d-sm-inline-block ">
              <DropdownToggle nav caret>
                <img
                  src={avatar1}
                  className="avatar img-fluid rounded-circle mr-1"
                  alt="Chris Wood"
                />

                <span className="avatar_text">{name}</span>
                <span
                  style={{
                    position: "absolute",
                    left: "3.5rem",
                    top: "1.4rem",
                  }}
                >
                  {role === "SUPER_ADMIN"? "Super Admin" : role}
                </span>
              </DropdownToggle>
            </span>
            <DropdownMenu right>
              <DropdownItem
                onClick={() => {
                  setShow(true);
                }}
              >
                <User size={18} className="align-middle mr-2" />
                Account
              </DropdownItem>

              <DropdownItem divider />
              <DropdownItem
                onClick={() => {
                  dispatch(setUserDetails({}));
                  history.push("/auth/sign-in");
                }}
              >
                Sign out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
      <AccountModal show={show} setShow={setShow} initial={initial} />
    </Navbar>
  );
};
const AccountModal = ({ show, setShow, initial }) => {
  const [activeTab, setActiveTab] = useState("1");
  const [image, setImage] = useState(null);
  const uploadImage = (e) => {
    e.persist();
    setImage(URL.createObjectURL(e.target.files[0]));
  };
  const removeImage = () => {
    setImage(null);
  };
  return (
    <Modal
      show={show}
      centered
      onHide={() => setShow(false)}
      className="account_modal"
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
          Account Settings
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
          padding: "1rem ",
        }}
      >
        <div className="nav">
          <div
            onClick={() => setActiveTab("1")}
            className={`${activeTab === "1" ? "active_nav" : ""}`}
          >
            <p>Profile Details</p>
          </div>
          <div
            onClick={() => setActiveTab("2")}
            className={`${activeTab === "2" ? "active_nav" : ""}`}
          >
            <p>Security</p>
          </div>
        </div>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    margin: "20px 0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    borderBottom: "1px solid rgba(216, 216, 216, 0.6)",
                  }}
                >
                  <p
                    style={{
                      color: "#6B778C",
                      marginTop: "0.5rem",
                    }}
                  >
                    Your Avater
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        padding: `${image ? "" : "1.5rem"}`,
                        borderRadius: "50%",
                        backgroundColor: "#4AB3FF",
                        overflow: "hidden",
                        width: "66px",
                        height: "66px",
                      }}
                    >
                      {image ? (
                        <img
                          src={image}
                          alt="profile"
                          style={{
                            height: "66px",
                            width: "66px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <>{initial}</>
                      )}
                    </div>
                    <div className="file-upload">
                      <input
                        type="file"
                        onChange={uploadImage}
                        accept="image/*"
                      />
                      <button className="account_button button_upload">
                        Upload New
                      </button>
                    </div>

                    <button
                      className="account_button button_delete"
                      onClick={removeImage}
                    >
                      Delete Avater
                    </button>
                  </div>
                  <p
                    style={{
                      color: "#6B778C",
                      textAlign: "center",
                    }}
                  >
                    Avatar help your teammates recognize you.
                  </p>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <fieldset
                    className="float-label"
                    style={{
                      margin: "0",
                    }}
                  >
                    <Input
                      name="firstName"
                      autoComplete="off"
                      type="text"
                      className="form-control shadow-none"
                      style={{
                        margin: "0",
                      }}
                      required
                    />
                    <label htmlFor="firstName">First Name</label>
                  </fieldset>
                  <fieldset
                    className="float-label"
                    style={{
                      margin: "0",
                    }}
                  >
                    <Input
                      name="lastName"
                      autoComplete="off"
                      type="text"
                      className="form-control shadow-none"
                      style={{
                        margin: "0",
                      }}
                      required
                    />
                    <label htmlFor="lastName">Last Name</label>
                  </fieldset>
                </div>
                <fieldset
                  className="float-label"
                  style={{
                    margin: " 5px 0",
                  }}
                >
                  <Input
                    name="email"
                    autoComplete="off"
                    type="email"
                    className="form-control shadow-none"
                    style={{
                      margin: "0",
                    }}
                    required
                  />
                  <label htmlFor="email">Email Address</label>
                </fieldset>
                <fieldset
                  className="float-label"
                  style={{
                    margin: " 5px 0",
                  }}
                >
                  <Input
                    name="phoneNumber"
                    autoComplete="off"
                    type="tel"
                    className="form-control shadow-none"
                    style={{
                      margin: "0",
                    }}
                    required
                  />
                  <label htmlFor="phoneNumber">Phone Number</label>
                </fieldset>

                <select
                  name="select"
                  style={{
                    padding: "1rem",
                    backgroundColor: "#FAFAFA",
                    border: "1px solid #E1E1E1",
                    borderRadius: "4px",
                  }}
                >
                  <option value="" disabled selected>
                    Select
                  </option>
                  <option value="super admin">Super Admin</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </>
          </TabPane>
          <TabPane tabId="2">
            <>
              <p
                style={{
                  color: "#6B778C",
                  marginTop: "1rem",
                }}
              >
                Change or update your current password{" "}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                }}
              >
                <fieldset
                  className="float-label"
                  style={{
                    margin: "0",
                  }}
                >
                  <Input
                    name="currentPassword"
                    autoComplete="off"
                    type="password"
                    className="form-control shadow-none"
                    style={{
                      margin: "0",
                    }}
                    required
                  />
                  <label htmlFor="currentPassword">Current Password</label>
                </fieldset>
                <fieldset
                  className="float-label"
                  style={{
                    margin: "0",
                  }}
                >
                  <Input
                    name="newPassword"
                    autoComplete="off"
                    type="password"
                    className="form-control shadow-none"
                    style={{
                      margin: "0",
                    }}
                    required
                  />
                  <label htmlFor="newPassword">New Password</label>
                </fieldset>
                <fieldset
                  className="float-label"
                  style={{
                    margin: "0",
                  }}
                >
                  <Input
                    name="confirmNewPassword"
                    autoComplete="off"
                    type="password"
                    className="form-control shadow-none"
                    style={{
                      margin: "0",
                    }}
                    required
                  />
                  <label htmlFor="confirmNewPassword">
                    Confirm New Password
                  </label>
                </fieldset>
              </div>
            </>
          </TabPane>
        </TabContent>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "25px",
          borderTop: "1px solid rgba(231, 231, 237, 0.6)",
          width: "100%",
          display: "flex",
          padding: "0 20px",
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={() => setShow(false)}
          style={{
            border: "1px solid #DADDE1",
            padding: ".6rem 1.5rem",
            marginRight: "1rem",
            marginTop: "1rem",
            backgroundColor: "white",
            color: "black",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            setShow(false);
          }}
          style={{
            backgroundColor: "#4F1699",
            padding: ".6rem 1.5rem",
            marginRight: "1rem",
            marginTop: "1rem",
            color: "white",
            border: "none",
          }}
        >
          Update Profile
        </Button>
      </div>
    </Modal>
  );
};
export default connect((store) => ({
  app: store.app,
  name: store.user?.details?.admin?.fullname,
  role: store.user?.details?.admin?.role,
}))(NavbarComponent);

// const mapStateToProps = (store) => ({
//   app: store.app,
//   name: store.user?.details?.admin?.fullname,
// });
// const mapDispatchToProps = (dispatch) => ({
//   setUserDetails: (details) => dispatch(setUserDetails(details)),
// });
// export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);
