import React from "react";
import { Row, Col } from "reactstrap";
import upArrow from "../../../../assets/img/icons/uparrow.svg";
import transaction from "../../../../assets/img/icons/transaction-icon.svg";
import renewableEnergy from "../../../../assets/img/icons/renewable-energy.svg";
import subAgent from "../../../../assets/img/icons/sub-agents.svg"
import DoughnutChart from "./Doughnut";

const data = [
    {
        id: 1,
        title: "Transaction Value",
        value: "27,000",
        percentage: "(+2.5%)",
        arrow: <img className="img-fluid ml-1" src={upArrow} alt="uparrow"/>,
        img: <img src={transaction} alt="an icon" />
    },
    {
        id: 2,
        title: "Transaction Volume",
        value: "27,000",
        percentage: "(+2.5%)",
        arrow: <img className="img-fluid ml-1" src={upArrow} alt="uparrow"/>,
        img: <img src={renewableEnergy} alt="an icon" />
    },
    {
        id: 3,
        title: "Number of Sub-Agents",
        value: "4",
        percentage: "",
        arrow: "",
        img: <img src={subAgent} alt="an icon" />
    }
]

export default function SubAgentCard() {
    return(
        <>
            <div className="acquisitions-wrapper">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="col-lg-7">
                        <p className="mb-0">Here is how <span>Promise</span> Sub-agent acquisitions is looking like</p>
                    </div>
                    <div className="col-lg-5">
                        <DoughnutChart />
                    </div>
                </div>
                {/* <div className="text-left">
                    <p className="sub">18</p>
                    <span className="total">From 50</span>
                </div> */}
            </div>
            <div className="container-fluid text-left mb-3">
                <Row style={{marginRight: "-25px"}}>
                    {data.map((datum) => (
                        <Col md={4} lg={4} sm={6} xs={6} className="pl-0" key={datum.id}>
                            <div className="transaction_analysis_section">
                                <div className="transaction_volume">
                                    <h6>{datum.title}</h6>
                                    <p>
                                        {datum.value} &nbsp;
                                        <span>
                                            {datum.percentage}  
                                            {datum.arrow}
                                        </span> 
                                    </p>
                                    <div className="text-right">
                                        {datum.img}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    );
}
