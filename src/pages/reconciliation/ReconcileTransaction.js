import React, { useState, useEffect } from "react";
import { Card, Form, FormGroup, Input, Label, Button } from "reactstrap";
import { Multiselect } from "multiselect-react-dropdown";
import ReconciliationReport from "./ReconciliationReport";
import { Link } from "react-router-dom";
import Request from "./request";

const durations = [
  {
    name: (
      <div>
        <p>LAST 28 DAYS</p>
        <p>Dec 04, 2019 - Feb 04 2020</p>
      </div>
    ),
    disable: true,
  },
  { name: "Today" },
  { name: "Last 7 days" },
  { name: "Last 90 days" },
  { name: "Customize" },
];
const ReconcileTransaction = ({ setShow, setSuccess, detail, setDetail }) => {
  const { activities } = Request();
  const [showReport, setShowReport] = useState(false);
  const [service, setService] = useState(detail.service);
  const [bank, setBank] = useState(detail.bank);
  const [duration, setDuration] = useState(detail.duration);

  const [serviceTypes, setServiceTypes] = useState([]);
  const [banks, setBanks] = useState([]);

  const fetchData = async () => {
    const response = await activities();
    if (response.code === "00") {
      setServiceTypes(
        response?.data?.listOfTransServices?.map((service) => ({
          name: service.description,
        }))
      );
      setBanks(
        response?.data?.listOfBanks?.map((bank) => ({ name: bank.description }))
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Link
        to="/reconciliation"
        className="back"
        onClick={() => {
          setDetail({
            service: null,
            bank: null,
            duration: null,
          });
          setShow(false);
        }}
      >
        {"< "} Back
      </Link>

      <div className="relative">
        <Card
          className="p-4"
          style={{
            border: "1px solid #ECF3FC",
            height: "612px",
            position: "relative",
            margin: "0 auto",
            width: "618px",
          }}
        >
          <h6>Reconcile Transaction</h6>
          <Form className="message-form mt-4">
            <FormGroup>
              <Multiselect
                className="forget_pass_select"
                options={serviceTypes}
                showCheckbox={false}
                showArrow={true}
                displayValue="name"
                placeholder="Select Service"
                singleSelect={true}
                onSelect={(e) => setService(e[0].name)}
                defaultValue={service}
              />
            </FormGroup>
            {service && (
              <FormGroup>
                <Multiselect
                  className="forget_pass_select"
                  options={banks}
                  showCheckbox={false}
                  showArrow={true}
                  displayValue="name"
                  placeholder="Select Bank"
                  singleSelect={true}
                  onSelect={(e) => setBank(e[0].name)}
                />
              </FormGroup>
            )}
            {bank && (
              <FormGroup>
                <Multiselect
                  className="forget_pass_select"
                  options={durations}
                  showCheckbox={false}
                  showArrow={true}
                  displayValue="name"
                  placeholder="Duration"
                  singleSelect={true}
                  onSelect={(e) => setDuration(e[0].name)}
                  isOptionDisabled={(option) => option.disable}
                />
              </FormGroup>
            )}
            {duration && (
              <FormGroup className="upload">
                <div>
                  <Label htmlFor="customerTemplate"> Bank Statement</Label>
                  <Input
                    type="file"
                    id="customerTemplate"
                    accept=".png, .jpg, .pdf, .csv"
                  />
                </div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "rgba(0, 0, 0, 0.6049)",
                    margin: "10px 0",
                    fontWeight: "normal",
                  }}
                >
                  Note: Max file size should be 20MB.
                </p>
              </FormGroup>
            )}
          </Form>
          <div
            className="p-4"
            style={{
              position: "absolute",
              bottom: "10px",
              display: "flex",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(231, 231, 237, 0.6)",
              width: "100%",
              right: "0",
            }}
          >
            <Button className="button_white" onClick={() => setShow(false)}>
              Cancel
            </Button>
            <div>
              <span
                style={{
                  color: "#4F1699",
                  margin: "0 20px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSuccess(true);
                  setShow(false);
                }}
              >
                Save Data
              </span>
              <Button
                className="button_approve"
                onClick={() => setShowReport(true)}
              >
                Reconcile
              </Button>
            </div>
          </div>
        </Card>
      </div>
      <ReconciliationReport show={showReport} setShow={setShowReport} />
    </>
  );
};

export default ReconcileTransaction;
