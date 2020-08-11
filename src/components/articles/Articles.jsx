import React, { Component } from "react";
import Article from "../article/Article.jsx";
import { Consumer } from "../../api/Context.jsx";
import Loader from "../loader/Loader.jsx";
import LazyLoad from "react-lazyload";
import ReactPaginate from "react-paginate";
import { Context } from "../../api/Context.jsx";

const Loading = () => (
  <div className="article loading">
    <h5>loading</h5>
  </div>
);

export default class Articles extends Component {
  static contextType = Context;
  render() {
    const { pageClick } = this.context;
    return (
      <Consumer>
        {(value) => {
          const { articles, pageCount } = value;

          if (articles === undefined || articles.length === 0) {
            return <Loader />;
          } else {
            return (
              <React.Fragment>
                <h1 className="display-4 mb-2">
                  <span className="text-danger">Article</span> List
                </h1>
                <div className="container">
                  {articles.map((article) => {
                    return (
                      <React.Fragment>
                        <LazyLoad
                          height={500}
                          key={article.id}
                          placeholder={<Loading />}
                        >
                          <Article key={article.id} article={article} />
                        </LazyLoad>
                      </React.Fragment>
                    );
                  })}
                  <div className="pagination-wrapper">
                    <ReactPaginate
                      previousLabel={"prev"}
                      nextLabel={"next"}
                      breakLabel={"..."}
                      breakClassName={"break-me"}
                      pageCount={pageCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={pageClick}
                      containerClassName={"pagination"}
                      subContainerClassName={"pages pagination"}
                      activeClassName={"active"}
                    />
                  </div>
                </div>
              </React.Fragment>
            );
          }
        }}
      </Consumer>
    );
  }
}
