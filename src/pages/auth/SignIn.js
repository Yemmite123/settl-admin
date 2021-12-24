import React, { useState } from "react";
import { connect } from "react-redux";
import usePasswordToggle from "../../Hooks/usePasswordToggle";
import ForgetPassword from "../../components/Auth/ForgetPasword";
import Loading from "../../components/Loading";
import logo from "../../assets/img/logo/Settl logo.svg";
import { ReactComponent as DangerIcon } from "../../assets/img/icons/danger.svg";
import appStore from "../../assets/img/logo/App Store.svg";
import googleStore from "../../assets/img/logo/Google Store.svg";
import settlScreenshot from "../../assets/img/screenshots/settl_screenshot.svg";
import { useHistory } from "react-router-dom";
import { Auth } from "../../requests/auth";
import { setUserDetails } from "../../redux/actions/userAction";

const Login = ({ setUserDetails }) => {
  const [PasswordInutType, ToggleIcon] = usePasswordToggle();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const history = useHistory();

  const validate = email.length > 0 && password.length > 0;
  const reset = () => {
    setEmail("");
    setPassword("");
    setLoading(false);
  };
  const SignIn = async () => {
    setLoading(true);
    const response = await Auth("identityserver/admin/signin", { password, email });
    if (response.code === "00") {
      console.log(response.data);
      setUserDetails(response.data);
      history.push("/");
      setError(false);
      reset();
    }
    setError(true);
    reset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    SignIn();
  };

  return (
    <div id="" className="container-fluid">
      <div id="login_section" className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="auth_right">
              <h1 className="text-center">
                Easy & Reliable <br /> Banking Platform
              </h1>
              <div className="text-center">
                <img src={settlScreenshot} alt="settl screenshot" />
              </div>
              <div className="text-center downloadApps">
                <img src={appStore} alt="App Store" />
                <img src={googleStore} alt="Google Store" />
              </div>
            </div>
          </div>
          <div className="col-md-6 login_screen">
            <div className="text-center login_screen_input">
              <img src={logo} alt="settl Logo" />
              <p>Welcome back, log in to continue</p>

              <form className="text-center p-4" onSubmit={handleSubmit}>
                {error && (
                  <div className="d-flex justify-content-center align-items-center">
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
                        Oops! Wrong email or password{" "}
                      </span>
                    </div>
                  </div>
                )}
                <div className="group">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="form_in shadow-none"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="email">Email Address</label>
                </div>

                <div className="group">
                  <input
                    type={PasswordInutType}
                    className="form_in shadow-none"
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="password">Password</label>
                  <span className="password-toggle-icon">{ToggleIcon}</span>
                </div>
                <div className="d-flex justify-content-around remember_me">
                  <div>
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input shadow-none"
                        id="defaultLoginFormRemember"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="defaultLoginFormRemember"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <div className="forget_login">
                    <ForgetPassword />
                  </div>
                </div>
                <button disabled={!validate} className="btn" type="submit">
                  {loading ? <Loading /> : "Login"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  setUserDetails: (details) => dispatch(setUserDetails(details)),
});
export default connect(null, mapDispatchToProps)(Login);
