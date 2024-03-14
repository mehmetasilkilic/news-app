import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";

import CloseIcon from "../assets/CloseIcon";
import HamburgerIcon from "../assets/svgs/HamburgerIcon";
import {
  toggleSource,
  updateStartDate,
  updateEndDate,
  updateSelectedCategory,
  clearNewsData,
  clearSearchQuery,
  clearFilter,
} from "../store/news/news.slice";
import { AppDispatch, RootState } from "../store/store";
import { newsActions } from "../store/news/news.actions";
import { getTruthyParams } from "../utils/getTruthyParams";

const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const startDate = useSelector((state: RootState) => state.news.startDate);
  const endDate = useSelector((state: RootState) => state.news.endDate);
  const selectedCategory = useSelector(
    (state: RootState) => state.news.selectedCategory
  );
  const selectedSources = useSelector(
    (state: RootState) => state.news.selectedSources
  );

  const [isOpen, setIsOpen] = useState(false);

  const getNewsAPIData = async () => {
    const params = {
      endpoint: "top-headlines",
      page: 1,
      pageSize: 10,
      category: selectedCategory,
      from: startDate,
      to: endDate,
    };
    const truthyParams = getTruthyParams(params);
    // @ts-ignore
    dispatch(newsActions.fetchNewsAPIData(truthyParams));
  };

  const getGuardianData = async () => {
    const params = {
      endpoint: selectedCategory ? "tags" : "search",
      page: 1,
      section: selectedCategory,
      "page-size": 10,
      "from-date": startDate,
      "to-date": endDate,
    };
    const truthyParams = getTruthyParams(params);
    // @ts-ignore
    dispatch(newsActions.fetchGuardianData(truthyParams));
  };

  const getNYTimesData = async () => {
    const params = {
      endpoint: "search/v2/articlesearch.json",
      page: 1,
      fq: selectedCategory,
      begin_date: startDate,
      end_date: endDate,
    };
    const truthyParams = getTruthyParams(params);
    // @ts-ignore
    dispatch(newsActions.fetchNYTimesData(truthyParams));
  };

  const handleFilterClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedSources.length === 0) {
      alert("Please select at least one news source.");
      return;
    }

    dispatch(clearNewsData());
    dispatch(clearSearchQuery());

    if (selectedSources.includes("NewsAPI")) {
      getNewsAPIData();
    }
    if (selectedSources.includes("Guardian")) {
      getGuardianData();
    }
    if (selectedSources.includes("NYTimes")) {
      getNYTimesData();
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleToggleSource = (source: string) => {
    dispatch(toggleSource(source));
  };

  return (
    <div className="md:flex h-14 md:h-full md:flex-shrink-0 md:w-72">
      <div className="md:hidden flex flex-shrink-0 bg-gray-800 w-full items-center justify-between">
        <div className="text-white font-bold px-4">
          <Link to="/">News App</Link>
        </div>
        <button
          onClick={toggleMenu}
          className=" text-white p-4 focus:outline-none"
        >
          {isOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>
      </div>
      <div
        className={`bg-gray-800 ${
          isOpen ? "w-full" : "w-0"
        } overflow-hidden md:w-72 md:transition-all md:duration-300 md:transform md:ease-in-out md:fixed md:left-0 md:top-0 md:bottom-0`}
      >
        <div className="px-4 pb-4">
          <form onSubmit={handleFilterClick}>
            <div className="text-white font-bold py-4 hidden md:block">
              <Link to="/">News App</Link>
            </div>
            <label className="block mb-2 ">
              <p className="text-white">Date:</p>
              <div className="flex items-center justify-between w-64">
                <DatePicker
                  showIcon
                  className="border w-32"
                  dateFormat="yyyy/MM/dd"
                  selected={startDate}
                  onChange={(date) => dispatch(updateStartDate(date))}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                />
                <DatePicker
                  showIcon
                  className="border w-32 ml-2"
                  dateFormat="yyyy/MM/dd"
                  selected={endDate}
                  onChange={(date) => dispatch(updateEndDate(date))}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                />
              </div>
            </label>

            <label className="block mb-2">
              <p className="text-white">Category:</p>
              <select
                className="border p-2"
                value={selectedCategory}
                onChange={(e) =>
                  dispatch(updateSelectedCategory(e.target.value))
                }
              >
                <option value="">Select Category</option>
                <option value="business">Business</option>
                <option value="entertainment">Entertainment</option>
                <option value="technology">Technology</option>
                <option value="health">Health</option>
                <option value="sports">Sports</option>
                <option value="science">Science</option>
              </select>
            </label>

            <label className="block mb-2 text-white">
              Sources:
              <div>
                <label className="flex items-center text-white">
                  <input
                    type="checkbox"
                    value="NewsAPI"
                    checked={selectedSources.includes("NewsAPI")}
                    onChange={() => handleToggleSource("NewsAPI")}
                  />
                  <span className="ml-2">NewsAPI</span>
                </label>

                <label className="flex items-center text-white">
                  <input
                    type="checkbox"
                    value="Guardian"
                    checked={selectedSources.includes("Guardian")}
                    onChange={() => handleToggleSource("Guardian")}
                  />
                  <span className="ml-2">Guardian</span>
                </label>

                <label className="flex items-center text-white">
                  <input
                    type="checkbox"
                    value="NYTimes"
                    checked={selectedSources.includes("NYTimes")}
                    onChange={() => handleToggleSource("NYTimes")}
                  />
                  <span className="ml-2">NY Times</span>
                </label>
              </div>
            </label>

            <button
              type="submit"
              className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Apply Filter
            </button>
            <button
              onClick={() => dispatch(clearFilter())}
              className="bg-blue-400 text-white px-4 py-2 ml-2 rounded hover:bg-blue-600"
            >
              Clear Filter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
