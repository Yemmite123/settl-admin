import React, { useState } from "react";
import Filter from "./Filter";
import { Button } from "reactstrap";
import Table from "./Table";
import ReconcileTransaction from "./ReconcileTransaction";
import SuccessModal from "./SuccessModal";

const Reconciliation = () => {
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [detail, setDetail] = useState({
    service: null,
    bank: null,
    duration: null,
  });
  return (
    <>
      {!showForm ? (
        <>
          <div className="bg_absolute d-flex justify-content-between py-3">
            <Filter />
            <Button
              color="primary"
              className="btn-add"
              onClick={() => setShowForm(true)}
            >
              Reconcile Transaction
            </Button>
          </div>
          <div className="py-5">
            <Table setShowForm={setShowForm} setDetail={setDetail} />
          </div>
        </>
      ) : (
        <ReconcileTransaction
          setShow={setShowForm}
          setSuccess={setShowSuccess}
          detail={detail}
          setDetail={setDetail}
        />
      )}
      <SuccessModal show={showSuccess} setShow={setShowSuccess} />
    </>
  );
};

export default Reconciliation;
