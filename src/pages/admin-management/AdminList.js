import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { useAPI } from "../../contexts/AdminContext";
import AdminCard from "./AdminCard";

export default function AdminList({ filterText }) {
  const { adminData } = useAPI();
  const [data, setData] = useState(adminData);

  useEffect(() => {
    setData(adminData);
  }, [adminData]);

  return (
    <>
      <div style={{ padding: "0 1rem" }}>
        <Row>
          {data
            .filter((d) => d.employeeName.toLowerCase().includes(filterText))
            .map((admin) => (
              <Col lg={3} md={3} sm={6} key={admin.id}>
                <AdminCard
                  name={admin.employeeName}
                  email={admin.emailAddress}
                  role={admin.adminRole}
                />
              </Col>
            ))}
        </Row>
        <Row>
          <Col md={4}>
            <div>
              <p style={{ color: "#637381" }}>Showing 9 of 290 results</p>
            </div>
          </Col>
          <Col md={4}>
            <Pagination aria-label="Page navigation example">
              <PaginationItem>
                <PaginationLink previous href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink next href="#" />
              </PaginationItem>
            </Pagination>
          </Col>
        </Row>
      </div>
    </>
  );
}
