import React, { useState } from "react";
import { connect } from "react-redux";
import { ReactComponent as Close } from "../../../BgImages/close.svg";
import { Modal, Button } from "react-bootstrap";
import { Input } from "reactstrap";
import walletRequest from "../../../requests/wallet-savings";
import SuccessDialog from "../../SuccessDialog";
const ReportsModal = ({ show, setShow, data, transId, userName, email, reload }) => {
  const [name, setName] = useState("Assurance Uwangue");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({
    state: "",
    message: "",
    status: ""
  });

  const closeError = () => {
    setError({
      state: false,
      message: "",
      status: "",
    });
  };

  const { refundAccount, reprocessTransaction } = walletRequest();
  
  const handleChange = (e, set) => {
    const { value } = e.target;
    set(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (data.title === "Refund Customer") {
      const response = await refundAccount({
        adminFullName: userName.split(" ")[0],
        adminEmail: email,
        reason: reason,
        transId: transId
      });
      if(response.code === "00") {
        console.log(response.data);
        setLoading(false);
        setShow(false);
        return true;
      }

      setError({
        state: true,
        status: response.status,
        message: response.message,
      });
    }

    if (data.title === "Reprocess Transaction") {
      const response = await reprocessTransaction({
        fullName: userName.split(" ")[0],
        adminEmail: email,
        reason: reason,
        transId: transId
      });
      if(response.code === "00") {
        console.log(response.data);
        setShow(false);
        return true;
      }

      setError({
        state: true,
        status: response.status,
        message: response.message,
      });
    }

    setLoading(false);
    return false;
  }

  return (
    <>
      <Modal
        show={show}
        centered
        onHide={() => setShow(false)}
        className="transaction-modal"
      >
        <div
          style={{
            display: "relative",
          }}
        >
          <h3
            style={{
              textAlign: "center",
              borderBottom: "1px solid rgba(231, 231, 237, 0.6)",
              padding: "1.5rem 0",
            }}
          >
            {data.title}
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
            display: "flex",
            flexDirection: "column",
            padding: "3rem 2rem",
            height: "100%",
            gap: "30px",
          }}
        >
          <p
            style={{
              textAlign: "center",
              margin: "0 auto",
              fontSize: "16px",
            }}
          >
            Please confirm this is the right customer account before initiating
            this process
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <fieldset
              className="float-label"
              style={{
                margin: "0",
              }}
            >
              <Input
                name="name"
                autoComplete="off"
                type="text"
                className="form-control shadow-none"
                value={name}
                style={{
                  margin: "0",
                }}
                onChange={(e) => handleChange(e, setName)}
                required
              />
              <label htmlFor="Full_Name">Admin Full Name</label>
            </fieldset>
            <Input
              type="textarea"
              className="form-control shadow-none"
              style={{
                backgroundColor: "#FAFAFA",
                resize: "none",
                height: "200px",
                padding: "20px",
              }}
              value={reason}
              onChange={(e) => handleChange(e, setReason)}
              placeholder={data.reason}
              required
            />
          </div>

          <Button
            onClick={handleClick}
            style={{
              backgroundColor: "#4F1699",
              padding: ".6rem 1.5rem",
              marginTop: "1rem",
            }}
          >
            {data.placeholder}
            {loading ? (
              <div className="spinner-border spinner-border-sm spinner text-white ml-2" role="status">
                <span className="sr-only">Loading...</span>
              </div>) : ("")
            }
          </Button>
        </div>
      </Modal>

      <SuccessDialog 
        isOpen={error.state}
        toggle={closeError}
        title={error.message}
        details={error.status}
      /> 
    </>
  );
};

const mapStateToProps = (state) => ({
  userName: state?.user?.details?.admin?.fullname,
  email: state?.user?.details?.admin?.email
});
export default connect(mapStateToProps)(ReportsModal);
