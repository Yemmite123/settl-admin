import React, { useState } from "react";
import { 
    Dropdown, 
    DropdownToggle, 
    DropdownMenu, 
    DropdownItem,
} from "reactstrap";
import more from "../../../assets/img/icons/more.svg";

export default function TransactionMoreDropDown() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleFilter = () => setDropdownOpen(prevState => !prevState);

    return(
        <>
            <Dropdown 
                isOpen={dropdownOpen} 
                toggle={toggleFilter} 
                className="mr-3 more-dropdown wallet-more-dropdown"
                id="more-dropdown"
            >
                <DropdownToggle caret>
                    <img src={more} alt="an icon" />
                </DropdownToggle>
                <DropdownMenu className="filter-dropdown-menu">
                    <DropdownItem>Requery Transaction</DropdownItem>
                    <DropdownItem>View Agent Profile</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </>
    );
}
