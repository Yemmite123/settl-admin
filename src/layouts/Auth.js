import React from "react";

import { Col, Container, Row } from "reactstrap";

import Main from "../components/Main";
import Settings from "../components/Settings";

const Auth = ({ children }) => (
  <React.Fragment>
    <div id="auth_bg" className="container-fluid">
    <Main  className="d-flex w-100 justify-content-center">
      <Container id="" className="d-flex flex-column">
        <Row id="" className="h-100">
          <Col sm="12" md="12" lg="12" className="mx-auto d-table h-100">
            <div className="d-table-cell align-middle">{children}</div>
          </Col>
        </Row>
      </Container>
    </Main>
    </div>
    <Settings />
  </React.Fragment>
);

export default Auth;
