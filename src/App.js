import React from "react";
import "./App.css";
import { getArticles } from "./api";
import LatestNews from "./components/Latestnews";
import ArticleList from "./components/articleList";
import SearchBar from "./components/searchBar";
import { Container, Header } from "semantic-ui-react";

class App extends React.Component {
  state = {
    articles: [],
    searchTopic: "",
    totalResults: "",
    loading: false,
    apiError: "",
  };

  searchForTopic = async (topic) => {
    try {
      this.setState({ loading: true });
      const response = await getArticles(topic);
      this.setState({
        articles: response.articles,
        searchTopic: topic,
        totalResults: response.totalResults,
      });
    } catch (error) {
      this.setState({ apiError: "Could not find any articles" });
    }
    this.setState({ loading: false });
  };

  render() {
    const {
      articles,
      apiError,
      loading,
      searchTopic,
      totalResults,
    } = this.state;
    return (
      <div>
        <header>
          <div className='topnav'>
            <a className='active' href='#home'>The News Inquirer</a>
            <a href='#home'>Home</a>
            <a href='#searchtopic'>Search Topic</a>
          </div>
        </header>
        <LatestNews />
        <hr />
        <Container id='searchtopic'>
          <Header as='h2' style={{ textAlign: "center", margin: 20 }}>
            Search for a topic
          </Header>
          <SearchBar searchForTopic={this.searchForTopic} />
          <p style={{ textAlign: "center" }}>
            Powered by <a href='https://newsapi.org/'>NewsAPI.org</a>
          </p>
          {loading && (
            <p style={{ textAlign: "center" }}>Searching for articles...</p>
          )}
          {articles.length > 0 && (
            <Header as='h4' style={{ textAlign: "center", margin: 20 }}>
              Found {totalResults} articles on "{searchTopic}"
            </Header>
          )}
          {articles.length > 0 && <ArticleList articles={articles} />}
          {apiError && <p>Could not fetch any articles. Please try again.</p>}
        </Container>
      </div>
    );
  }
}

export default App;
