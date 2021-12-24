import React from "react";
import { connect } from "react-redux";
import {
  Button,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";

import { Calendar, Filter, RefreshCw } from "react-feather";
import logo from "../../../assets/img/icons/home.svg";

const Header = ({ userName }) => {
  return (
    <Row className="mb-2 mb-xl-4">
      <Col xs="auto" className="d-none d-sm-block">
        <h4 className="greeting">
          <img src={logo} className="" alt="Settl Logo" />
          <span className="pl-2">Welcome back, {userName?.split(" ")[0]}!</span>
        </h4>
      </Col>

      {/* <Col xs="auto" className="ml-auto text-right mt-n1">
        <UncontrolledDropdown className="d-inline mr-2">
          <DropdownToggle caret color="light" className="bg-white shadow-sm">
            <Calendar className="feather align-middle mt-n1" /> Today
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>Action</DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
            <DropdownItem>Something else here</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Seperated link</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>

        <Button color="primary" className="shadow-sm mr-1">
          <Filter className="feather" />
        </Button>
        <Button color="primary" className="shadow-sm">
          <RefreshCw className="feather" />
        </Button>
      </Col> */}
    </Row>
  );
};

const mapStateToProps = (state) => ({
  userName: state?.user?.details?.admin?.fullname,
});
export default connect(mapStateToProps)(Header);
