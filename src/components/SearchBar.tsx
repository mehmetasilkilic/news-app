import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

import { clearNewsData, updateSearchQuery } from "../store/news/news.slice";
import { AppDispatch } from "../store/store";

const SearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchText, setSearchText] = useState<string>("");

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(clearNewsData());
    dispatch(updateSearchQuery(searchText));
  };
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  return (
    <div className="flex items-center">
      <form onSubmit={handleSearchSubmit} className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearchChange}
          className="bg-gray-800 text-white border-gray-300 w-72 py-2 pl-4 focus:outline-none focus:border-blue-500"
        />
        {searchText.length > 0 ? (
          <button
            type="submit"
            className="absolute right-0 top-0 bottom-0 px-3 hover:bg-blue-600 bg-blue-400 text-white"
          >
            Search
          </button>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
