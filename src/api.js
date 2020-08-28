export const getArticles = async (topic) => {
  const response = await fetch(
    `https://api.currentsapi.services/v1/search?keywords=${topic}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
  );
  const json = await response.json();
  console.log(json);
  return json;
};
