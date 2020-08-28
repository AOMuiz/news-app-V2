import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
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
      console.log(response);
      this.setState({
        articles: response.news,
        searchTopic: topic,
        totalResults: response.news.length,
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
        <Navbar />
        <LatestNews />
        <hr />
        <Container id='searchtopic'>
          <Header as='h2' style={{ textAlign: "center", margin: 20 }}>
            Search for a topic
          </Header>
          <SearchBar searchForTopic={this.searchForTopic} />
          <p style={{ textAlign: "center" }}>
            Powered by{" "}
            <a href='https://currentsapi.services/'>currentsapi.services</a>
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
