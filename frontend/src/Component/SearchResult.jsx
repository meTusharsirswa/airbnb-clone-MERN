import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { formatIndianCurrency } from '../utils';

const SearchResult = () => {
  const location = useLocation();
  const searchResults = location.state?.searchResults || [];

  return (
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
  );
};

export default SearchResult;
