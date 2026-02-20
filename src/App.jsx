import { useEffect, useState } from "react";
import CountryCard from "./components/CountryCard";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");

  const fetchCountries = async () => {
    try {
      setLoading(true);
      setError(null);

      let url = "https://restcountries.com/v3.1/all";

      if (search.length >= 2) {
        url = `https://restcountries.com/v3.1/name/${search}`;
      } else if (region !== "all") {
        url = `https://restcountries.com/v3.1/region/${region}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch countries");
      }

      const data = await response.json();
      setCountries(data);
    } catch (err) {
      setError(err.message);
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, [search, region]);

  const sortedCountries = [...countries].sort((a, b) => {
    if (sortOrder === "high") {
      return (b.population || 0) - (a.population || 0);
    }
    return 0;
  });

  const clearFilters = () => {
    setSearch("");
    setRegion("all");
    setSortOrder("none");
  };

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition duration-500">
      <div className="max-w-7xl mx-auto p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
            🌎 Countries Explorer
          </h1>

          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white shadow-lg hover:scale-105 transition"
          >
            🌙 Toggle Dark
          </button>
        </div>

        {/* Controls */}
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg p-6 rounded-2xl shadow-xl mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">

          <input
            type="text"
            placeholder="🔍 Search country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-400 outline-none transition"
          />

          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
          >
            <option value="all">All Regions</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
          >
            <option value="none">Sort by Population</option>
            <option value="high">High → Low</option>
          </select>

          <button
            onClick={clearFilters}
            className="px-5 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-xl shadow-lg hover:scale-105 transition"
          >
            Clear Filters
          </button>

        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-lg font-semibold text-indigo-600 dark:text-indigo-400">
            Loading countries...
          </p>
        )}

        {/* Error */}
        {error && (
          <div className="text-center">
            <p className="text-red-600 font-medium">Error: {error}</p>
            <button
              onClick={fetchCountries}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Retry
            </button>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && sortedCountries.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 text-lg">
            No results found 🌍
          </p>
        )}

        {/* Countries Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {!loading &&
            !error &&
            sortedCountries.map((country) => (
              <CountryCard
                key={country.cca3}
                country={country}
              />
            ))}
        </div>

      </div>
    </div>
  );
}

export default App;