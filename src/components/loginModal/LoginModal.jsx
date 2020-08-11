import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import RegistrationModal from "../registrationModal/RegistrationModal.jsx";
import axios from "axios";

export default class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grant_type: "Bearer",
      email: "",
      pass: "",
      error: {},
      registerModal: false,
      userId: "",
    };
  }

  regModal = () => {
    this.setState({
      registerModal: !this.state.registerModal,
    });

    return <RegistrationModal />;
  };

  handleToggleLoginModal = () => {
    this.setState({
      open: !this.state.open,
    });

    this.handleLoginModal = !this.state.open;
  };

  handleChangeLogin = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleLogin = (event) => {
    const { email, pass } = this.state;

    if (email === "") {
      this.setState({
        error: { email: "Email is required" },
      });
      return;
    }
    if (pass === "") {
      this.setState({
        error: { pass: "Pass is required" },
      });
      return;
    }
    try {
      let setUser = `grant_type=${this.state.grant_type}&email=${this.state.email}&password=${this.state.pass}`;

      axios
        .post(`http://www.scripttic.com:8000/oauth2/token`, setUser, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;",
          },
        })
        .then((res) => {
          this.setState({
            token: localStorage.setItem("setToken", res.data),
          });
          axios
            .get(
              `http://www.scripttic.com:8000/api/v1/user?api_key=Bearer ${localStorage.getItem(
                "setToken"
              )}`
            )
            .then((res) => {
              const userId = res.data.id;
              this.setState({ userId: localStorage.setItem("userId", userId) });
            });
        })
        .catch((error) => {
          console.log("login Error: ", error);
        });

      this.setState({
        email: "",
        pass: "",
        open: false,
      });
    } catch (error) {
      console.log(error);
    }

    // event.preventDefault();
  };

  render() {
    const { email, pass, error } = this.state;
    const tokenHolder = localStorage.getItem("setToken");

    return (
      <React.Fragment>
        <Dialog
          open={this.props.isLoginOpen}
          onClose={this.props.handleLoginModal}
          aria-labelledby="form-dialog-title"
        >
          {" "}
          {!tokenHolder ? (
            <React.Fragment>
              <DialogTitle id="form-dialog-title">Please Log In</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To delete post you need to Log in. If you do not have account
                  please register.
                </DialogContentText>

                <form>
                  <TextField
                    autoFocus
                    margin="dense"
                    fullWidth
                    type="email"
                    label="Email address"
                    name="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={this.handleChangeLogin}
                    error={error.email}
                  />

                  <TextField
                    autoFocus
                    margin="dense"
                    fullWidth
                    type="password"
                    label="pass"
                    name="pass"
                    placeholder="Enter password"
                    value={pass}
                    onChange={this.handleChangeLogin}
                    error={error.pass}
                  />
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleLogin} color="primary">
                  Login
                </Button>
                <Button onClick={this.props.registerModal} color="primary">
                  Register
                </Button>
              </DialogActions>{" "}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <DialogTitle id="form-dialog-title"></DialogTitle>
              <DialogContent>
                <DialogContentText></DialogContentText>

                <h1>You are Logged In</h1>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={
                    (this.props.handleLoginModal,
                    () => window.location.reload())
                  }
                  color="primary"
                >
                  Close
                </Button>
              </DialogActions>
            </React.Fragment>
          )}
        </Dialog>
      </React.Fragment>
    );
  }
}
