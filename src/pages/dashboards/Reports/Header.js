import React, { useState } from "react";
import {
  DropdownToggle,
  DropdownMenu,
  Dropdown,
  CardBody,
  Button,
  FormGroup,
  Label,
} from "reactstrap";
import { CSVExport } from "react-bootstrap-table2-toolkit";
import DatePicker from "../../../components/DatePicker";

import { Multiselect } from "multiselect-react-dropdown";
import file from "../../../assets/img/icons/file.svg";
import Search from "../../../components/Search";

const { ExportCSVButton } = CSVExport;
// const { SearchBar } = Search;

const Header = ({ csvData, filter, filtered, productLength, SearchFilter }) => {
  const options = [
    { name: "Biller ID", checked: false },
    { name: "Billing Reference", checked: false },
    { name: "Settl Transaction Reference", checked: false },
  ];
  const currentDate = new Date();
  const currentDateFormat = currentDate.setHours(0, 0, 0, 0);
  const [dropdownOpen, setDropdownOPen] = useState(false);

  const transactionStatus = [
    { name: "Pending" },
    { name: "Success" },
    { name: "Failed" },
  ];
  const type = [
    { name: "Nip Transfer" },
    { name: "Instant Transfer" },
    { name: "Savings" },
  ];
  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(currentDate);
  const [transactionType, setTransactionType] = useState([]);
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
    setTransactionType([]);
    setStartDate(currentDateFormat);
    setEndDate(currentDateFormat);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: ".5rem 20px",
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
            {filtered ? `${productLength} ` : ""} Filter
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
              <FormGroup className="mt-3">
                <Label for="type">Transaction Type</Label>
                <Multiselect
                  className="forget_pass_select"
                  options={type}
                  showCheckbox={true}
                  showArrow={true}
                  displayValue="name"
                  placeholder="All"
                  onSelect={(e) => Change(e, setTransactionType)}
                  onRemove={(e) => Change(e, setTransactionType)}
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
                    filter({ transactionType, status, startDate, endDate });
                    clearState();
                    setDropdownOPen(false);
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
                    filter({ transactionType, status, startDate, endDate });
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
        <Search data={options} SearchFilter={SearchFilter} />
      </div>
      <ExportCSVButton
        className="btn-add btn btn-primary btn-export"
        {...csvData}
      >
        <img src={file} className="mr-1" alt="an icon" />
        Export as CSV
      </ExportCSVButton>
    </div>
  );
};

export default Header;
