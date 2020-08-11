import React, { Component } from "react";
import { Consumer, tokenHolder } from "../../api/Context.jsx";
import TextInputGroup from "../addArticle/TextInputGroup.jsx";
import axios from "axios";

export default class EditArticle extends Component {
  state = {
    email: "",
    firstName: "",
    lastName: "",
    error: {},
  };

  async componentDidMount() {
    // GET CURRENT USER INFORMATION

    const userId = this.props.match.params.id;

    const res = await axios.get(
      `http://www.scripttic.com:8000/api/v1/user/${userId}?api_key=Bearer ${tokenHolder}`
    );

    const userData = res.data;
    // SET STATE
    this.setState({
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
    });
  }

  // CHANGE USER INFORMATION AND DOING FIELDS VALIDATION

  updateUser = async (e) => {
    e.preventDefault();
    const { email, firstName, lastName } = this.state;
    if (email === "") {
      this.setState({
        error: { email: "Email is required" },
      });
      return;
    }
    if (lastName === "") {
      this.setState({
        error: { lastName: "Last Name is required" },
      });
      return;
    }

    await axios.put(
      `http://www.scripttic.com:8000/api/v1/user?api_key=Bearer ${tokenHolder}`,

      {
        email: email,
        firstName: firstName,
        lastName: lastName,
      }
    );

    // RESET STATE (EMPTY FIELDS) AFTER SUBMITING
    this.setState({
      email: "",
      firstName: "",
      lastName: "",
      error: {},
    });
    window.location.reload();
    this.props.history.push("/");
  };

  // FIELD HANDLER WHILE TYPING
  changeFieldHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { email, firstName, lastName, error } = this.state;

    return (
      <React.Fragment>
        <Consumer>
          {(value) => {
            return (
              <div className="card mb-3">
                <div className="card-header">Edit User</div>
                <div className="card-body">
                  <form onSubmit={this.updateUser.bind(this)}>
                    <TextInputGroup
                      label="email"
                      name="email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={this.changeFieldHandler}
                      error={error.email}
                    />
                    <TextInputGroup
                      label="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Enter First Name"
                      value={firstName}
                      onChange={this.changeFieldHandler}
                      error={error.firstName}
                    />

                    <TextInputGroup
                      label="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Enter Last Name"
                      value={lastName}
                      onChange={this.changeFieldHandler}
                      error={error.lastName}
                    />
                    <input
                      type="submit"
                      value="Update User"
                      className="btn btn-light btn-block"
                    />
                  </form>
                </div>
              </div>
            );
          }}
        </Consumer>
      </React.Fragment>
    );
  }
}
