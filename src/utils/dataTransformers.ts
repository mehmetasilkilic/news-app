export const transformGuardianData = (article: any): any => {
  return {
    source: {
      id: null,
      name: "Guardian",
    },
    title: article.webTitle,
    description: article.fields
      ? article.fields.trailText
      : article.description,
    url: article.webUrl,
    urlToImage: article.fields ? article.fields.thumbnail : "",
    publishedAt: article.webPublicationDate,
  };
};

export const transformNYTimesData = (article: any): any => {
  return {
    source: {
      id: null,
      name: "New York Times",
    },
    title: article.title ? article.title : article.headline.main,
    description: article.abstract,
    url: article.webUrl,
    urlToImage: article.media
      ? article.media[0]
        ? article.media[0]["media-metadata"][1].url
        : ""
      : article.multimedia[0]
      ? `https://www.nytimes.com/${article.multimedia[0].url}`
      : "",
    publishedAt: article.published_date
      ? article.published_date
      : article.pub_date,
  };
};
