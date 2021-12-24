import React, { useState, useRef } from "react";
import {
  DropdownToggle,
  DropdownMenu,
  Dropdown,
  CardBody,
  Col,
  InputGroup,
  InputGroupAddon,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { ReactComponent as SearchIcon } from "../BgImages/search.svg";
import { ReactComponent as DropdownIcon } from "../assets/img/icons/dropdown.svg";
const Search = ({ data, SearchFilter }) => {
  const inputElem = useRef(null);

  const [filterDropdown, setFilterDropdown] = useState(false);
  const [selectDropdown, setSelectDropdown] = useState(false);
  const [select, setSelect] = useState("Select Filter");
  const [isfiltered, setIsFiltered] = useState(false);

  const [options, setOptions] = useState(data);
  const setDefault = () => {
    const copyOptions = [...options];
    for (let option of copyOptions) {
      option.checked = false;
    }
  };
  const selectOption = async (e) => {
    const copyOptions = [...options];
    setDefault();
    copyOptions[e.target.name].checked = true;
    setSelect(copyOptions[e.target.name].name);
    setOptions(copyOptions);
    setSelectDropdown(false);
    setIsFiltered(false);
  };
  const selectFilterOption = async () => {
    setSelectDropdown(false);
    await setIsFiltered(true);
    await setFilterDropdown(false);
    inputElem.current.focus();
  };
  const updateValue = (e) => {
    const { value } = e.target;
    SearchFilter({ name: select, value });
  };
  return (
    <Col lg="4">
      <Dropdown
        isOpen={filterDropdown}
        toggle={() => setFilterDropdown(!filterDropdown)}
        style={{
          outline: "none",
        }}
      >
        <DropdownToggle
          style={{
            backgroundColor: "white",
            border: "none",
          }}
        >
          <InputGroup
            style={{
              position: "relative",
              margin: 0,
            }}
          >
            <InputGroupAddon addonType="append" color="primary">
              <SearchIcon
                style={{
                  position: "absolute",
                  zIndex: "5",
                  left: "10px",
                  height: "100%",
                  // top: "4px",
                }}
              />
              {isfiltered && (
                <p
                  style={{
                    position: "absolute",
                    left: "40px",
                    zIndex: "6",
                    height: "100%",
                    color: "#92929D",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {select}:
                </p>
              )}

              <DropdownIcon
                style={{
                  position: "absolute",
                  right: "10px",
                  zIndex: "5",
                  height: "100%",
                  cursor: "pointer",
                }}
              />
            </InputGroupAddon>
            {!isfiltered ? (
              <Input
                placeholder="Search"
                value=""
                style={{
                  padding: `${
                    isfiltered ? "20px 35px 20px 150px" : "20px 35px"
                  }`,
                  borderRadius: "8px",
                  width: "400px",
                }}
              />
            ) : (
              <input
                ref={inputElem}
                onChange={updateValue}
                style={{
                  padding: `${
                    isfiltered ? "20px 35px 20px 150px" : "20px 35px"
                  }`,
                  borderRadius: "8px",
                  width: "400px",
                }}
              />
            )}
          </InputGroup>
        </DropdownToggle>
        <DropdownMenu
          style={{
            top: "40px",
            width: "400px",
            padding: "1rem",
            left: "10px",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <p>Search</p>
              <Dropdown
                isOpen={selectDropdown}
                toggle={() => setSelectDropdown(!selectDropdown)}
              >
                <DropdownToggle
                  style={{
                    backgroundColor: "#F1F1F5",
                    color: "#696974",
                    width: "300px",
                    border: "1px solid #E7E7ED",
                    textAlign: "left",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {select}
                  <DropdownIcon
                    style={{
                      position: "absolute",
                      right: "10px",
                      zIndex: "5",
                      height: "100%",
                      cursor: "pointer",
                    }}
                  />
                </DropdownToggle>
                <DropdownMenu
                  style={{
                    top: "30px",
                    width: "100%",
                  }}
                >
                  <FormGroup
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      paddingLeft: "2rem",
                    }}
                  >
                    {options.map((option, i) => (
                      <Label
                        check
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Input
                          type="checkbox"
                          name={i}
                          onClick={selectOption}
                          checked={option.checked}
                        />
                        <span>{option.name}</span>
                      </Label>
                    ))}
                  </FormGroup>
                </DropdownMenu>
              </Dropdown>
            </div>
            <CardBody
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <Button
                style={{
                  border: "1px solid grey",
                  backgroundColor: "white",
                  color: "black",
                  padding: "0.3rem 0.7rem",
                }}
                onClick={() => {
                  setDefault();
                  setSelect("Select Filter");
                  setFilterDropdown(false);
                  setIsFiltered(false);
                }}
              >
                Cancel
              </Button>
              <Button
                style={{
                  backgroundColor: "#4F1699",
                  padding: "0.3rem 1.2rem",
                }}
                onClick={selectFilterOption}
              >
                Filter
              </Button>
            </CardBody>
          </div>
        </DropdownMenu>
      </Dropdown>
    </Col>
  );
};
export default Search;
