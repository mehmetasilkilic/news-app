import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

import SearchBar from "../components/SearchBar";
import NewsItem from "../components/NewsItem";

type Article = {
  source: {
    id: null | string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

const Home = () => {
  // const apiKey = "2c2ceb1d9ddd4c2d9cc90c88beb9459c";
  const apiKey = "b8a48d7a-80cd-4547-9d24-5ee5d7c607ed";

  const [news, setNews] = useState<Article[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [totalResults, setTotalResults] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const transformData = (article: any): any => {
    return {
      source: {
        id: null,
        name: article.sectionName,
      },
      author: article.productionOffice,
      title: article.webTitle,
      description: article.fields.trailText,
      url: article.webUrl,
      urlToImage: article.fields.thumbnail,
      publishedAt: article.webPublicationDate,
    };
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      getPaginationData();
    }
  }, [page]);

  const fetchData = async () => {
    // const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    const url = `https://content.guardianapis.com/search?api-key=${apiKey}&show-fields=thumbnail,productionOffice,trailText`;

    try {
      const { data } = await axios.get(url);
      const transformedData = data.response.results.map((article: any) =>
        transformData(article)
      );
      setNews(transformedData);
      // setNews(response.data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const getSearch = async () => {
    const url = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${apiKey}&page=1&pageSize=20`;
    try {
      const response = await axios.get<{
        articles: Article[];
        totalResults: number;
      }>(url);
      setNews(response.data.articles);
      setTotalResults(response.data.totalResults);
    } catch (error) {
      console.error("Error searching news:", error);
    }
  };

  const getPaginationData = async () => {
    const url = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${apiKey}&page=${page}&pageSize=20`;
    try {
      const response = await axios.get<{
        articles: Article[];
        totalResults: number;
      }>(url);
      setNews((prevNews) => [...prevNews, ...response.data.articles]);
    } catch (error) {
      console.error("Error searching news:", error);
    }
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchQuery(searchText);
    getSearch();
  };
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container  ">
          <SearchBar
            handleSearchSubmit={handleSearchSubmit}
            handleSearchChange={handleSearchChange}
            searchText={searchText}
          />
        </div>
      </nav>

      <section className="mb-8">
        <div className="container mx-auto my-8">
          <h2 className="text-3xl font-semibold">Latest News</h2>
          <InfiniteScroll
            dataLength={news.length}
            next={fetchMoreData}
            hasMore={news.length < totalResults - page * 20}
            loader={<h4>Loading...</h4>}
          >
            <div className="container mx-auto my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {news.map((article, index) => (
                <NewsItem key={index} article={article} />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </section>
    </div>
  );
};

export default Home;
