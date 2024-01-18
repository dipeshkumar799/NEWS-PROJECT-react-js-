import React, { Component } from "react";
import News from "./News";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
export default class Newsitem extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 12,
    category: "general",
  };
  static propsTypes = {
    county: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f70d43087bb6457b826998b5701188f6&page=1&pagesize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      loading: false,
    });
  }
  handleNextClick = async () => {
    console.log("you have clicked on next");
    this.setState({
      loading: true,
    });
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&apiKey=f70d43087bb6457b826998b5701188f6&page=${
      this.state.page + 1
    }&pagesize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      page: this.state.page + 1,
      loading: false,
      articles: parseData.articles,
    });
  };
  handlePrevClick = async () => {
    console.log("you have clicked on prev");
    this.setState({
      loading: true,
    });
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&apiKey=f70d43087bb6457b826998b5701188f6&page=${
      this.state.page - 1
    } pagesize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      page: this.state.page - 1,
      articles: parseData.articles,
      loading: false,
    });
  };

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="d-flex justify-content-center align-items-center">
              {this.state.loading && <Spinner />}
              <h1 className="text-center">THE WORLD NEWS</h1>
            </div>

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
