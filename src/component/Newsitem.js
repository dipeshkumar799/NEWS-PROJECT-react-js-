import React, { useState, useEffect } from "react";
import News from "./News";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
const Newsitem = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pagesize=${props.pageSize}`;
      let data = await fetch(url);
      let parseData = await data.json();
      setArticles(parseData.articles);
      setLoading(false);
    };

    fetchData();
  }, [props.country, props.category, props.apiKey, props.pageSize]);
  const handleNextClick = async () => {
    console.log("you have clicked on next");
    setLoading(true);
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&apiKey=${props.apiKey}&page=${page + 1}&pagesize=${props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);

    setPage(page + 1);
    setLoading(false);
    setArticles(parseData.articles);
  };
  const handlePrevClick = async () => {
    console.log("you have clicked on prev");
    setLoading(true);
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&apiKey=${props.apiKey}&page=${page - 1} pagesize=${props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    setPage(page - 1);
    setLoading(false);
    setArticles(parseData.articles);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-center align-items-center">
            {loading && <Spinner />}
            <h1 className="text-center">THE WORLD NEWS</h1>
          </div>
          {articles.map((element) => (
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
            disabled={page <= 1}
            onClick={handlePrevClick}
            className="btn btn-dark"
          >
            &larr; Prev
          </button>
          <button
            type="button"
            onClick={handleNextClick}
            disabled={page >= articles}
            className="btn btn-dark"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </>
  );
};
export default Newsitem;
Newsitem.defaultProps = {
  country: "in",
  pageSize: 12,
  category: "general",
};
Newsitem.propsTypes = {
  county: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
