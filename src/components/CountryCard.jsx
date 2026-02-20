function CountryCard({ country }) {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden hover:-translate-y-2">

      <div className="overflow-hidden">
        <img
          src={country.flags?.png}
          alt={country.name?.common}
          className="w-full h-40 object-cover group-hover:scale-110 transition duration-500"
        />
      </div>

      <div className="p-5">
        <h2 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-2">
          {country.name?.common || "Unknown"}
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          🌍 Region: {country.region || "N/A"}
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          👥 Population:{" "}
          {country.population
            ? country.population.toLocaleString()
            : "N/A"}
        </p>
      </div>
    </div>
  );
}

export default CountryCard;