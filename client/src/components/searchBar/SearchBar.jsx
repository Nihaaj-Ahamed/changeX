import { useState } from "react";
import "./searchBar.scss";
import { Link } from "react-router-dom";

const types = ["sell", "exchange"];
const properties = ["Apple", "Samsung", "GooglePixel", "Xiaomi", "Other"];

function SearchBar() {
  const [query, setQuery] = useState({
    type: "sell",
    city: "",
    property: "",
    maxPrice: "",
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => switchType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleChange}
        />

        {/* Brand Dropdown (Name is set to 'property' for backend/Prisma) */}
        <select name="property" onChange={handleChange} value={query.property}>
          <option value="">Select Brand</option>
          {properties.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="Max Price (Rs.)"
          onChange={handleChange}
        />

        <Link
          to={`/list?type=${query.type}&city=${query.city || ""}&property=${query.property || ""}&maxPrice=${query.maxPrice || ""}`}
        >
          <button type="submit">
            <img src="/search.png" alt="Search" />
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SearchBar;