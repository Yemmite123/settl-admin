import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import DropdownItem from "reactstrap/lib/DropdownItem";
import UpdateNextOfKinDialog from "./UpdateNextOfKinDialog";
import UpdateAccountInformationDialog from "../UpdateAccountInformationDialog";

export default function UpdateDropDown({ data, setShowDetails, setTableData }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [accountInformation, setAccountInformation] = useState(false);
  const [nextOfKinInformation, setNextOfKiInformation] = useState(false);

  const toggleFilter = () => setDropdownOpen((prevState) => !prevState);
  const toggleAccountInformation = () =>
    setAccountInformation(!accountInformation);
  const toggleNextOfKinInformation = () =>
    setNextOfKiInformation(!nextOfKinInformation);

  return (
    <>
      <Dropdown
        isOpen={dropdownOpen}
        toggle={toggleFilter}
        className="more-dropdown"
        id="update-dropdown"
      >
        <DropdownToggle caret color="primary" className="btn-add">
          Update
        </DropdownToggle>
        <DropdownMenu className="filter-dropdown-menu">
          <DropdownItem onClick={() => setAccountInformation(true)}>
            Account Information
          </DropdownItem>
          <DropdownItem>KYC Document</DropdownItem>
          <DropdownItem onClick={() => setNextOfKiInformation(true)}>
            Next of Kin Information
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <UpdateAccountInformationDialog
        isOpen={accountInformation}
        toggle={toggleAccountInformation}
        data={data}
        setShowDetails={setShowDetails}
        setTableData={setTableData}
      />

      <UpdateNextOfKinDialog
        isOpen={nextOfKinInformation}
        toggle={toggleNextOfKinInformation}
        data={data}
        setShowDetails={setShowDetails}
      />
    </>
  );
}
