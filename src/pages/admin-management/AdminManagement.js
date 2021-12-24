import React, { useState } from "react";
import {
    Col,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Row,
} from "reactstrap";
import { Search } from "react-feather";
import Grid from "./../../assets/img/icons/grid.svg";
import GridActive from "./../../assets/img/icons/grid-active.svg";
import List from "./../../assets/img/icons/list.svg";
import ListActive from "./../../assets/img/icons/list-active.svg";
import AdminTable from "./AdminTable";
import AddNewAdmin from "./AddAdminModal";
import AdminList from "./AdminList";
import { APIContextProvider } from "../../contexts/AdminContext";

export default function AdminManagement() {
    const [viewType, setViewType] = useState("list");
    const [filterText, setFilterText] = useState("");

    return(
        <>
            <APIContextProvider>
                <section className="admin-management">
                    <div className="admin-header">
                        <Row className="align-items-center">
                            <Col md="7">
                                <Form className="admin-form inline">
                                    <FormGroup check className="pr-3 viewtype">
                                        <Label check>
                                            <Input 
                                                type="radio" 
                                                name="viewType"
                                                checked={viewType === "list"}
                                                value="list"
                                                onChange={(e) => setViewType(e.target.value)}
                                            />{' '}
                                            {
                                                viewType === "list" 
                                                ? <img src={ListActive} alt="an icon"/>
                                                : <img src={List} alt="an icon"/>
                                            }
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check className="pr-3 py-2 mr-3 viewtype">
                                        <Label check>
                                            <Input 
                                                type="radio" 
                                                name="viewType" 
                                                value="grid"
                                                onChange={(e) => setViewType(e.target.value)}
                                            />{' '}
                                            {
                                                viewType === "grid" 
                                                ? <img src={GridActive} alt="an icon"/>
                                                : <img src={Grid} alt="an icon"/>
                                            }
                                        </Label>
                                    </FormGroup>
                                    <InputGroup className="search-group">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <Search />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder="Search"
                                            onChange={(e) => setFilterText(e.target.value)}
                                        />
                                    </InputGroup>
                                </Form>
                            </Col>
                            <Col md="5">
                                <AddNewAdmin />
                            </Col>
                        </Row>
                    </div>
                    <div className="admin-body">
                        <div className="all-admins pb-2">
                        <h6>All Admins</h6>
                        {viewType === "list" ? (
                            <AdminTable filterText={filterText} />
                        ) : (
                            <AdminList filterText={filterText} />
                        )}
                        </div>
                    </div>
                </section>
            </APIContextProvider>
        </>
    );
}
