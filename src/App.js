import React, { Component } from "react";
import Header from "./components/header/Header.jsx";
import "./App.scss";
import Articles from "./components/articles/Articles.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import AddArticle from "./components/addArticle/AddArticle.jsx";
import EditArticle from "./components/editArticle/EditArticle.jsx";
import UserDetail from "./components/userDetail/UserDetail.jsx";
// import Comment from "./components/comment/Comment.jsx";
import NotFound from "./page/NotFound.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default class App extends Component {
  state = {
    loginModal: false,
    registerModal: false,
  };

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
  render() {
    const { loginModal, registerModal } = this.state;
    return (
      <div>
        <Router>
          <div className="App">
            <Header
              loginModal={loginModal}
              registerModal={registerModal}
              handleRegisterModal={this.handleRegisterModal}
              handleLoginModal={this.handleLoginModal}
              branding="Articles"
            />
            <div className="flex-container">
              <Switch>
                <Route exact path="/" component={Articles} />
                <Route
                  exact
                  path="/contact/add-article"
                  component={AddArticle}
                />
                <Route
                  exact
                  path="/article/editPost/:id"
                  component={EditArticle}
                />
                <Route exact path="/user/profile/:id" component={UserDetail} />
                {/* <Route
                  exact
                  path="comments/editComments/:id"
                  component={Comment}
                /> */}
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}
