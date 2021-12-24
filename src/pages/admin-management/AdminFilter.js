import React, { useState } from "react";
import {
    Button,
    Dropdown,
    DropdownMenu,
    DropdownToggle,
    FormGroup,
    Label
} from "reactstrap";
import { Multiselect } from "multiselect-react-dropdown";

export default function AdminFilter({ filter, filtered, dataLength }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [status, setStatus] = useState([]);
    const [type, setType] = useState([]);

    const toggleFilter = () => setDropdownOpen(prevState => !prevState);

    const adminStatus = [
        { name: "Active", value: "True" },
        { name: "Deactivated", value: "False" }
    ];

    const adminType = [
        { name: "Super Admin", value: "SUPER_ADMIN" },
        { name: "Admin", value: "ADMIN" },
        { name: "Support", value: "SUPPORT" }
    ]

    const Change = (e, set) => {
        const array = [];
        for (let status in e) {
          array.push(e[status].value.toLowerCase());
        }
        set(array);
    };

    const clearState = () => {
        setStatus([]);
        setType([]);
    };

    return(
        <div className="admin-filter">
            <Dropdown isOpen={dropdownOpen} toggle={toggleFilter} className="mr-3 btn-filter">
                <DropdownToggle caret>
                    {filtered ? `${dataLength} ` : ""} Filter
                </DropdownToggle>
                <DropdownMenu className="filter-dropdown-menu">
                    <div className="form-block">
                        <FormGroup>
                            <Label for="status">Status</Label>
                            <Multiselect
                                className="forget_pass_select"
                                options={adminStatus}
                                showCheckbox={true}
                                showArrow={true}
                                displayValue="name"
                                placeholder="Select"
                                onSelect={(e) => Change(e, setStatus)}
                                onRemove={(e) => Change(e, setStatus)}
                            />
                        </FormGroup>
                        <FormGroup className="mt-3">
                            <Label for="adminType">Admin type</Label>
                            <Multiselect
                                className="forget_pass_select"
                                options={adminType}
                                showCheckbox={true}
                                showArrow={true}
                                displayValue="name"
                                placeholder="Select"
                                onSelect={(e) => Change(e, setType)}
                                onRemove={(e) => Change(e, setType)}
                            />
                        </FormGroup>
                        <div className="d-flex justify-content-between mt-5">
                            <div>
                                <Button 
                                    color="info" 
                                    className="btn-cancel" 
                                    onClick={() => {
                                        clearState();
                                        setDropdownOpen(false);
                                        filter({ status, type });
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
                                        filter({status, type});
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
    );
}