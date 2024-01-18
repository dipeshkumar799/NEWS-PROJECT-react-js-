import React, { Component } from "react";

export default class News extends Component {
  render() {
    const { title, descripition, urlImage, url } = this.props;
    return (
      <>
        <div className="card" style={{ width: "18rem" }}>
          <img src={urlImage} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text"> {descripition}</p>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              Read more
            </a>
          </div>
        </div>
      </>
    );
  }
}
