import React, { useCallback, useEffect, useState } from "react";
import { debounce } from "../libs/utils";
import axios from "axios";
import { Link } from "react-router-dom";

;

const Search = () => {
  const [vehicles, setVehicles] = useState([]);

  const [q, setQ] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchData = useCallback(
    debounce(async (query) => {
      if (query.trim() === "") {
        setVehicles([]);

        setSearchPerformed(false);
        setShowDropdown(false);
        return;
      }
      try {
        console.log("entered to try block")
        const response = await axios.get(
          `http://localhost:3000/api/vehicle/search-vehicle/${query}`,
          {
            withCredentials: true,
          }
        );

        console.log("the response", response.data.data);
        setVehicles(response.data.data);
        setSearchPerformed(true);
        setShowDropdown(true);
      } catch (error) {
        console.log("error fetching data", error);
        setSearchPerformed(false);
        setShowDropdown(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    fetchData(q);
  }, [q, fetchData]);

  const handleInputChange = (e) => {
    setQ(e.target.value);
  };
  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 100);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={q}
        onChange={handleInputChange}
        onBlur={handleBlur}
        placeholder="...Search"
        className="input input-bordered w-full mb-4"
        onFocus={() => setShowDropdown(true)}
      />
      {showDropdown && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg z-10 rounded-md mt-1">
          <div className="p-4">
            {searchPerformed && vehicles.length === 0  && (
              <p>No results found</p>
            )}
            {vehicles.length > 0 &&
              vehicles.map((item) => (
                <div
                  key={item._id}
                  className="p-4 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-80 mb-2"
                >
                  <h3>{item.model}</h3>
                  <h5>{item.name}</h5>
                  <Link to={`/vehicle/${item._id}`}>
                    <img
                      src={`http://localhost:3000/${item.image}`}
                      alt={`${item.image}'s profile`}
                      className="w-32 h-32 object-cover"
                    />
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
