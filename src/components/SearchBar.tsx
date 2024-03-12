import { ChangeEvent, FormEvent } from "react";

type SearchBarProps = {
  handleSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  searchText: string;
};
const SearchBar = ({
  handleSearchSubmit,
  handleSearchChange,
  searchText,
}: SearchBarProps) => {
  return (
    <div className="flex items-center">
      <form onSubmit={handleSearchSubmit} className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearchChange}
          className="bg-gray-800 text-white border-gray-300 w-96 py-2 pl-4 focus:outline-none focus:border-blue-500"
        />
        {searchText.length > 0 ? (
          <button
            type="submit"
            className="absolute right-0 top-0 bottom-0 px-3  bg-blue-400 text-white"
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
