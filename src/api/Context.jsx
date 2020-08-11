import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();
export const tokenHolder = localStorage.getItem("setToken");
export const userId = parseInt(localStorage.getItem("userId"));

const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_ARTICLE":
      return {
        ...state,
        articles: state.articles.filter(
          (article) => article.id !== action.payload
        ),
      };
    case "ADD_ARTICLE":
      return {
        ...state,
        articles: [action.payload, ...state.articles],
      };
    case "UPDATE_ARTICLE":
      console.log(`PAYLOAD ${action.payload.id}`);
      return {
        ...state,
        articles: state.articles.map((article) =>
          article.id === action.payload.id
            ? (article = action.payload)
            : article
        ),
      };

    default:
      return state;
  }
};
export class Provider extends Component {
  state = {
    offset: 0,
    perPage: 5,
    currentPage: 0,
    articles: [],
    users: {},
    comments: [],
    dispatch: (action) => {
      this.setState((state) => reducer(state, action));
    },
  };

  pagArticleData = () => {
    axios.get(`http://www.scripttic.com:8000/api/v1/article`).then((res) => {
      const articleData = res.data;
      const paginationArticle = articleData.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      this.setState({
        pageCount: Math.ceil(articleData.length / this.state.perPage),
        articles: paginationArticle,
      });
    });
  };

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.pagArticleData();
      }
    );
  };
  componentDidMount() {
    this.pagArticleData();
    return tokenHolder ? this.getUserData() : null;
  }

  getUserData() {
    try {
      axios
        .get(
          `http://www.scripttic.com:8000/api/v1/user?api_key=Bearer ${tokenHolder}`
        )
        .then((user) => {
          const userData = user.data;

          this.setState({ users: userData });
        });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <Context.Provider
          value={{ ...this.state, pageClick: this.handlePageClick }}
        >
          {this.props.children}
        </Context.Provider>
      </div>
    );
  }
}
const Consumer = Context.Consumer;
export { Consumer, Context };
