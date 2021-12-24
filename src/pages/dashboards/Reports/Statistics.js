import React from "react";
import upArrow from "../../../assets/img/icons/uparrow.svg";
import downArrow from "../../../assets/img/icons/downarrow.svg";

const Statistics = ({ data }) => (
  <div class="container-fluid">
    <div class="row row-cols-4  transaction_analysis_section">
      <div class="col col_border_right">
        <div className="transaction_volume">
          <h4>Total Transaction Volume</h4>
          <p>
            {data?.totalTransVol}
            <span>
              {parseInt(data?.transVolPercent) >= 0 ? (
                <>
                  +{data?.transVolPercent} %{" "}
                  <img className="img-fluid" src={upArrow} alt="uparrow" />
                </>
              ) : (
                <>
                  <span className="text-danger"> {data?.transVolPercent} %</span>{" "}
                  <img className="img-fluid" src={downArrow} alt="uparrow" />
                </>
              )}
            </span>{" "}
          </p>
          <p className="time">Analytics for last 30 days</p>
        </div>
      </div>
      <div class="col col_border_right">
        <div className="transaction_volume">
          <h4>Total Transaction Value</h4>
          <p>
            {data?.totalTransValue}
            <span>
              {parseInt(data?.transValuePercent) >= 0 ? (
                <>
                  +{data?.transValuePercent} %{" "}
                  <img className="img-fluid" src={upArrow} alt="uparrow" />
                </>
              ) : (
                <>
                  <span className="text-danger"> {data?.transValuePercent} %</span>{" "}
                  <img className="img-fluid" src={downArrow} alt="uparrow" />
                </>
              )}
            </span>{" "}
          </p>
          <p className="time">Analytics for last 30 days</p>
        </div>
      </div>
      <div class="col col_border_right">
        <div className="transaction_volume">
          <h4> Pending Transaction</h4>
          <p>
            {data?.pendingTrans}
            <span>
              {parseInt(data?.pendingTransPercent) >= 0 ? (
                <>
                  +{data?.pendingTransPercent} %{" "}
                  <img className="img-fluid" src={upArrow} alt="uparrow" />
                </>
              ) : (
                <>
                  <span className="text-danger"> {data?.pendingTransPercent} %</span>{" "}
                  <img className="img-fluid" src={downArrow} alt="uparrow" />
                </>
              )}
            </span>{" "}
          </p>
          <p className="time">Analytics for last 30 days</p>
        </div>
      </div>
      <div class="col">
        <div className="transaction_volume">
          <h4>Failed Transaction</h4>
          <p>
            {data?.failedTrans}
            <span>
              {parseInt(data?.failedTranspercent) >= 0 ? (
                <>
                  +{data?.failedTranspercent} %{" "}
                  <img className="img-fluid" src={upArrow} alt="uparrow" />
                </>
              ) : (
                <>
                  <span className="text-danger"> {data?.failedTranspercent} %</span>{" "}
                  <img className="img-fluid" src={downArrow} alt="uparrow" />
                </>
              )}
            </span>{" "}
          </p>
          <p className="time">Analytics for last 30 days</p>
        </div>
      </div>
    </div>
  </div>
);

export default Statistics;
