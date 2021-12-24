import React from "react";

import {
  Col,
  Row,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Calendar } from "react-feather";
import { RefreshButton } from "./RefreshButton";
const Header = ({ logo, name, calendar, updateDays, filterText, refresh }) => (
  <Row className="mb-2 mb-xl-4 align-items-center">
    <Col xs="auto" className="d-none d-sm-block">
      <h4 className="greeting">
        <img src={logo} className="" alt="Settl Logo" />
        <span className="pl-2">{name}</span>
      </h4>
    </Col>

    {calendar && (
      <Col xs="auto" className="ml-auto text-right mt-n1 pr-3">
        <RefreshButton next={refresh} />
        <UncontrolledDropdown className="d-inline filter-dropdown">
          <DropdownToggle
            caret
            color="light"
            className="shadow-sm"
            style={{
              backgroundColor: "white",
            }}
          >
            <Calendar className="feather align-middle mt-n1" /> {filterText}
          </DropdownToggle>
          <DropdownMenu
            right
            style={{
              top: "25px",
            }}
          >
            <DropdownItem onClick={() => updateDays(1, 0)}>Today</DropdownItem>
            <DropdownItem onClick={() => updateDays(7, 1)}>
              Last 7 Days
            </DropdownItem>
            <DropdownItem onClick={() => updateDays(30, 2)}>
              Last 30 Days
            </DropdownItem>
            <DropdownItem onClick={() => updateDays(90, 3)}>
              Last 90 Days
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Customize</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Col>
    )}
  </Row>
);
export default Header;
