import React from "react";
import { FaSearch } from "react-icons/fa";

const FilterBar = () => {
  return (
    <div className="d-flex flex-wrap gap-3 justify-content-center my-4">
      {/* Search Input */}
      <div
        className="input-group rounded-pill border px-3"
        style={{ maxWidth: "250px" }}
      >
        <input
          type="text"
          className="form-control border-0"
          placeholder="Search"
          style={{ borderRadius: "30px" }}
        />
        <span className="input-group-text bg-white border-0">
          <FaSearch />
        </span>
      </div>

      {/* Address Filter */}
      <select
        className="form-select rounded-pill border px-3"
        style={{ maxWidth: "150px" }}
      >
        <option>Address</option> {/* Changed from Location to Address */}
        <option>Ubud</option>
        <option>Canggu</option>
        <option>Seminyak</option>
      </select>

      {/* Price Filter */}
      <select
        className="form-select rounded-pill border px-3"
        style={{ maxWidth: "150px" }}
      >
        <option>Price</option>
        <option>Lowest to Highest</option>
        <option>Highest to Lowest</option>
      </select>

      {/* Rating Filter */}
      <select
        className="form-select rounded-pill border px-3"
        style={{ maxWidth: "150px" }}
      >
        <option>Rating</option>
        <option>Highest First</option>
        <option>Lowest First</option>
      </select>
    </div>
  );
};

export default FilterBar;
