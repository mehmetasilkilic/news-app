import SearchBar from "../components/SearchBar";

const Home = () => {
  return (
    <div className="">
      <nav className="bg-gray-800 p-4">
        <div className="container  ">
          <SearchBar />
        </div>
      </nav>

      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">News App</h1>
        <p className="text-gray-600">Your personalized news experience</p>
      </header>

      {/* Article Search and Filtering */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Search and Filter Articles</h2>
        {/* SearchBar component removed from here */}
        {/* Add date, category, and source filters here */}
        {/* Display search results */}
      </section>

      {/* Personalized News Feed */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Personalized News Feed</h2>
        {/* Add components for selecting preferred sources, categories, and authors */}
        {/* Display personalized news feed */}
      </section>
    </div>
  );
};

export default Home;
