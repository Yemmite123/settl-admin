import React from "react";
import upArrow from "../../../assets/img/icons/uparrow.svg";

export default function StatisticsCard(props) {
    return(
        <>
            <div className="transaction_volume">
                <h6>{props.title}</h6>
                <p>
                    {props.value} &nbsp;
                    <span>
                        {props.percentage}  
                        <img className="img-fluid" src={upArrow} alt="uparrow"/>
                    </span> 
                </p>
                <p className="subtitle">{props.subtitle}</p>
            </div>
        </>
    );
}
