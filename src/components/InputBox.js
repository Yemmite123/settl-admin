import React from "react";
import { Input } from "reactstrap";


export default function InputBox(props){
    const {type, name, id, value, onChange, rows, placeholder, disabled} = props;
    return(
        <>
            <Input 
                type={type} 
                name={name}
                id={id}
                value={value}
                rows={rows}
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
                required
            >
                {props.children}
            </Input>
        </>
    );
}