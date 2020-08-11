import React, { Component } from "react";
import { Fab } from "@material-ui/core";
import Reply from "@material-ui/icons/Reply";

export default class Comment extends Component {
  render() {
    const {
      commentBody,
      authorFirstName,
      authorLastName,
      showContactInfo,
      showComments,
    } = this.props;

    // console.log(`COMMENTS PROPS ${JSON.stringify(this.props)}`);
    return (
      <React.Fragment>
        <div className="comments">
          <div className="comment-content-wrapper">
            <div className="comment-content">
              <div className="author">
                <a href="author/link">
                  <p>
                    {authorFirstName} {authorLastName}
                  </p>
                </a>
              </div>
              <div className="comment-content-text">
                <p>
                  {/* Lorem Ipsum is simply dummy text of the pr make but also the
                    leap into electronic typesetting, remaining essentially
                    unchanged. It was popularised in the 1960s with the release
                    of Letraset sheets containing Lorem Ipsum passages, and more
                    recently with desktop publishing software like Aldus
                    PageMaker including versions of Lorem Ipsum. */}
                  {commentBody}
                </p>
              </div>
            </div>

            <div className="comment-image">
              <img
                className="img-fluid"
                src="https://pngimage.net/wp-content/uploads/2019/05/person-icons-png-.png"
                alt=""
              />
              <p>15 Minutes Ago</p>
            </div>
          </div>
          <Fab
            color="primary"
            aria-label="reply"
            style={{
              cursor: "pointer",
              float: "right",
              marginRight: "1rem",
              color: "#fff",
            }}
          >
            {" "}
            <Reply style={{ cursor: "pointer" }} />
          </Fab>
        </div>
      </React.Fragment>
    );
  }
}
