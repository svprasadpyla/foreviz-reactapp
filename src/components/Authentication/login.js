import React from "react";
import { Link, withRouter } from "react-router-dom";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../lang/i18n.js";
import 'parsleyjs'
import _ from "lodash";
import { signInService } from "../../services/login";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };

    this.submit = this.submit.bind(this);
  }

  handleChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  handleChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  submit(e) {
    e.preventDefault();
    if (this.state.email.length === 0) {
      toast("Enter Valid Email", { type: "error", theme: "colored", autoClose: 2000, position: "bottom-right", transition: Zoom });
    } else if (this.state.password.length === 0) {
      toast("Enter Valid Password", { type: "error", theme: "colored", autoClose: 2000, position: "bottom-right", transition: Zoom });
    } else {
      this.handleSignInData({ 'userEmail': this.state.email, "password": this.state.password });
    }

    // let roleInfo = ''
    // if (this.state.email === 'salesemployee@gmail.com') {
    //   roleInfo = 'SALESEMPLOYEE';
    // } else if (this.state.email === 'salesmanager@gmail.com') {
    //   roleInfo = 'SALESMANAGER';
    // } else if (this.state.email === 'inventoryemployee@gmail.com') {
    //   roleInfo = 'INVENTORYEMPLOYEE';
    // } else if (this.state.email === 'inventorymanager@gmail.com') {
    //   roleInfo = 'INVENTORYMANAGER';
    // } else if (this.state.email === 'pricingemployee@gmail.com') {
    //   roleInfo = 'PRICINGEMPLOYEE';
    // } else if (this.state.email === 'pricingmanager@gmail.com') {
    //   roleInfo = 'PRICINGMANAGER';
    // } else if (this.state.email === 'admin@gmail.com') {
    //   roleInfo = 'ADMIN';
    // }else{
    //   roleInfo = 'SUPERADMIN';
    // }

    // const userData = {
    //   userId: "617019c47452aa5e854d0989",
    //   token: "67670f65-2457-4fc7-b5df-5a3de1628e5f",
    //   firstName: "Raju",
    //   lastName: "Penumathsa",
    //   email: "raju@exaactsolutions.com",
    //   organizationId: "61603ddbd2fda74df7e62d6d",
    //   role: roleInfo,
    //   keepLoggin: false,
    //   departmentId: null,
    //   employeeId: "10003",
    //   id: "67c443c52e955b7d7cf26346"
    // };

    // // Stringify the object and store it in sessionStorage
    // sessionStorage.setItem("userdata", window.btoa(JSON.stringify(userData)));
    // //this.props.history.push('/dashboard');
    // this.props.history.push('/category');
  }

  handleSignInData = async (payload) => {

    try {
      const response = await signInService(payload);
      if (response && !_.isEmpty(response.data) && response.status.toLowerCase() === "success") {
        sessionStorage.setItem("userdata", window.btoa(JSON.stringify(response.data)));

        const storedUserData = sessionStorage.getItem("userdata");
        const roles = storedUserData ? JSON.parse(window.atob(storedUserData)).role : null;
        console.log("Role of loggedin user - ", roles);
        this.props.history.push('/category');
      }
    } catch (error) {
      this.setState({ listLoader: false });
      //handleApiError(error, this.props);
    }
  }

  render() {

    return (
      <>

        <ToastContainer />


        <section className="login-page">
          <div className="container-fluid px-5">
            <div className="col-md-3">
              <img className="login-logo" src="../assets/images/foreviz/logo.png" alt="Logo" />
              <h4 className="login-title">Welcome back. Please login below</h4>

              <form id="login-form" className="form-auth-small text-left" onSubmit={this.submit}>
                {/* Email / Username Field */}
                <div className="form-group mb-3">
                  <label htmlFor="signin-email" className="login-label">
                    Email / Username
                  </label>
                  <input
                    type="text"
                    name="signin-email"
                    className="form-control borderlg"
                    placeholder="Enter your email or username"
                    onChange={(e) => this.handleChangeEmail(e)}
                  />
                </div>

                {/* Password Field */}
                <div className="form-group mb-3">
                  <label htmlFor="signin-password" className="login-label">
                    Password
                  </label>
                  <div className="position-relative">
                    <input
                      type="password"
                      name="signin-password"
                      className="form-control borderlg"
                      placeholder="Enter your password"
                      onChange={(e) => this.handleChangePassword(e)}
                    />
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="bottom row mt-3 mb-4">
                  <div className="col-md-6 remember-label">
                    <input type="checkbox" id="rememberMe" />
                    <label htmlFor="rememberMe" className=""> Remember me</label>
                  </div>
                  <div className="col-md-6 text-right">
                    <span className="helper-text font-size-14">
                      <Link id="routeTo-Forgot-Password" className="forgotPwd small" to="/forgotpassword">
                        Need help logging in?
                      </Link>
                    </span>
                  </div>
                </div>

                {/* Sign In & Request Access Buttons */}
                <div className="mt-5">
                  <button type="submit" className="btn btn-warning px-4 text-white fw-medium">
                    Sign In
                  </button>
                  <button type="button" className="btn bg_darkgray ml-2 px-4 fw-medium">
                    Request Access
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

      </>
    );
  }
}

export default withRouter(Login);