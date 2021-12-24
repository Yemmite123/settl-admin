import React from "react";
import { Button } from "reactstrap";

export default function ResetButton(props) {
    const style = {
        background: "#F4F7FF",
        borderRadius: "4px",
        fontWeight: "500",
        fontSize: "15px",
        letterSpacing: "0.3px",
        color: "#4F1699",
        padding: "10px 30px",
        border: 0
    }
    return(
        <>
            <Button 
                color="info"
                onClick={props.onClick}
                style={style}
                className={props.className}
            >
                {props.title}
            </Button>
        </>
    );
}
