import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Component } from "react";
import Nav from "./component/Nav";
import "./App.css";
import Newsitem from "./component/Newsitem";
export default class App extends Component {
  apikey = process.env.REACT_NEWS_API_KEY;

  render() {
    return (
      <>
        <Router>
          <Nav />
          <Routes>
            <Route
              path="/home"
              element={
                <Newsitem
                  key={"Home"}
                  pageSize="12"
                  country="in"
                  apiKey={this.apikey}
                  category="general"
                />
              }
            />
            <Route
              path="/game"
              element={
                <Newsitem
                  key={"Game"}
                  pageSize="12"
                  apiKey={this.apikey}
                  country="in"
                  category="game"
                />
              }
            />
            <Route
              path="/science"
              element={
                <Newsitem
                  key={"Science"}
                  pageSize="12"
                  apiKey={this.apikey}
                  country="in"
                  category="science"
                />
              }
            />
            <Route
              path="/technology"
              element={
                <Newsitem
                  pageSize="12"
                  apiKey={this.apikey}
                  key={"Technology"}
                  country="in"
                  category="technology"
                />
              }
            />
          </Routes>
        </Router>
      </>
    );
  }
}
