import React, { Component } from "react";
import { Consumer } from "../../api/Context.jsx";
import { Link } from "react-router-dom";

export default class Articles extends Component {
  render() {
    const userId = this.props.users.id;
    return (
      <React.Fragment>
        <Consumer>
          {(value) => {
            const { users } = value;
            const { firstName } = users;
            return (
              <React.Fragment>
                <li className="nav-item">
                  <Link to={`/user/profile/${userId}`} className="nav-link">
                    <i className="fa fa-user" />
                    {firstName}
                  </Link>
                </li>
              </React.Fragment>
            );
          }}
        </Consumer>
      </React.Fragment>
    );
  }
}
