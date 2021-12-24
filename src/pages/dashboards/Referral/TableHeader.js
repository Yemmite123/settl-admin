import React, { useState } from "react";
import {
  DropdownToggle,
  DropdownMenu,
  Dropdown,
  FormGroup,
  Label,
  Input,
  CardBody,
  Col,
  InputGroup,
  InputGroupAddon,
  Button,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { CSVExport } from "react-bootstrap-table2-toolkit";
import DatePicker from "../../../components/DatePicker";
import { ReactComponent as SearchIcon } from "../../../BgImages/search.svg";
import { Multiselect } from "multiselect-react-dropdown";

const { ExportCSVButton } = CSVExport;

const Header = ({ csvData, filter, search, filtered, dataLength, Search }) => {
  const currentDate = new Date();
  const currentDateFormat = currentDate.setHours(0, 0, 0, 0);
  const [dropdownOpen, setDropdownOPen] = useState(false);
  const transactionStatus = [{ name: "Active" }, { name: "Registered" }];
  const [startDate, setStartDate] = useState(currentDateFormat);
  const [endDate, setEndDate] = useState(currentDateFormat);
  const [status, setStatus] = useState([]);

  const Change = (e, set) => {
    const array = [];
    for (let status in e) {
      array.push(e[status].name.toLowerCase());
    }
    set(array);
  };
  const clearState = () => {
    setStatus([]);
    setStartDate(currentDateFormat);
    setEndDate(currentDateFormat);
  };
  const onchange = (e) => {
    const { value } = e.target;
    Search(value);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "10px 0",
        paddingLeft: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "70%",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOPen(true)}>
          <DropdownToggle
            split
            style={{
              backgroundColor: `${
                filtered ? "rgba(195, 238, 212, 0.5)" : "#F1F1F5"
              }`,
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
            {filtered ? `${dataLength} ` : ""} Filter
          </DropdownToggle>
          <DropdownMenu className="filter-dropdown-menu">
            <div className="form-block">
              <FormGroup className="mt-3">
                <Label for="status">Transaction Status</Label>
                <Multiselect
                  className="forget_pass_select"
                  options={transactionStatus}
                  showCheckbox={true}
                  showArrow={true}
                  displayValue="name"
                  placeholder="Select"
                  onSelect={(e) => Change(e, setStatus)}
                  onRemove={(e) => Change(e, setStatus)}
                />
              </FormGroup>

              <DatePicker
                date={startDate}
                open={setDropdownOPen}
                setDate={setStartDate}
                name="Start Date"
              />
              <DatePicker
                date={endDate}
                open={setDropdownOPen}
                setDate={setEndDate}
                name="End Date"
              />

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
                  onClick={() => {
                    clearState();
                    setDropdownOPen(false);
                    filter({ status, startDate, endDate });
                  }}
                >
                  Clear
                </Button>
                <Button
                  style={{
                    backgroundColor: "#4F1699",
                    padding: "0.3rem 1.2rem",
                  }}
                  onClick={() => {
                    filter({ status, startDate, endDate });
                    setDropdownOPen(false);
                    clearState();
                  }}
                >
                  Filter
                </Button>
              </CardBody>
            </div>
          </DropdownMenu>
        </Dropdown>
        <Col lg="6">
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
                }}
              />
            </InputGroupAddon>
            <Input
              type="tel"
              onChange={onchange}
              placeholder="Search customer phone"
              style={{
                padding: "20px 35px",
                borderRadius: "8px",
              }}
            />
          </InputGroup>
        </Col>
      </div>
      {/* <ExportCSVButton {...csvData}>
        <Button
          size="lg"
          style={{
            padding: "10px .5rem",
            backgroundColor: "#4F1699",
            fontFamily: "SF Pro Display",
          }}
        >
          <FontAwesomeIcon icon={faFileExcel} />{" "}
          <span
            style={{
              paddingLeft: "0.5rem",
            }}
          >
            Export as Csv
          </span>
        </Button>
      </ExportCSVButton> */}
    </div>
  );
};

export default Header;
