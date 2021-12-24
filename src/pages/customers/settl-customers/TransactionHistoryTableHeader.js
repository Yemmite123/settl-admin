import React, { useState } from "react";
import { CSVExport, Search } from "react-bootstrap-table2-toolkit";
import { Multiselect } from "multiselect-react-dropdown";
import {
  Row,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Label,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { Search as SearchIcon } from "react-feather";
import DatePicker from "../../../components/DatePicker";
import file from "./../../../assets/img/icons/file.svg";

const { ExportCSVButton } = CSVExport;
const { SearchBar } = Search;

const transactionType = [{ name: "Credit" }, { name: "Debit" }];

const transactionStatus = [{ name: "Success" }, { name: "Failed" }];

export default function TransactionHistoryTableHeader({
  csvData,
  filter,
  search,
  filtered,
  dataLength,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleFilter = () => setDropdownOpen((prevState) => !prevState);
  const [status, setStatus] = useState([]);
  const [type, setType] = useState([]);

  const currentDate = new Date();
  const currentDateFormat = currentDate.setHours(0, 0, 0, 0);
  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(currentDate);

  const Change = (e, set) => {
    const array = [];
    for (let status in e) {
      array.push(e[status].name.toLowerCase());
    }
    set(array);
  };

  const clearState = () => {
    setStatus([]);
    setType([]);
    setStartDate(currentDateFormat);
    setEndDate(currentDateFormat);
  };

  return (
    <>
      <div className="d-flex export-flex align-items-center justify-content-between">
        <Row className="p-3">
          <Col md={12}>
            <Form className="admin-form filter-form">
              <div className="d-flex">
                <Dropdown
                  isOpen={dropdownOpen}
                  toggle={() => setDropdownOpen(true)}
                  className="mr-3 btn-filter"
                >
                  <DropdownToggle
                    caret
                    style={{
                      backgroundColor: `${
                        filtered ? "rgba(195, 238, 212, 0.5)" : "#FAFAFA"
                      }`,
                    }}
                  >
                    {filtered ? `${dataLength} ` : ""} Filter
                  </DropdownToggle>
                  <DropdownMenu className="filter-dropdown-menu">
                    <div className="form-block">
                      <FormGroup className="mt-3">
                        <Label for="status">Transaction Type</Label>
                        <Multiselect
                          className="forget_pass_select"
                          options={transactionType}
                          showCheckbox={true}
                          showArrow={true}
                          displayValue="name"
                          placeholder="All"
                          onSelect={(e) => Change(e, setType)}
                          onRemove={(e) => Change(e, setType)}
                        />
                      </FormGroup>
                      <FormGroup className="mt-3">
                        <Label for="status">Status</Label>
                        <Multiselect
                          className="forget_pass_select"
                          options={transactionStatus}
                          showCheckbox={true}
                          showArrow={true}
                          displayValue="name"
                          placeholder="All"
                          onSelect={(e) => Change(e, setStatus)}
                          onRemove={(e) => Change(e, setStatus)}
                        />
                      </FormGroup>
                      <DatePicker
                        date={startDate}
                        open={setDropdownOpen}
                        setDate={setStartDate}
                        name="Start Date"
                      />
                      <DatePicker
                        date={endDate}
                        open={setDropdownOpen}
                        setDate={setEndDate}
                        name="End Date"
                      />
                      <div className="d-flex justify-content-between mt-5">
                        <div>
                          <Button
                            color="info"
                            className="btn-cancel"
                            onClick={() => {
                              setDropdownOpen(false);
                              clearState();
                              filter({ status, type, startDate, endDate });
                            }}
                          >
                            Clear
                          </Button>
                        </div>
                        <div>
                          <Button
                            color="primary"
                            className="btn-add"
                            onClick={() => {
                              filter({ status, type, startDate, endDate });
                              setDropdownOpen(false);
                              clearState();
                            }}
                          >
                            Filter
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DropdownMenu>
                </Dropdown>
                <InputGroup className="search-group">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <SearchIcon />
                    </InputGroupText>
                  </InputGroupAddon>
                  <SearchBar placeholder="Search Log" {...search} />
                </InputGroup>
              </div>
            </Form>
          </Col>
        </Row>
        <div className="ml-3">
          <ExportCSVButton
            className="btn-add btn btn-primary btn-export px-3"
            {...csvData}
          >
            <img src={file} className="mr-1" alt="an icon" />
            Export as CSV
          </ExportCSVButton>
        </div>
      </div>
    </>
  );
}
