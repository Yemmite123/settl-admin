import React, {useState} from 'react';
import { connect } from "react-redux";
import { Auth } from "../../requests/auth";
import { ReactComponent as DangerIcon } from "../../assets/img/icons/danger.svg";
import { setChangePassword } from '../../redux/actions/userAction';
import PasswordStrengthMeter from '../../components/Auth/PasswordStrengthMeter';
import PasswordChanged from "../../pages/auth/PasswordChanged"
import "./ResetPassword.css";
import Loading from "../../components/Loading";
import usePasswordToggle from '../../Hooks/usePasswordToggle';
import logo from "../../assets/img/logo/Settl logo.svg";
import appStore from "../../assets/img/logo/App Store.svg";
import googleStore from "../../assets/img/logo/Google Store.svg";
import settlScreenshot from "../../assets/img/screenshots/settl_screenshot.svg";
import { TabContent, TabPane } from "reactstrap";


const Login = ({setChangePassword, email}) => {
  const [PasswordInutType,  ToggleIcon] = usePasswordToggle();
  const [ConfirmPasswordInutType,  ConfirmToggleIcon] = usePasswordToggle();
  const [OldPasswordInputType, OldPasswordIcon] = usePasswordToggle();
  const [oldPassword, setOldPassword] = useState('')
  const [password,  setPassword] = useState('');
  const [confirmPassword,  setConfirmPassword] = useState('');
  const [loading, setIsLaoding] = useState(false)
  const [activeTab, setActiveTab] = useState("1")
  // const error = errorHandling()
  const [error, setError] = useState(null);
  const match = null;

  const handleSubmit = async (e) => {
    e.preventDefault();
      setIsLaoding(true)
      const response =  await Auth("admin/changepassword", {email, oldPassword, password, confirmPassword});
       if(response.code === "00"){
         setChangePassword(response.data)
         setActiveTab("2")
         setIsLaoding(false)
       }else {
            setError(response)
       }
      
    
  }

    return (
      <div id="auth_bgold" className="container-fluid">
      <div id="login_section" className="container">
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
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
            
              <div className="col-md-6 login_screen">
                <form onSubmit={handleSubmit}>
                  <div className="text-center login_screen_input">
                    <img src={logo} alt="settl Logo"/>
                      <div className="reset_password_header"> 
                      <h1>Reset Password</h1>
                      <p>For proper security we require a minimum of 8 characters with at least 1 uppercase, 1 lowercase, and 1 digit.</p>
                      {error && (
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
                         {error}
                      </span>
                    </div>
                  </div>
                )}
                      <fieldset className="reset_password_label">
                      <input 
                          name="oldPassword" 
                          autoComplete="off" 
                          type={OldPasswordInputType} 
                          className="form-control shadow-none" 
                          required
                          onChange={e => setOldPassword(e.target.value)}
                      />
                      <label 
                        htmlFor="old_password"
                      >
                        Old password
                      </label>
                      <span className="reset_password_toggle_icon">
                        { OldPasswordIcon }
                      </span>
                      </fieldset>
                      <fieldset className="reset_password_label">
                      <input 
                          name="password" 
                          autoComplete="off" 
                          type={PasswordInutType} 
                          className="form-control shadow-none" 
                          required
                          onChange={e => setPassword(e.target.value)}
                      />
                      <label 
                        htmlFor="new_password"
                      >
                        New password
                      </label>
                      <span className="reset_password_toggle_icon">
                        { ToggleIcon }
                      </span>
                      </fieldset>
                      {/* <PasswordStrengthBar password={password} /> */}
                        {/* <PasswordStrengthMeter password={password}/> */}
                      <fieldset className="reset_password_label">
                      <input 
                          name="confirmPassword" 
                          autoComplete="off" 
                          type={ConfirmPasswordInutType} 
                          className="form-control shadow-none" 
                          required
                          value={confirmPassword}
                          onChange={e => setConfirmPassword(e.target.value)}
                      />
                      <label 
                       htmlFor="Confirm_password"
                      >
                        Confirm password 
                      </label>
                      <span className="reset_password_toggle_icon">{ ConfirmToggleIcon }</span>
                      </fieldset>
                  </div>
                      <PasswordStrengthMeter password={password} />
                       <button type="submit" className="btn reset_password_btn" disabled={loading}>{loading ? <Loading /> :"Reset Password"}</button>
                      
                  </div>
                </form>
              </div>
              
          </div>
          </TabPane>
          <TabPane tabId="2">
                   <PasswordChanged />
          </TabPane>
        </TabContent>
         
      </div>
  </div>
)
}

const mapStateToProps = (state) => ({
  email: state.user?.details?.admin?.email
})

const mapDispatchToProps = (dispatch) => ({
  setChangePassword: (body) => dispatch(setChangePassword(body))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
