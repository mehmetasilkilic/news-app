import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";

import SearchBar from "../components/SearchBar";
import NewsItem from "../components/NewsItem";

import { newsActions } from "../store/news/news.actions";
import { AppDispatch, RootState } from "../store/store";
import { getTruthyParams } from "../utils/getTruthyParams";
import { clearNewsData } from "../store/news/news.slice";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const news = useSelector((state: RootState) => state.news.news);
  const startDate = useSelector((state: RootState) => state.news.startDate);
  const endDate = useSelector((state: RootState) => state.news.endDate);
  const searchQuery = useSelector((state: RootState) => state.news.searchQuery);
  const selectedCategory = useSelector(
    (state: RootState) => state.news.selectedCategory
  );
  const selectedSources = useSelector(
    (state: RootState) => state.news.selectedSources
  );

  const [page, setPage] = useState<number>(1);

  const getData = () => {
    if (selectedSources.includes("NewsAPI")) {
      // getNewsAPIData();
    }
    if (selectedSources.includes("Guardian")) {
      // getGuardianData();
    }
    if (selectedSources.includes("NYTimes")) {
      getNYTimesData();
    }
  };

  useEffect(() => {
    dispatch(clearNewsData());
    getData();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      getData();
    }
  }, [page]);

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
    const truthyParams = getTruthyParams(params);
    dispatch(newsActions.fetchNewsAPIData(truthyParams));
  };

  const getGuardianData = async () => {
    const params = {
      endpoint: selectedCategory ? "content" : "search",
      q: searchQuery,
      page,
      section: selectedCategory,
      "page-size": 10,
      "from-date": startDate,
      "to-date": endDate,
    };
    const truthyParams = getTruthyParams(params);
    dispatch(newsActions.fetchGuardianData(truthyParams));
  };

  const getNYTimesData = async () => {
    const endpoint = searchQuery
      ? "search/v2/articlesearch.json"
      : "mostpopular/v2/viewed/1.json";
    const params = {
      endpoint,
      q: searchQuery,
      page: endpoint === "search/v2/articlesearch.json" ? page : "",
      fq: selectedCategory,
      begin_date: startDate,
      end_date: endDate,
    };

    const truthyParams = getTruthyParams(params);
    dispatch(newsActions.fetchNYTimesData(truthyParams));
  };

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="w-full">
      <nav className="bg-gray-800 p-4">
        <div className="container md:pl-96">
          <SearchBar />
        </div>
      </nav>

      <section className="mb-8">
        <div className="container mx-auto my-8">
          <h2 className="text-3xl font-semibold">Latest News</h2>
          <InfiniteScroll
            dataLength={news.length}
            next={fetchMoreData}
            // hasMore={news.length < totalResults - page * 20}
            hasMore={
              searchQuery || startDate || selectedCategory ? true : false
            }
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
