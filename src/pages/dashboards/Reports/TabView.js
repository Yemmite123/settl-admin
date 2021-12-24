import React from "react";

import Table from "./table";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Calendar } from "react-feather";
import Statistics from "./Statistics";
import { RefreshButton } from "../../../components/RefreshButton";
const TabView = ({
  title,
  clicked,
  index,
  setIndex,
  number,
  analysis,
  setTransRef,
  filterText,
  updateDays,
  refresh,
}) => (
  <>
    <div
      style={{
        padding: "3rem 0 1rem 0 ",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <p
          style={{
            fontSize: "18px",
            color: "#304762",
          }}
        >
          {title} Transaction Analytics
        </p>
        <div>
          <RefreshButton next={refresh} />
          <UncontrolledDropdown className="d-inline filter-dropdown">
            <DropdownToggle
              caret
              color="light"
              className="shadow-sm"
              style={{
                backgroundColor: "white",
              }}
            >
              <Calendar className="feather align-middle mt-n1" /> {filterText}
            </DropdownToggle>
            <DropdownMenu
              right
              style={{
                top: "25px",
              }}
            >
              <DropdownItem onClick={() => updateDays(1, 0)}>
                Today
              </DropdownItem>
              <DropdownItem onClick={() => updateDays(7, 1)}>
                Last 7 Days
              </DropdownItem>
              <DropdownItem onClick={() => updateDays(30, 2)}>
                Last 30 Days
              </DropdownItem>
              <DropdownItem onClick={() => updateDays(90, 3)}>
                Last 90 Days
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Customize</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>

      <Statistics data={analysis} />
    </div>
    <div
      style={{
        marginTop: "1rem",
      }}
    >
      <Table
        title={title}
        clicked={clicked}
        index={index}
        setIndex={setIndex}
        number={number}
        productsData={analysis?.listTransReport}
        setTransRef={setTransRef}
      />
    </div>
  </>
);
export default TabView;
