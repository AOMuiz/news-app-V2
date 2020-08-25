import React, { Component } from "react";
import { NEWS_API_KEY } from "../config";
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
      `https://newsapi.org/v2/top-headlines?language=en&country=ng&apiKey=${NEWS_API_KEY}`
    );
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
        articles: response.articles,
        laoding: true
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
        <section>
          <h2 className='text-center'>Latest Headline</h2>
          <h5 className='text-center'>
            Continue Reading the Latest Headline Or Scroll Down to Search by Topic.
            <p style={{ textAlign: "center" }}>
            Powered by <a href='https://newsapi.org/'>NewsAPI.org</a>
          </p>
          </h5>
        </section>
        
        {this.state.loading && (
            <p style={{ textAlign: "center" }}>Loading Latest articles...</p>
          )}

        { (this.state.apiError === "") ?
        <div className='App-header cards'>
          {this.state.articles.map((articles, index) => (
            <div key={index + articles.title} className='container'>
              <div className='row'>
                <div className='col-md-4'>
                  <div className='single-blog'>
                    <p className='blog-meta'>
                      By : {articles.author}
                      <span>{articles.publishedAt.split("T")[0]} - { articles.publishedAt.split("T")[1].split('.')[0]}</span>
                    </p>
                    <img src={articles.urlToImage === null ? 'https://st4.depositphotos.com/14953852/22772/v/1600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg' : articles.urlToImage} alt='Not Available' />
                    <h2>
                      <a href={articles.url}>{articles.title}</a>
                    </h2>
                    <p className='blog-text'>{articles.description}</p>
                    <p>
                      <a href={articles.url} className='read-more-btn'>
                        Read More
                      </a>
                      <span className="source">
                      <a href={articles.url}>Source: {articles.source.name}</a>
                    </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>  :
        <h3 className="error">Something went wrong: {this.state.apiError} try searching for a Topic</h3>
      }
      </div>
    );
  }
}

export default LatestNews;
