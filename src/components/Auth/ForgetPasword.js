import React, { Component } from "react";
import { Modal, ModalBody } from "reactstrap";
import "./ForgetPasword.scss";
import Loading from "../../components/Loading";
import { Auth } from "../../requests/auth"
import { connect } from "react-redux";
import { ReactComponent as DangerIcon } from "../../assets/img/icons/danger.svg";
import { ReactComponent as Close } from "../../assets/img/icons/close.svg";
import { TabContent, TabPane } from "reactstrap";
import OtpInput from "react-otp-input";
import SuccessDialog from "../../pages/SuccessDialog";
import FailureDialog from "../../pages/FailureDialog";
class ForgetPassword extends Component {
  constructor(props) {
      super(props);
      this.state = {
        modal: false,
        activeTab: "1",
        value: "",
        email: "",
        loading: false,
        toggleBtn:  false,
        isOpenModal:  false,
        error:null,
        emailError: null,
        secondActiveTab: "3"
        
      };

  }
 
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      activeTab: "1",
    });
  };

 toggleModal = () => {
   this.setState({
   isOpenModal: !this.state.isOpenModal,

  })
}


  handleSubmit = async (e) => {
    e.preventDefault();
   
   
    this.setState({loading: true})
   const response = await Auth("send/otp", {email: this.state.email, otpType: 3});

   if(response.code === "00") {
     this.setState({ activeTab: "2" })
     this.setState({isOpenModal: true})
     this.setState({loading: false})

   }else{
     this.setState({loading: false})
     this.setState({emailError:response})
   }
  }

  verifyOTP = async (e) => {
     e.preventDefault();
     
     this.setState({loading: true})
     const response = await Auth("verify/otp", {email: this.state.email, otpNumber:this.state.value, phone:this.props.phone});
     if(response.code === "00") {
      window.location.pathname = "/auth/set-new-password"
      window.localStorage.setItem("emailAdress", this.state.email)
      window.localStorage.setItem("otp",this.state.value )
      this.props.setUserDetails({ otpNumber:this.state.value})
      this.setState({loading: false})
    }else{
      this.setState({error:response})
    }
  }

  render() {
    const {loading} = this.state
    return (
      <div>
        <span
          className="forget_login"
          onClick={this.toggle}
          style={{ cursor: "pointer" }}
        >
          Forget pasword?
        </span>
        <Modal
          id="modal_section"
          isOpen={this.state.modal}
          toggle={this.toggle}
          size="lg"
          centered
        >
          <Close
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              cursor: "pointer",

            }}
            onClick={this.toggle}
          />

          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <div>
                <div
                  data-test="modal-header"
                  id="close"
                  className="modal-header"
                >
                  <h4 className="modal-title">
                    <div className="text-center forget_pass_title">
                      <h1>Forgot Password</h1>
                    </div>
                  </h4>
                </div>
              </div>
              <ModalBody>
                <div className="well">
                  <p>
                  Provide your admin email address, an OTP will be sent for verification
                  </p>
                  {this.state.emailError && (
                      <div className="d-flex justify-content-center align-items-center mt-3">
                       <div
                      className="d-flex justify-content-center align-items-center"
                      style={{
                        backgroundColor: "green",
                        padding: "0.5rem",
                        backgroundColor: "#ffc7ca",
                        borderRadius: "10px",
                        border: "1px solid #fc5159",
                      }}
                    >
                      <DangerIcon />
                      <span style={{ color: "#fc5159", marginLeft: "0.5rem" }}>
                         {this.state.email  === ""? "Please enter a valid email address": this.state.emailError }
                      </span>
                    </div>
                  </div>
                )}
                  
                  <fieldset className="float-label">
                    <input
                      name="Email address"
                      autoComplete="off"
                      type="text"
                      className="form-control shadow-none"
                      required
                      onChange={(e) => this.setState({email: e.target.value})}
                    />
                    <label htmlFor="Email_address">Email address</label>
                  </fieldset>
                
                  
                </div>
              </ModalBody>
              <div
                className=""
                style={{
                  margin: "1rem",
                }}
              >
                <button
                  type="submit"
                  className="forget-password"
                  disabled={loading}
                  onClick = {this.handleSubmit}
                >
                  {loading ? <Loading /> : "Continue"}
                </button>
              
              </div>
            </TabPane>
          
            <TabPane tabId="2"> 
            <SuccessDialog title="OTP code sent" details="Check your email, we’ve sent you a code to reset your password" isOpen={this.state.isOpenModal} 
            toggle={this.toggleModal}/>
            {
              this.state.error && (
                <FailureDialog
                isOpen={this.state.isOpenModal} 
                toggle={this.toggleModal}
                title="Invalid OTP code"
                details={this.state.error.message}
      />
              )
            }
            
              <div>
              
                <div
                  data-test="modal-header"
                  id="close"
                  className="modal-header"
                >
                  <h4 className="modal-title">
                    <div className="text-center forget_pass_title">
                      <h1>OTP Verification</h1>
                    </div>
                  </h4>
                </div>
              </div>
              <ModalBody>
                <div className="well">
                  <p>Enter the otp code sent to</p>
                  <p style={{fontSize: "17px", fontWeight: "500"}}>{this.state.email}</p>
                
                  <div className="d-flex justify-content-center">
                    <OtpInput
                      shouldAutoFocus
                      className="otp_sty"
                      numInputs={6}
                      value={this.state.value}
                      otpType="password"
                      disabled={false}
                      secure={true}
                      onChange={(e) => this.setState({ value: e})}
                      separator={<span>{"  "}</span>}
                      isInputSecure
                    />
                  </div>
                
                </div>
              </ModalBody>
              <div
                className=""
                style={{
                  margin: "1rem",
                }}
              >
                <button type="submit" className="forget-password" onClick={this.verifyOTP}>
                  {loading ? <Loading /> : "Continue"}
                </button>
              </div>
            </TabPane>
          </TabContent>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  phone: state.user?.details?.admin?.phoneNumber
})



export default connect(mapStateToProps, null)(ForgetPassword)
