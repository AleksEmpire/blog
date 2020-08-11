import React, { Component } from "react";
import { Consumer, tokenHolder, userId } from "../../api/Context.jsx";
import TextInputGroup from "./TextInputGroup.jsx";
import axios from "axios";

// const userIdHolder = localStorage.getItem("userId");
export default class AddContact extends Component {
  state = {
    posterId: "",
    body: "",
    title: "",
    error: {},
  };

  addArticle = (dispatch, e) => {
    e.preventDefault();
    const { body, title } = this.state;

    if (body === "") {
      this.setState({
        error: { article_body: "article_body is required" },
      });
      return;
    }
    if (title === "") {
      this.setState({
        error: { title: "article_title is required" },
      });
      return;
    }

    const newArticle = JSON.stringify({
      body: body,
      title: title,
      posterId: parseInt(userId),
    });

    try {
      axios
        .post(
          `http://www.scripttic.com:8000/api/v1/article?api_key=Bearer ${tokenHolder}`,
          {
            body: body,
            title: title,
            posterId: parseInt(userId),
          }
        )
        .then((res) => {
          dispatch({ type: "ADD_ARTICLE", payload: res.data });
          console.log(`RESPONSE ${res}`);
        });

      console.log(`ARTIKLE ${newArticle}`);
      this.setState({
        body: "",
        title: "",
        error: {},
      });
      this.props.history.push("/");
    } catch (error) {
      console.log(error.response);
    }
  };

  changeFieldHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { body, title, error } = this.state;

    return (
      <React.Fragment>
        <Consumer>
          {(value) => {
            const { dispatch } = value;

            return (
              <div className="card mb-3">
                <div className="card-header">
                  <h1>Add Article</h1>
                </div>
                <div className="card-body">
                  <form onSubmit={this.addArticle.bind(this, dispatch)}>
                    <TextInputGroup
                      label="body"
                      name="body"
                      placeholder="Enter article_body"
                      value={body}
                      onChange={this.changeFieldHandler}
                      error={error.body}
                    />
                    <TextInputGroup
                      label="title"
                      name="title"
                      type="text"
                      placeholder="Enter article_title"
                      value={title}
                      onChange={this.changeFieldHandler}
                      error={error.title}
                    />

                    <input
                      type="submit"
                      value="Add"
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
