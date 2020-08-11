import React, { Component } from "react";
import { Consumer, tokenHolder } from "../../api/Context.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
import RegistrationModal from "../registrationModal/RegistrationModal.jsx";
import LoginModal from "../loginModal/LoginModal.jsx";
import { Fab } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import Reply from "@material-ui/icons/Reply";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import Comment from "../comment/Comment.jsx";

const userId = parseInt(localStorage.getItem("userId"));

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginModal: false,
      showContactInfo: false,
      registerModal: false,
      showComments: false,
      commentBody: [],
      commentTitle: [],
    };
  }

  handleLoginModal = () => {
    const { registerModal } = this.state;
    if (registerModal === true) {
      this.setState({
        registerModal: false,
        loginModal: true,
      });
    } else {
      this.setState({
        loginModal: !this.state.loginModal,
      });
    }
  };

  handleRegisterModal = () => {
    const { loginModal } = this.state;
    if (loginModal === true) {
      this.setState({
        loginModal: false,
        registerModal: true,
      });
    } else {
      this.setState({
        registerModal: !this.state.registerModal,
      });
    }
  };
  getContactInfo = () => {
    this.setState({
      showContactInfo: !this.state.showContactInfo,
      showComments: false,
    });
  };

  async getComments(articleId) {
    try {
      const commentsData = await axios.get(
        `http://www.scripttic.com:8000/api/v1/article/${articleId}/comment`
      );
      const comments = commentsData.data;
      // console.log(`COMM ${JSON.stringify(comments[0].article)}`);
      const currentComments = comments.filter(
        (comment) => comment.article === articleId
      );

      // console.log(`COM ${JSON.stringify(currentComments)}`);
      currentComments.map((comments) => {
        const arrComment = comments;
        console.log(`ARR COM ${arrComment.body}`);
        return this.setState({
          commentBody: arrComment.body,
          commentTitle: arrComment.title,
          showComments: !this.state.showComments,
          showContactInfo: false,
        });
      });
    } catch (error) {
      console.log(error);
      alert("THERE IS NO COMMENTS FOR THIS ARTICLE");
    }
  }

  deleteArticle = (articleId, dispatch) => {
    const posterId = this.props.article.posterId;

    if (posterId === userId) {
      try {
        axios
          .delete(
            `http://www.scripttic.com:8000/api/v1/article/${articleId}/?api_key=Bearer ${tokenHolder}`
          )
          .then((res) =>
            dispatch({ type: "DELETE_ARTICLE", payload: articleId })
          );
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("USER NOT AUTHOR");
    }
  };

  render() {
    const {
      showContactInfo,
      showComments,
      commentBody,
      commentTitle,
    } = this.state;
    const article = this.props.article;
    const { body, title, posterFirstName, posterLastName } = article;
    const articleId = this.props.article.id;

    return (
      <React.Fragment>
        <Consumer>
          {(value) => {
            const { dispatch } = value;
            const posterId = this.props.article.posterId;
            return (
              <div className="card card-body mb-3">
                <div className="article-wrapp">
                  <div className="article-content">
                    <div className="icons-wrapper">
                      {/* <Link to={`comments/editComments/${articleId}`}> */}
                      <Fab
                        style={{
                          cursor: "pointer",
                          float: "right",
                          marginRight: "1rem",
                          color: "#fff",
                        }}
                      >
                        <InsertCommentIcon
                          onClick={this.getComments.bind(this, articleId)}
                        />
                      </Fab>
                      {showComments && showContactInfo === false ? (
                        <Comment
                          commentBody={commentBody}
                          authorFirstName={posterFirstName}
                          authorLastName={posterLastName}
                        />
                      ) : null}
                      {/* </Link> */}
                      <Fab
                        color="secondary"
                        aria-label="delete"
                        style={{
                          cursor: "pointer",
                          float: "right",
                          marginRight: "1rem",
                          color: "#fff",
                        }}
                      >
                        {" "}
                        <CloseIcon
                          style={{ cursor: "pointer" }}
                          onClick={
                            !localStorage.getItem("setToken")
                              ? this.handleLoginModal
                              : this.deleteArticle.bind(
                                  this,
                                  articleId,
                                  dispatch
                                )
                          }
                        />
                      </Fab>{" "}
                      <LoginModal
                        handleLoginModal={this.handleLoginModal}
                        registerModal={this.handleRegisterModal}
                        isLoginOpen={this.state.loginModal}
                      />
                      <RegistrationModal
                        handleLoginModal={this.handleLoginModal}
                        registerModal={this.handleRegisterModal}
                        isRegisterOpen={this.state.registerModal}
                      />
                      {!localStorage.getItem("setToken") ? (
                        <React.Fragment>
                          <Fab
                            color="primary"
                            aria-label="edit"
                            style={{
                              cursor: "pointer",
                              float: "right",
                              marginRight: "1rem",
                              color: "#fff",
                            }}
                          >
                            {" "}
                            <EditIcon
                              style={{ cursor: "pointer" }}
                              onClick={this.handleLoginModal}
                            />
                          </Fab>
                        </React.Fragment>
                      ) : userId === posterId ? (
                        <React.Fragment>
                          <Link to={`article/editPost/${articleId}`}>
                            <Fab
                              color="primary"
                              aria-label="edit"
                              style={{
                                cursor: "pointer",
                                float: "right",
                                marginRight: "1rem",
                                color: "#fff",
                              }}
                            >
                              <EditIcon />
                            </Fab>
                          </Link>{" "}
                        </React.Fragment>
                      ) : (
                        <Fab
                          onClick={() => alert(`YOU ARE NOT THE AUTHOR`)}
                          color="primary"
                          aria-label="edit"
                          style={{
                            cursor: "pointer",
                            float: "right",
                            marginRight: "1rem",
                            color: "#fff",
                          }}
                        >
                          <EditIcon />
                        </Fab>
                      )}
                    </div>
                    <h4>
                      Title: {title}{" "}
                      <i
                        className="fa fa-sort-down"
                        style={{ cursor: "pointer" }}
                        onClick={this.getContactInfo}
                      ></i>
                    </h4>
                  </div>
                </div>

                {showContactInfo && showComments === false ? (
                  <React.Fragment>
                    <textarea cols="30" rows="10">
                      {body}
                    </textarea>

                    <p>
                      Author: {posterFirstName} {posterLastName}
                    </p>
                  </React.Fragment>
                ) : null}
              </div>
            );
          }}
        </Consumer>
      </React.Fragment>
    );
  }
}
