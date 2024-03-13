import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";

import SearchBar from "../components/SearchBar";
import NewsItem from "../components/NewsItem";

import { newsActions } from "../store/news/news.actions";
import { AppDispatch, RootState } from "../store/store";

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
  const dispatch = useDispatch<AppDispatch>();
  const startDate = useSelector((state: RootState) => state.news.startDate);
  const endDate = useSelector((state: RootState) => state.news.endDate);
  const selectedCategory = useSelector(
    (state: RootState) => state.news.selectedCategory
  );
  const selectedSources = useSelector(
    (state: RootState) => state.news.selectedSources
  );

  const [news, setNews] = useState<Article[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
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
    // fetchData();
    getNYTimesData();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      // getPaginationData();
    }
  }, [page]);
  // const url = `https://content.guardianapis.com/search?api-key=${apiKey}&show-fields=thumbnail,productionOffice,trailText`;

  const getNewsAPIData = async () => {
    const params = {
      endpoint: "top-headlines",
      q: searchQuery,
      page,
      pageSize: 10,
      category: selectedCategory,
      from: startDate,
      to: endDate,
    };
    dispatch(newsActions.fetchNewsAPIData(params));
    // setNews((prevNews) => [...prevNews, ...data.articles]);
  };

  const getGuardianData = async () => {
    const params = {
      q: searchQuery,
      page,
      tag: selectedCategory,
      "page-size": 10,
      "from-date": startDate,
      "to-date": endDate,
    };
    dispatch(newsActions.fetchGuardianData(params));

    // const transformedData = data.response.results.map((article: any) =>
    //   transformData(article)
    // );
    // setNews((prevNews) => [...prevNews, ...data.articles]);
  };

  const getNYTimesData = async () => {
    const endpoint = searchQuery
      ? "search/v2/articlesearch.json"
      : "mostpopular/v2/viewed/1.json";
    const params = {
      endpoint,
      q: searchQuery,
      // page,
      fq: selectedCategory,
      begin_date: startDate,
      end_date: endDate,
    };
    dispatch(newsActions.fetchNYTimesData(params));

    // const transformedData = data.response.results.map((article: any) =>
    //   transformData(article)
    // );
    // setNews((prevNews) => [...prevNews, ...data.articles]);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchQuery(searchText);
    // getSearch();
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
        <div className="container ml-2 md:ml-96">
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
            // hasMore={news.length < totalResults - page * 20}
            hasMore={true}
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
