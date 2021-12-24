import React, { useState } from "react";
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
} from "reactstrap";

const messageStatus = [
    { name: "Failed" },
    { name: "Sent" },
    { name: "Draft" }
];

export default function MessageTableHeader({filter, filtered, dataLength}) {
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
            <div className="admin-header">
                <div className="d-flex align-items-center justify-content-between">
                    <Row>
                        <Col md={12} className="pl-2">
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
                                                        options={messageStatus}
                                                        showCheckbox={true}
                                                        showArrow={true}
                                                        displayValue="name"
                                                        placeholder="Select"
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
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
}
