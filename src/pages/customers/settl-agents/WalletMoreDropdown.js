import React, { useState } from "react";
import { 
    Dropdown, 
    DropdownToggle, 
    DropdownMenu, 
    DropdownItem,
} from "reactstrap";
import more from "../../../assets/img/icons/more.svg";
import CreditWalletDialog from "../CreditWalletDialog";
import DebitWalletDialog from "../DebitWalletDialog";

export default function WalletMoreDropDown() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [debitModal, setDebitModal] = useState(false);
    const [creditModal, setCreditModal] = useState(false);

    const toggleCreditModal = () => setCreditModal(!creditModal);
    const toggleDebitModal = () => setDebitModal(!debitModal);

    const toggleFilter = () => setDropdownOpen(prevState => !prevState);


    return(
        <>
            <Dropdown 
                isOpen={dropdownOpen} 
                toggle={toggleFilter} 
                className="mx-3 more-dropdown wallet-more-dropdown"
                id="more-dropdown"
            >
                <DropdownToggle caret>
                    <img src={more} alt="an icon" />
                </DropdownToggle>
                <DropdownMenu className="filter-dropdown-menu">
                    <DropdownItem onClick={() => setCreditModal(true)}>Credit Wallet</DropdownItem>
                    <DropdownItem onClick={() => setDebitModal(true)}>Debit Wallet</DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <CreditWalletDialog
                isOpen={creditModal}
                toggle={toggleCreditModal}
            />

            <DebitWalletDialog
                isOpen={debitModal}
                toggle={toggleDebitModal}
            />
        </>
    );
}
