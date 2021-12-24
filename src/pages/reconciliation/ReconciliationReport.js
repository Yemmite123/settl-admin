import React from "react";
import { Modal, Button } from "react-bootstrap";
import { ReactComponent as Close } from "../../BgImages/close.svg";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { CSVExport } from "react-bootstrap-table2-toolkit";

const { ExportCSVButton } = CSVExport;

const data = [
  {
    tid: "TID-R23456678",
    pin: "2289****7789",
    amount: "N70,000",
    rrn: "RRN- 45905959095490050504",
  },
  {
    tid: "TID-R23456678",
    pin: "2289****7789",
    amount: "N70,000",
    rrn: "RRN- 45905959095490050504",
  },
  {
    tid: "TID-R23456678",
    pin: "2289****7789",
    amount: "N70,000",
    rrn: "RRN- 45905959095490050504",
  },
];
const ReconciliationReport = ({ show, setShow }) => {
  const columns = [
    {
      dataField: "tid",
      text: "TID",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
      },
      style: () => ({
        padding: "20px 0",
      }),
    },
    {
      dataField: "pin",
      text: "Card PIN",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
      },
    },
    {
      dataField: "amount",
      text: "Amount",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
      },
    },
    {
      dataField: "rrn",
      text: "RRN",
      headerStyle: {
        backgroundColor: "#F8F9FA",
        border: "none",
        width: "250px",
      },
    },
  ];
  return (
    <ToolkitProvider
      keyField="tid"
      data={data}
      columns={columns}
      exportCSV={{
        fileName: "reconciliation report.csv",
      }}
    >
      {(props) => (
        <Modal
          show={show}
          toggle={() => setShow(false)}
          centered
          className="reconciliation-modal"
          size="lg"
        >
          <div className="position-relative">
            <h3
              style={{
                textAlign: "center",
                borderBottom: "1px solid rgba(231, 231, 237, 0.6)",
                padding: "1.5rem 0",
              }}
            >
              Reconciliation Report
            </h3>
            <Close
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                cursor: "pointer",
              }}
              onClick={() => setShow(false)}
            />
          </div>
          <div
            style={{
              backgroundColor: "#FBF8FF",
              width: "70%",
              padding: "1rem 2rem",
              borderRadius: "10px",
              margin: "20px auto",
            }}
          >
            <p
              style={{
                fontSize: "16px",
              }}
            >
              The 4 Transactions below are not reflecting in the bank statement
              for the requested period
            </p>
          </div>
          <div
            style={{
              maxWidth: "95%",
              margin: "20px auto",
            }}
          >
            <p>
              <span
                style={{
                  color: "#171725",
                  fontWeight: "600",
                }}
              >
                Report ID:
              </span>{" "}
              R23554542233456650004595490050504
            </p>
            <BootstrapTable {...props.baseProps} bootstrap4 bordered={false} />
          </div>
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

            <ExportCSVButton
              className="btn-add btn btn-primary btn-export"
              {...props.csvProps}
            >
              Download Report
            </ExportCSVButton>
          </div>
        </Modal>
      )}
    </ToolkitProvider>
  );
};

export default ReconciliationReport;
