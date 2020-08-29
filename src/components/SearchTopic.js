import React from "react";
import { getArticles } from "../api";
import ArticleList from "./articleList";
import SearchBar from "./searchBar";
import { Container, Header } from "semantic-ui-react";

class SearchTopic extends React.Component {
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
        <Container id='searchtopic'>
          <Header as='h2' style={{ textAlign: "center", margin: 20 }}>
            Search for a topic
          </Header>
          <SearchBar searchForTopic={this.searchForTopic} />
          {/* <p style={{ textAlign: "center" }}>
            Powered by{" "}
            <a href='https://currentsapi.services/'>currentsapi.services</a>
          </p> */}
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

export default SearchTopic;
