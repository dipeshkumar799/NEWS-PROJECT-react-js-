import React, { Component } from "react";
import News from "./News";

export default class Newsitem extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
    };
  }

  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=f70d43087bb6457b826998b5701188f6&page=1";
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({ articles: parseData.articles });
  }

  handleNextClick = async () => {
    console.log("you have clicked on next");
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f70d43087bb6457b826998b5701188f6&page=${
      this.state.page + 1
    }`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      page: this.state.page + 1,
      articles: parseData.articles,
    });
  };

  handlePrevClick = async () => {
    console.log("you have clicked on prev");
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f70d43087bb6457b826998b5701188f6&page=${
      this.state.page - 1
    }`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      page: this.state.page - 1,
      articles: parseData.articles,
    });
  };

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            {this.state.articles.map((element) => (
              <div className="col-md-4 mb-3" key={element.url}>
                <News
                  title={element.title ? element.title.slice(0, 45) : ""}
                  descripition={
                    element.description ? element.description.slice(0, 56) : ""
                  }
                  urlImage={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd4y7zVmHqMDDZPFYCAtIvlWWGYofVYEwNg4AyzbXsRg&s"
                  }
                  url={element.url}
                />
              </div>
            ))}
          </div>
          <div className="container d-flex justify-content-between ">
            <button
              type="button"
              disabled={this.state.page <= 1}
              onClick={this.handlePrevClick}
              className="btn btn-dark"
            >
              &larr; Prev
            </button>
            <button
              type="button"
              onClick={this.handleNextClick}
              disabled={this.state.page >= this.state.articles}
              className="btn btn-dark"
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </>
    );
  }
}
