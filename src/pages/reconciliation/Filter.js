import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Button,
  CardBody,
} from "reactstrap";

const Filter = () => {
  const [dropdownOpen, setDropdownOPen] = useState(false);
  return (
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
  );
};

export default Filter;
