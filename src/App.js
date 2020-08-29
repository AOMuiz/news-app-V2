import React, { Component } from "react";
import Navbar from "./components/Navbar";
import LatestNews from "./components/Latestnews";
import SearchTopic from "./components/SearchTopic";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route path='/news-app-V2' exact component={LatestNews} />
            <Route path='/news-app-V2/latestnews' component={LatestNews} />
            <Route path='/news-app-V2/search' component={SearchTopic} />
          </Switch>
          <footer className='footer-distributed'>
            <p>
              <a href='https://github.com/AOMuiz'>AOMuiz</a> &copy; 2020 ||
              Created Using React and{" "}
              <a href='https://currentsapi.services/'>Currentsapi.services</a>
            </p>
          </footer>
        </div>
      </Router>
    );
  }
}

export function Search() {
  return (
    <div>
      <h1>Search page</h1>
    </div>
  );
}

export default App;
