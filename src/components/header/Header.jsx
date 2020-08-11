import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Consumer } from "../../api/Context.jsx";
import User from "../user/User.jsx";
import RegistrationModal from "../registrationModal/RegistrationModal.jsx";
import LoginModal from "../loginModal/LoginModal.jsx";

export default class Header extends Component {
  state = {
    userData: {},
    id: "",
    email: "",
    firstName: "",
    lastName: "",
  };

  handleLogout = (e) => {
    localStorage.clear();
    window.location.reload();
  };

  render() {
    const {
      branding,
      handleLoginModal,
      handleRegisterModal,
      registerModal,
      loginModal,
    } = this.props;
    return (
      <nav className="navbar sticky-top navbar-expand-lg bg-dark">
        <div className="container">
          <a href="/" className="navbar-brand">
            {branding}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto w-100 justify-content-end">
              <li className="nav-item">
                {" "}
                <Link to="/" className="nav-link">
                  <i className="fa fa-home" /> Home{" "}
                </Link>{" "}
              </li>{" "}
              <li className="nav-item">
                {" "}
                <Link to="/contact/add-article" className="nav-link">
                  <i className="fa fa-plus" /> Add{" "}
                </Link>{" "}
              </li>{" "}
              <li className="nav-item">
                {" "}
                <Link to="/about" className="nav-link">
                  <i className="fa fa-question" /> About{" "}
                </Link>{" "}
              </li>
              {/* <!-- hook into js-darkmode-toggle via Javascript later -->
<button class="lightswitch js-darkmode-toggle" role="switch" aria-checked="false">
  <svg class="lightswitch__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <title>toggle dark mode</title>
    <!-- include two different icon paths, then display the one matching the current state in CSS -->
    <path class="lightswitch__icon__on" d="M9 20...1.512z"/>
    <path class="lightswitch__icon__off" d="M9 20...6h-2z"/>
  </svg>
</button> */}
              {!localStorage.getItem("setToken") ? (
                <React.Fragment>
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      <i
                        className="fa fa-sign-in-alt"
                        onClick={handleLoginModal}
                      >
                        Login
                      </i>
                    </Link>
                  </li>
                  <LoginModal
                    handleLoginModal={handleLoginModal}
                    registerModal={handleRegisterModal}
                    isLoginOpen={loginModal}
                  />
                  <RegistrationModal
                    handleLoginModal={handleLoginModal}
                    registerModal={handleRegisterModal}
                    isRegisterOpen={registerModal}
                  />
                </React.Fragment>
              ) : null}
              {localStorage.getItem("setToken") ? (
                <React.Fragment>
                  <Consumer>
                    {(value) => {
                      const { users } = value;
                      return <User users={users} />;
                    }}
                  </Consumer>

                  <li className="nav-item">
                    {" "}
                    <Link to="/" className="nav-link">
                      <i
                        className="fa fa-power-off"
                        aria-hidden="true"
                        color="primary"
                        onClick={this.handleLogout}
                      >
                        Logout
                      </i>
                    </Link>{" "}
                  </li>
                </React.Fragment>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
