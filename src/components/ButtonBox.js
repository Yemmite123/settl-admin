import React from "react";

import { Button } from "reactstrap";

export default function ButtonBox(props) {
    const {name, disabled, onClick} = props;

    const style = {
        border: "1px solid #4F1699",
        background: "#4F1699", 
        fontSize: "15px",
        lineHeight: "18px",
        letterSpacing: "0.3px",
        width: "100%",
        padding: "15px"
    }

    return(
        <>
            <Button 
                color="primary" 
                className="btn-add" 
                onClick={onClick}
                style={style}
                disabled={disabled}
                type={props.type}
            >
                {name}
            </Button>{' '}
        </>
    );
}