import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { formatIndianCurrency } from "../utils";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import "../css/SelectedHotel.css";
// import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const SelectedHotel = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState("");
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleIncrementGuests = (category) => {
    let updatedGuests;
    switch (category) {
      case "adults":
        updatedGuests = adults + 1;
        setAdults(updatedGuests);
        break;
      case "children":
        updatedGuests = children + 1;
        setChildren(updatedGuests);
        break;
      case "infants":
        updatedGuests = infants + 1;
        setInfants(updatedGuests);
        break;
      default:
        break;
    }

    // Update guests on the server
    updateGuestsOnServer({
      adult: category === "adults" ? updatedGuests : adults,
      child: category === "children" ? updatedGuests : children,
      infents: category === "infants" ? updatedGuests : infants,
    });
  };

  const handleDecrementGuests = (category) => {
    let updatedGuests;
    switch (category) {
      case "adults":
        updatedGuests = adults - 1 >= 0 ? adults - 1 : 0;
        setAdults(updatedGuests);
        break;
      case "children":
        updatedGuests = children - 1 >= 0 ? children - 1 : 0;
        setChildren(updatedGuests);
        break;
      case "infants":
        updatedGuests = infants - 1 >= 0 ? infants - 1 : 0;
        setInfants(updatedGuests);
        break;
      default:
        break;
    }

    // Update guests on the server
    updateGuestsOnServer({
      adult: category === "adults" ? updatedGuests : adults,
      child: category === "children" ? updatedGuests : children,
      infents: category === "infants" ? updatedGuests : infants,
    });
  };

  const updateGuestsOnServer = async (guestData) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/update-hotel/${productId}`,
        guestData
      );

      if (response.status === 200 && response.data) {
        // Update the state with the new guest counts from the server
        const updatedHotelData = response.data.data;
        setAdults(updatedHotelData.adult);
        setChildren(updatedHotelData.child);
        setInfants(updatedHotelData.infents);

        console.log("Guests updated on the server:", updatedHotelData);
      } else {
        console.error("Invalid response from the server:", response);
      }
    } catch (error) {
      console.error("Error updating guests:", error);
    }
  };

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/get-hotels/${productId}`
        );
        if (response.status === 200 && response.data) {
          const hotelData = response.data.data;
          setProduct(hotelData);

          // Update the state with guest counts from the fetched data
          setAdults(hotelData.adult !== undefined ? hotelData.adult : 0);
          setChildren(hotelData.child !== undefined ? hotelData.child : 0);
          setInfants(hotelData.infents !== undefined ? hotelData.infents : 0);

          if (hotelData) {
            const baseAmount = hotelData.rent * 5;
            const cleaningFee = 399;
            const airbnbServicesFee = 899;
            const total = baseAmount + cleaningFee + airbnbServicesFee;
            setTotalAmount(total);
          }
        } else {
          console.error("Invalid response from the server:", response);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    // Call the fetchHotelData function when the component mounts
    fetchHotelData();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="productscreen">
     <div className="logo">
        <Link to="/dashboard">
          <img src="../../public/airbnb.png" alt="" />
        </Link>
      </div>
      <>
      
        <div className="productscreen__left">
          <div className="left__image">
            <p className="left__name">{product.name} , {product.location}</p>

            <div id={`carouselExampleAutoplaying`} className="carousel slide">
              <div className="carousel-inner">
                {product.images.map((image, imageIndex) => (
                  <div
                    key={imageIndex}
                    className={`carousel-item ${
                      imageIndex === 0 ? "active" : ""
                    }`}
                  >
                    <img
                      src={image}
                      className="d-block w-100 "
                      style={{
                        objectFit: "cover",
                        borderRadius: "13px",
                        height: "60vh",
                      }}
                      alt={`Image ${imageIndex}`}
                    />
                  </div>
                ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target={`#carouselExampleAutoplaying`}
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target={`#carouselExampleAutoplaying`}
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="productscreen__right">
            <div className="right__info">
              <h4 className="fw-semibold ml-4 pt-3">
                {" "}
                {formatIndianCurrency(product.rent)} night
              </h4>
              <div className="reserve_box" >
                <div className="check_in">
                  <label htmlFor="check_in">CHECK-IN</label>
                  <input type="date" className="reserve_box_inputs" />
                </div>
                <div className="check_in">
                  <label htmlFor="check_in">CHECK-OUT</label>
                  <input type="date" className="reserve_box_inputs" />
                </div>
                      
                <div className="guest_accordion">
                  <Accordion style={{ width: "100%" ,borderRadius: "15px" }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className="typrography">GUESTS</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <hr />
                      <div className="adults">
                        <div className="adults_data">
                          <h6>Adults</h6>
                          <span>Age 13+</span>
                        </div>
                        <div className="number_of_member">
                          <RemoveCircleOutlineIcon
                            onClick={() => handleDecrementGuests("adults")}
                          />
                          {adults}
                          <ControlPointOutlinedIcon
                            onClick={() => handleIncrementGuests("adults")}
                          />
                        </div>
                      </div>
                      <hr />
                      <div className="adults">
                        <div className="adults_data">
                          <h6>Children:</h6>
                          <span>Ages 2-12</span>
                        </div>
                        <div className="number_of_member">
                          <RemoveCircleOutlineIcon
                            onClick={() => handleDecrementGuests("children")}
                          />
                          {children}
                          <ControlPointOutlinedIcon
                            onClick={() => handleIncrementGuests("children")}
                          />
                        </div>
                      </div>
                      <hr />
                      <div className="adults">
                        <div className="adults_data">
                          <h6>Infants:</h6>
                          <span>Under 2</span>
                        </div>
                        <div className="number_of_member">
                          <RemoveCircleOutlineIcon
                            onClick={() => handleDecrementGuests("infants")}
                          />
                          {infants}
                          <ControlPointOutlinedIcon
                            onClick={() => handleIncrementGuests("infants")}
                          />
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
              <button className="continue_btn">Continue</button>
              <p className="d-flex justify-content-center mx-auto">
                You won't be charged yet
              </p>
              <div className="bottom_right_info_container">
                <div className="bottom_right_info">
                  <p>{formatIndianCurrency(product.rent)} x 5 nights</p>
                  <p>{formatIndianCurrency(product.rent * 5)}</p>
                </div>
                <div className="bottom_right_info">
                  <p>Cleaning Fee</p>
                  <p>{formatIndianCurrency(399)}</p>
                </div>
                <div className="bottom_right_info">
                  <p>Airbnb Services fee</p>
                  <p>{formatIndianCurrency(899)}</p>
                </div>
                <span className="horizontal_line"></span>
                <div className="bottom_right_info">
                  <p>Total before taxes</p>
                  <p className="fw-bold">{formatIndianCurrency(totalAmount)}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="left__info">
            <p>{product.description}</p>
          </div>
        </div>
      </>
    </div>
  );
};

export default SelectedHotel;
