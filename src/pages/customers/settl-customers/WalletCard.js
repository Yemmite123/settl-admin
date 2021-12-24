import React from "react";
import { Row, Col } from "reactstrap";
import upArrow from "../../../assets/img/icons/uparrow.svg";
import transaction from "./../../../assets/img/icons/transaction-icon.svg";

export default function WalletCard({ walletData }) {
  const data = [
    {
      id: 1,
      title: "Total Value of Wallet Transactions",
      value: walletData.transVol,
      percentage: `(+${walletData.percentTransValue}%)`,
      img: <img src={transaction} alt="an icon" />,
    },
    {
      id: 2,
      title: "Total Volume of Wallet Transactions",
      value: walletData.transValue,
      percentage: `(+${walletData.percentTransVol}%)`,
      img: <img src={transaction} alt="an icon" />,
    },
  ];

  return (
    <>
      <div className="container-fluid text-left mb-3">
        <Row style={{ marginRight: "-25px" }}>
          {data.map((datum) => (
            <Col md={6} lg={6} sm={6} xs={6} className="pl-0" key={datum.id}>
              <div className="transaction_analysis_section">
                <div className="transaction_volume">
                  <h6>{datum.title}</h6>
                  <p>
                    {datum.value} &nbsp;
                    <span>
                      {datum.percentage}
                      <img
                        className="img-fluid ml-1"
                        src={upArrow}
                        alt="uparrow"
                      />
                    </span>
                  </p>
                  <div className="text-right">{datum.img}</div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}
