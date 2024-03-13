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
} from "../store/news/news.slice";
import { RootState } from "../store/store";

// interface ArticleFilter {
//   date: Date | null;
//   category: string;
//   sources: string[];
// }

// interface ArticleFilterSidebarProps {
//   onFilter: (filter: ArticleFilter) => void;
// }
const Sidebar = () => {
  const dispatch = useDispatch();
  const startDate = useSelector((state: RootState) => state.news.startDate);
  const endDate = useSelector((state: RootState) => state.news.endDate);
  const selectedCategory = useSelector(
    (state: RootState) => state.news.selectedCategory
  );
  const selectedSources = useSelector(
    (state: RootState) => state.news.selectedSources
  );

  const [isOpen, setIsOpen] = useState(false);

  const handleFilterClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedSources.length === 0) {
      alert("Please select at least one news source.");
      return;
    }
    const params = {
      startDate,
      endDate,
      selectedCategory,
      selectedSources,
    };
    // Filter out falsy values and log the truthy ones
    const truthyParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value)
    );
    if (Object.keys(truthyParams).length > 0) {
      console.log(truthyParams);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleToggleSource = (source: string) => {
    dispatch(toggleSource(source));
  };

  return (
    <div className="md:flex h-14 md:h-full md:flex-shrink-0">
      <div className="md:hidden flex flex-shrink-0 bg-gray-800 w-full items-center justify-between ">
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
          isOpen ? "w-72" : "w-0"
        } overflow-hidden md:w-72 md:transition-all md:duration-300 md:transform md:ease-in-out fixed left-0 top-0 bottom-0`}
      >
        <div className="px-4">
          <form onSubmit={handleFilterClick}>
            <div className="text-white font-bold py-4">
              <Link to="/">News App</Link>
            </div>
            <label className="block mb-2 ">
              <p className="text-white">Date:</p>
              <div className="flex items-center justify-between">
                <DatePicker
                  showIcon
                  className="border w-32"
                  dateFormat="yyyy/MM/dd"
                  selected={startDate}
                  onChange={(date) => updateStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                />
                <DatePicker
                  showIcon
                  className="border w-32 ml-2"
                  dateFormat="yyyy/MM/dd"
                  selected={endDate}
                  onChange={(date) => updateEndDate(date)}
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
                onChange={(e) => updateSelectedCategory(e.target.value)}
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
