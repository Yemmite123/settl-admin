import React from "react";
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { RefreshButton } from "../../../components/RefreshButton";

import { Calendar } from "react-feather";
import customerIcon from "../../../assets/img/icons/customer.svg";

export default function Header(props) {
  return (
    <div className="customer-header d-flex align-items-center mb-2">
      <Col xs="auto" className="d-none d-sm-block pl-0">
        <h4 className="greeting">
          <img src={customerIcon} className="" alt="an icon" />
          <span className="pl-2">{props.title}</span>
        </h4>
      </Col>

      <Col xs="auto" className="ml-auto text-right mt-n1 pr-0">
        <RefreshButton next={props.refresh} />
        <UncontrolledDropdown className="d-inline filter-dropdown">
          <DropdownToggle caret color="light" className="shadow-sm">
            <Calendar className="feather align-middle mt-n1" /> Last 30 days
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>Action</DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
            <DropdownItem>Something else here</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Seperated link</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Col>
    </div>
  );
}
