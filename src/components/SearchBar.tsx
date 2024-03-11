import { useState, FormEvent, ChangeEvent } from "react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your search logic here, e.g., redirect to search results page
    console.log(`Searching for: ${searchQuery}`);
  };

  return (
    <div className="flex items-center md:hidden">
      <form onSubmit={handleSearchSubmit} className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="bg-gray-800 text-white border-gray-300 rounded-md py-2 pl-4 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="absolute right-0 top-0 bottom-0 px-3  bg-blue-400 text-white rounded-tr-md rounded-br-md"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
