import React from 'react';
import {useState} from 'react';
import "./ResetPassword.css";
import logo from "../../assets/img/logo/Settl logo.svg";
import appStore from "../../assets/img/logo/App Store.svg";
import googleStore from "../../assets/img/logo/Google Store.svg";
import successPassword from "../../assets/img/icons/success-reset-password.svg";
import settlScreenshot from "../../assets/img/screenshots/settl_screenshot.svg";


const PasswordChanged = () => {
    
    const backToSignIn = () => {
        window.location.pathname = "/auth/sign-in"
    }
    
      return (
        <div id="auth_bgold" className="container-fluid">
        <div id="login_section" className="container">
            <div className="row">
                <div className="col-md-6">
                   <div className="auth_right">
                    <h1 className="text-center">Easy & Reliable <br/> Banking Platform</h1>
                    <div className="text-center">
                      <img src={settlScreenshot} alt="settl screenshot"/>
                    </div>
                    <div className="text-center downloadApps">
                        <img src={appStore} alt="App Store"/>
                        <img src={googleStore} alt="Google Store"/>
                    </div>
                   </div>
                </div>
                <div className="col-md-6 login_screen" style={{padding: "80px"}}>
                <div className="text-center mt-5">
                      <img src={logo} alt="settl screenshot"/>
                </div>
                <div className="text-center" style={{marginTop: "80px"}}>
                    <img src={successPassword} alt="verify-password" />
                </div>
                <div className="text-center mt-3">
                    <h3>Password Changed</h3>
                    <p style={{color:"#92929D", fontSize:"14px"}}>We have updated your password. You may now use it to log in to your account.</p>
                </div>
                <div style={{textAlign: "center"}}>
                    <button type="button" onClick={backToSignIn} style={{width: "370px", height: "50px", border: "none", borderRadius: "5px", color: "#ffff", backgroundColor: "#4F1699", marginTop: "35px"}}>
                        Back to Sign in
                    </button>
                </div>

                </div>
                
            </div>
        </div>
    </div>
  )
  }
  

  
  
  
  export default PasswordChanged 
