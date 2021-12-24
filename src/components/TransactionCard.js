import React from "react";
import upArrow from "../assets/img/icons/uparrow.svg";
import downArrow from "../assets/img/icons/downarrow.svg";

const TransactionCard = ({ name, total_amount, percentage }) => (
  <div className="transaction_card">
    <div className="transaction_volume">
      <h4>{name}</h4>
      <p>
        {total_amount}
        {"     "}
        <span>
          {parseInt(percentage) >= 0 ? (
            <>
              +{percentage} %{" "}
              <img className="img-fluid" src={upArrow} alt="uparrow" />
            </>
          ) : (
            <>
              <span className="text-danger"> {percentage} %</span>{" "}
              <img className="img-fluid" src={downArrow} alt="uparrow" />
            </>
          )}
        </span>{" "}
      </p>
      <p className="time">Analytics for last 30 days</p>
    </div>
  </div>
);

export default TransactionCard;
