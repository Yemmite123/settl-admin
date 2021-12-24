import React, { useState } from "react";

import {
  InputGroupAddon,
  Col,
  InputGroup,
  Input,
  Button,
  DropdownToggle,
  DropdownMenu,
  Dropdown,
  CardBody,
} from "reactstrap";
import { ReactComponent as SearchIcon } from "../../../BgImages/search.svg";
import { RefreshButton } from "../../../components/RefreshButton";

const VendorTabHeader = ({ placeholder, filter, refresh }) => {
  const [dropdownOpen, setDropdownOPen] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOPen(true)}>
        <DropdownToggle
          split
          style={{
            backgroundColor: "#F1F1F5",
            color: "#696974",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            border: "1px solid #E2E2EA",
            borderRadius: "8px",
            width: "6rem",
            padding: "10px .5rem",
          }}
        >
          Filter
        </DropdownToggle>
        <DropdownMenu
          style={{
            top: "30px",
            padding: "0.3rem",
            width: "300px",
          }}
        >
          <CardBody
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              style={{
                border: "1px solid grey",
                backgroundColor: "white",
                color: "black",
                padding: "0.3rem 0.7rem",
              }}
              onClick={() => setDropdownOPen(false)}
            >
              Cancel
            </Button>
            <Button
              style={{
                backgroundColor: "#4F1699",
                padding: "0.3rem 1.2rem",
              }}
              onClick={() => setDropdownOPen(false)}
            >
              Filter
            </Button>
          </CardBody>
        </DropdownMenu>
      </Dropdown>
      <Col lg="4">
        <InputGroup
          style={{
            position: "relative",
            margin: 0,
          }}
        >
          <InputGroupAddon addonType="append" color="primary">
            <SearchIcon
              style={{
                position: "absolute",
                zIndex: "5",
                left: "10px",
                height: "100%",
                // top: "4px",
              }}
            />
          </InputGroupAddon>
          <Input
            style={{
              padding: "20px 35px",
              borderRadius: "8px",
              width: "100%",
            }}
            onChange={filter}
            placeholder={placeholder}
          />
        </InputGroup>
      </Col>
      <RefreshButton next={refresh} />
    </div>
  );
};
export default VendorTabHeader;
