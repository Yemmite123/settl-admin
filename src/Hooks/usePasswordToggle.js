import React, { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

import { MDBIcon } from "mdbreact";

const usePasswordToggle = () => {

    const [visible, setvisibility] = useState(false);

    const Icon = (
    <MDBIcon 
      icon={visible ? "eye-slash" : "eye"} 
      onClick={() => setvisibility(visibility => !visibility)}
    />
    );

    const inputType = visible ? "text" : "password";
    
    return [inputType, Icon];
};

export default usePasswordToggle;
