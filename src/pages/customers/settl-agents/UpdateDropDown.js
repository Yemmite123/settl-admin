import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import DropdownItem from "reactstrap/lib/DropdownItem";
import UpdateAccountInformationDialog from "../UpdateAccountInformationDialog";

export default function UpdateDropDown() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [accountInformation, setAccountInformation] = useState(false);

    const toggleFilter = () => setDropdownOpen(prevState => !prevState);
    const toggleAccountInformation = () => setAccountInformation(!accountInformation);

    return(
        <>
            <Dropdown 
                isOpen={dropdownOpen} 
                toggle={toggleFilter} 
                className="more-dropdown"
                id="update-dropdown"
            >
                <DropdownToggle 
                    caret 
                    color="primary"
                    className="btn-add"
                >
                    Update
                </DropdownToggle>
                <DropdownMenu className="filter-dropdown-menu">
                    <DropdownItem onClick={() => setAccountInformation(true)}>Account Information</DropdownItem>
                    <DropdownItem>KYC Document</DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <UpdateAccountInformationDialog
                isOpen={accountInformation}
                toggle={toggleAccountInformation}
            />
        </>
    );
}
