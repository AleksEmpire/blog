import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Consumer } from "../../api/Context.jsx";
import axios from "axios";

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      pass: "",
      open: false,
      error: {},
      logInClicked: false,
    };
  }

  handleToggleRegModal = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  handleChangeRegFields = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleRegistration = (event) => {
    event.preventDefault();
    const { email, firstName, lastName, pass } = this.state;

    if (email === "") {
      this.setState({
        error: { email: "Email is required" },
      });
      return;
    }
    if (firstName === "") {
      this.setState({
        error: { firstName: "Pass is required" },
      });
      return;
    }
    if (lastName === "") {
      this.setState({
        error: { lastName: "Pass is required" },
      });
      return;
    }
    if (pass === "") {
      this.setState({
        error: { pass: "Pass is required" },
      });
      return;
    }
    const user = {
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      pass: this.state.pass,
    };
    console.log(`User ${user}`);
    axios
      .post(`http://www.scripttic.com:8000/api/v1/user`, user)
      .then((res) => {
        if (res) {
          this.props.handleSuccessAuth(res);
        }
      }) //API
      .catch((error) => {
        console.log("Registration Error: ", error);
      });
    this.setState({
      email: "",
      firstName: "",
      lastName: "",
      pass: "",
      pass_confirmation: "",
      registrationErrors: " ",
    });
  };

  clickLogin = () => {
    this.setState({
      logInClicked: true,
    });
  };

  render() {
    const { email, firstName, lastName, pass, error } = this.state;
    return (
      <React.Fragment>
        <Consumer>
          {(value) => {
            return (
              <Dialog
                open={this.props.isRegisterOpen}
                onClose={this.registerModal}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">
                  Edit or Delete Post
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To edit or delete post you must be registered.
                  </DialogContentText>

                  <form
                    className="registration-form"
                    onSubmit={this.handleRegistration}
                  >
                    <TextField
                      autoFocus
                      margin="dense"
                      fullWidth
                      type="email"
                      label="Email address"
                      name="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={this.handleChangeRegFields}
                      error={error.email}
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      fullWidth
                      type="text"
                      label="First Name"
                      name="firstName"
                      placeholder="Enter First Name"
                      value={firstName}
                      onChange={this.handleChangeRegFields}
                      error={error.firstName}
                    />

                    <TextField
                      autoFocus
                      margin="dense"
                      fullWidth
                      type="text"
                      label="Last Name"
                      name="lastName"
                      placeholder="Enter Last Name"
                      value={lastName}
                      onChange={this.handleChangeRegFields}
                      error={error.lastName}
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      fullWidth
                      type="password"
                      label="Password"
                      name="pass"
                      placeholder="Enter Password"
                      value={pass}
                      onChange={this.handleChangeRegFields}
                      error={error.pass}
                    />
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleRegistration} color="primary">
                    Register
                  </Button>
                  <Button onClick={this.props.handleLoginModal} color="primary">
                    Login
                  </Button>
                </DialogActions>
              </Dialog>
            );
          }}
        </Consumer>
      </React.Fragment>
    );
  }
}
