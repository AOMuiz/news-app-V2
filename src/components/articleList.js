import React from "react";
import { Grid, Header, Image, List } from "semantic-ui-react";

const ArticleItem = (props) => {
  const { article } = props;
  return (
    <List.Item style={{ padding: 30 }}>
      <Grid>
        <Grid.Column
          width={11}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}>
          <Header as='h3'>{article.title}</Header>
          <List.Description style={{ margin: "20px 0" }}>
            {article.description}
          </List.Description>
          <List bulleted horizontal>
            <List.Item>
              <a href={article.url}>{article.author}</a>
            </List.Item>
            <List.Item>
              {article.published.split(" ")[0]} -{" "}
              {article.published.split(" ")[1]}
            </List.Item>
          </List>
        </Grid.Column>
        <Grid.Column width={5}>
          <Image
            src={
              article.image === "None"
                ? "https://worldofspectrum.org/addons/shared_addons/themes/bootstrap/img/image-not-available.png"
                : article.image
            }
            alt='Not Available'
          />
        </Grid.Column>
      </Grid>
    </List.Item>
  );
};

const ArticleList = (props) => {
  return (
    <List divided style={{ maxWidth: 900, margin: "0 auto" }}>
      {props.articles.map((article, index) => (
        <ArticleItem article={article} key={article.title + index} />
      ))}
    </List>
  );
};

export default ArticleList;
