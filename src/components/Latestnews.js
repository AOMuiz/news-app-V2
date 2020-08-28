import React, { Component } from "react";
import "./latestnews.css";

class LatestNews extends Component {
  state = {
    articles: [],
    searchTopic: "",
    totalResults: "",
    loading: false,
    apiError: "",
  };

  getArticles = async () => {
    const response = await fetch(
      `https://api.currentsapi.services/v1/latest-news?apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
    );
    console.log(response);
    const json = await response.json();
    console.log(json);
    return json;
  };

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const response = await this.getArticles();
      console.log(response);
      this.setState({
        articles: response.news,
        laoding: true,
      });
    } catch (error) {
      this.setState({
        apiError: "There was an error fecthing News",
      });
      console.log(error);
    }
    this.setState({ loading: false });
  }

  render() {
    return (
      <div className='App'>
        <div>
          <h1 className='text-center'>Latest Headline</h1>
          <p className='text-center'>
            Continue Reading the Latest Headline Or Scroll Down to Search by
            Topic.
          </p>
        </div>

        {this.state.loading && (
          <p style={{ textAlign: "center" }}>Loading Latest articles...</p>
        )}

        {this.state.apiError === "" ? (
          <div className='App-header cards'>
            {this.state.articles.map((articles, index) => (
              <div key={index + articles.id} className='container'>
                <div className='row'>
                  <div className='col-md-4'>
                    <div className='single-blog'>
                      <p className='blog-meta'>
                        By : {articles.author}
                        <span>
                          {articles.published.split(" ")[0]} -{" "}
                          {articles.published.split(" ")[1]}
                        </span>
                      </p>
                      <img
                        src={
                          articles.image === "None"
                            ? "https://worldofspectrum.org/addons/shared_addons/themes/bootstrap/img/image-not-available.png"
                            : articles.image
                        }
                        alt='Not Available'
                      />
                      {/* https://st4.depositphotos.com/14953852/22772/v/1600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg */}
                      <h2>
                        <a href={articles.url}>{articles.title}</a>
                      </h2>
                      <p className='blog-text'>{articles.description}</p>
                      <p>
                        <a href={articles.url} className='read-more-btn'>
                          Read More
                        </a>
                        <span className='source'>
                          <a href={articles.url}>
                            Category: {articles.category.join(", ")}
                          </a>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h3>Something went wrong: {this.state.apiError}</h3>
        )}
      </div>
    );
  }
}

export default LatestNews;
