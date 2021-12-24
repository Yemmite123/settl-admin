import React, { useState } from "react";
import { CSVExport, Search } from 'react-bootstrap-table2-toolkit';
import { Multiselect } from "multiselect-react-dropdown";
import { 
    Row, Col, 
    Dropdown, 
    DropdownMenu, 
    DropdownToggle,
    Form, 
    FormGroup,
    Label,
    Button,
    InputGroup,
    InputGroupAddon,
    InputGroupText 
} from "reactstrap";
import { Search as SearchIcon} from "react-feather";
import file from "../../../../assets/img/icons/file.svg";

const { ExportCSVButton } = CSVExport;
const { SearchBar } = Search;

const transactionStatus = [
    { name: "Active" },
    { name: "Inactive" },
];

export default function SubAgentTableHeader({csvData, filter, search, filtered, dataLength}) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleFilter = () => setDropdownOpen(prevState => !prevState);
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
    }

    return(
        <>
            <div className="d-flex export-flex align-items-center justify-content-between">
                <Row className="p-3">
                    <Col md={12}>
                        <Form className="admin-form filter-form">
                            <div className="d-flex">
                                <Dropdown isOpen={dropdownOpen} toggle={toggleFilter} className="mr-3 btn-filter">
                                    <DropdownToggle 
                                        caret
                                        style={{
                                            backgroundColor: `${
                                              filtered ? "rgba(195, 238, 212, 0.5)" : "#FAFAFA"
                                            }`
                                        }}
                                    >
                                        {filtered ? `${dataLength} ` : ""} Filter
                                    </DropdownToggle>
                                    <DropdownMenu className="filter-dropdown-menu">
                                        <div className="form-block">
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
                                            <div className="d-flex justify-content-between mt-5">
                                                <div>
                                                    <Button 
                                                        color="info" 
                                                        className="btn-cancel" 
                                                        onClick={() => {
                                                            setDropdownOpen(false);
                                                            clearState();
                                                            filter({ status });
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
                                                            filter({ status });
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
                                        <InputGroupText><SearchIcon/></InputGroupText>
                                    </InputGroupAddon>
                                    <SearchBar
                                        placeholder="Search Log"
                                        {...search}
                                    />
                                </InputGroup>
                            </div>
                        </Form>
                    </Col>
                </Row>
                <div className="ml-3">
                    <ExportCSVButton 
                        className="btn-add btn btn-primary btn-export"
                        { ...csvData }
                    >
                        <img src={file} className="mr-1" alt="an icon" />
                        Export as CSV
                    </ExportCSVButton>
                </div>
            </div>
        </>
    );
}
