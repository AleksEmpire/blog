import React, { Component } from "react";
import { Consumer, userId, tokenHolder } from "../../api/Context.jsx";
import TextInputGroup from "../addArticle/TextInputGroup.jsx";
import axios from "axios";

export default class EditArticle extends Component {
  state = {
    // posterId: "",
    body: "",
    title: "",
    error: {},
  };

  async componentDidMount() {
    const articleId = parseInt(this.props.match.params.id);

    const resData = await axios.get(
      `http://www.scripttic.com:8000/api/v1/article`
    );
    // GETTING ARRAY OF ARTICLE DATA
    const article = resData.data;

    // FILTERING ARRAY TAKING CURRENT ARTICLE
    const currentArticle = article.find((art) => art.id === articleId);

    if (currentArticle) {
      this.setState({
        body: currentArticle.body,
        title: currentArticle.title,
      });
    }
  }
  // DOING UPDATE OF CURRENT ARTICLE AND DOING VALIDATION OF FIELDS
  updateArticle = async (dispatch, e) => {
    e.preventDefault();
    const { body, title } = this.state;

    if (body === "") {
      this.setState({
        error: { body: "article_body is required" },
      });
      return;
    }
    if (title === "") {
      this.setState({
        error: { title: "article_title is required" },
      });
      return;
    }

    const posterId = this.props.match.params.id;

    axios
      .put(
        `http://www.scripttic.com:8000/api/v1/article?api_key=Bearer ${tokenHolder}`,
        {
          id: parseInt(posterId),
          posterId: parseInt(userId),
          body: body,
          title: title,
          datetime: new Date().toJSON(),
        }
      )
      .then((res) => {
        dispatch({ type: "UPDATE_ARTICLE", payload: res.data });
      });

    // CLEARING FIELDS AFTER SUBMITING
    this.setState({
      body: "",
      title: "",
      error: {},
    });

    this.props.history.push("/");
  };

  // FIELD HANDLER WHILE TYPING
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
                <div className="card-header">Edit Article</div>
                <div className="card-body">
                  <form onSubmit={this.updateArticle.bind(this, dispatch)}>
                    <TextInputGroup
                      label="title"
                      name="title"
                      type="text"
                      placeholder="Enter Article Title"
                      value={title}
                      onChange={this.changeFieldHandler}
                      error={error.title}
                    />
                    <TextInputGroup
                      label="body"
                      name="body"
                      placeholder="Enter Article Text"
                      value={body}
                      onChange={this.changeFieldHandler}
                      error={error.body}
                    />

                    <input
                      type="submit"
                      value="Update Article"
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
