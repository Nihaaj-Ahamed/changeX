import { useState } from "react";
import "./filter.scss";
import { useSearchParams } from "react-router-dom";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const[query, setQuery] = useState({
    type:searchParams.get("type") || "",
    city:searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice:searchParams.get("minPrice") || 0,
    maxPrice:searchParams.get("maxPrice") || 10000000,
    storage:searchParams.get("storage") || 0,
  });
  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };
const handleFilter = () => {
  setSearchParams(query);
}

  return (
    <div className="filter">
      <h1>
        Search results for <b>{searchParams.get("city")}</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">Location</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City Location"
            onChange={handleChange}
            defaultValue={query.city}
          />
        </div>
      </div>
      <div className="bottom">
        
        {/* Changed "Type" (Buy/Rent) to "Listing Type" (Buy/Exchange) */}
        <div className="item">
          <label htmlFor="type">Listing Type</label>
          <select name="type" id="type" onChange={handleChange} defaultValue={query.type}>
            <option value="">any</option>
            <option value="sell">sell</option>
            <option value="exchange">Exchange/Swap</option>
          </select>
        </div>

        {/* Changed "Property" (House/Apartment) to "Brand" (Apple/Samsung) */}
        <div className="item">
          <label htmlFor="property">Brand</label>
          <select name="property" id="property" onChange={handleChange} value={query.property}>
            <option value="">any</option>
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="GooglePixel">Google Pixel</option>
            <option value="Xiaomi">Xiaomi</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="item">
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.minPrice}
          />
        </div>

        <div className="item">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            type="text"
            id="maxPrice"
            name="maxPrice"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.maxPrice}
          />
        </div>

        {/* Changed "Bedroom" to "Min Storage" */}
        <div className="item">
          <label htmlFor="storage">Min Storage (GB)</label>
          <input
            type="text"
            id="storage"
            name="storage"
            onChange={handleChange}
            placeholder="e.g. 128"
            defaultValue={query.storage}
          />
        </div>

        <button onClick={handleFilter}>
          <img src="/search.png" alt="" />
        </button>
      </div>
    </div>
  );
}

export default Filter;