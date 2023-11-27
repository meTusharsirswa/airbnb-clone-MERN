import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import { formatIndianCurrency } from '../../utils';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const navigate = useNavigate();

  const fetchSearchResults = async () => {
    try {
      const response = await fetch(`http://localhost:4000/hotels/search?location=${searchTerm}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSearchResults(data.data);
      setSearchPerformed(true);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSearch = () => {
    setSearchPerformed(false);
    fetchSearchResults();
  };

  // Redirect to another page when search results are available
  useEffect(() => {
    if (searchPerformed && searchResults.length > 0) {
      navigate('/search-results', { state: { searchResults } });
    }
  }, [searchPerformed, searchResults, navigate]);
  return (
    <>
      <div className="logo">
        <Link to="/dashboard">
          <img src="../../../public/airbnb.png" alt="" />
        </Link>
      </div>
      <div className="airbnb_searchbar">
        <div className="airbnb_searchfield">
          <label htmlFor="where">Where</label>
          <input
            type="text"
            placeholder="Search destination"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="airbnb_searchfield">
          <label htmlFor="where">Check In</label>
          <input type="text" placeholder="Add dates" />
        </div>
        <div className="airbnb_searchfield">
          <label htmlFor="where">Check Out</label>
          <input type="text" placeholder="Add dates" />
        </div>
        <div className="airbnb_searchfield">
          <label htmlFor="where">Who</label>
          <input type="text" placeholder="Add guests" />
        </div>
        <div className="airbnb_seachIcon" onClick={handleSearch}>
          <SearchIcon />
        </div>
      </div>

      {searchPerformed ? (
        <div className="dashboard-container">
          {Array.isArray(searchResults) && searchResults.length > 0 ? (
            searchResults.map((item, index) => (
              <Link to={`/hotel/${item._id}`} className="info__button" key={index}>
                <div className="product">
                  <div id={`carouselExampleAutoplaying${index}`} className="carousel slide">
                    <div className="carousel-inner">
                      {item.images.map((image, imageIndex) => (
                        <div
                          key={imageIndex}
                          className={`carousel-item ${imageIndex === 0 ? "active" : ""}`}
                        >
                          <img
                            src={image}
                            className="d-block w-100 hotel_dashboard_image"
                            alt={`Image ${imageIndex}`}
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target={`#carouselExampleAutoplaying${index}`}
                      data-bs-slide="prev"
                    >
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target={`#carouselExampleAutoplaying${index}`}
                      data-bs-slide="next"
                    >
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>

                  <div className="product__info">
                    <h6 className="info__name">{item.name}</h6>
                    <h6 style={{ color: "gray" }} className="info__description">
                      {item.distance_from_you} Kilometers away
                    </h6>
                    <h6 className="info__price">
                      <strong>{formatIndianCurrency(item.rent)}</strong> night
                    </h6>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      ) : (
        <div className="dashboard-container"></div>
      )}
    </>
  );
};

export default Navbar;
