import React, { useState } from "react";
import { Search } from 'react-bootstrap-table2-toolkit';
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

const { SearchBar } = Search;

const transactionType = [
    { name: "Transfer" },
    { name: "Withdrawal" },
    { name: "Bill Payment" },
]
const referralStatus = [
    { name: "Active" },
    { name: "Resolved" },
    { name: "Unresolved" },
];

export default function IssueLogTableHeader({filter, search, filtered, dataLength}) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleFilter = () => setDropdownOpen(prevState => !prevState);
    const [status, setStatus] = useState([]);
    const [type, setType] = useState([]);

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
    }

    return(
        <>
            <Row className="px-3 py-2 my-1">
                <Col md={12}>
                    <Form className="admin-form">
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
                                        <FormGroup>
                                            <Label for="transactionType">Transaction Type</Label>
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
                                                options={referralStatus}
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
                                                        filter({ type, status });
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
                                                        filter({ type, status });
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
        </>
    );
}
