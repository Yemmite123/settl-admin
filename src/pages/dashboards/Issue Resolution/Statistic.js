import React from "react";
import upArrow from "../../../assets/img/icons/uparrow.svg";
import downArrow from "../../../assets/img/icons/downarrow.svg";

const Statistics = ({ data }) => (
  <div class="container-fluid mb-5">
    <div class="row row-cols-4  transaction_analysis_section">
      <div class="col col_border_right">
        <div className="transaction_volume">
          <h4>Total Issues Reported</h4>
          <p>
            {data.totalIssueReport}
            <span>
              +{data.percentTotalReport}%{" "}
              <img className="img-fluid" src={upArrow} alt="uparrow" />
            </span>{" "}
          </p>
          <p className="time">Analytics for last 30 days</p>
        </div>
      </div>
      <div class="col col_border_right">
        <div className="transaction_volume">
          <h4>Total Issues Resolved</h4>
          <p>
            {data.totalIssueResolved}
            <span>
              +{data.percentIssueResolved}%{" "}
              <img className="img-fluid" src={upArrow} alt="uparrow" />
            </span>{" "}
          </p>
          <p className="time">Analytics for last 30 days</p>
        </div>
      </div>
      <div class="col col_border_right">
        <div className="transaction_volume">
          <h4> Total Pending Issues</h4>
          <p>
            {data.totalPendingIssues}
            <span>
              +{data.percentPendingIssues}%{" "}
              <img className="img-fluid" src={upArrow} alt="downarrow" />
            </span>{" "}
          </p>
          <p className="time">Analytics for last 30 days</p>
        </div>
      </div>
      <div class="col">
        <div className="transaction_volume">
          <h4>Issues in Progress</h4>
          <p>
            {data.totalInProgressIssues}
            <span>
              +{data.percentInProgressIssues}%{" "}
              <img className="img-fluid" src={upArrow} alt="uparrow" />
            </span>{" "}
          </p>
          <p className="time">Analytics for last 30 days</p>
        </div>
      </div>
    </div>
  </div>
);

export default Statistics;
