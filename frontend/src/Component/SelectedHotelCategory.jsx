// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import Navbar from "./Section/Navbar";
// import CircularProgress from "@mui/material/CircularProgress";
// import { formatIndianCurrency } from "../utils";
// import { formatDistance } from "../utils";

// // import "../css/Dashboard.css";
// const SelectedHotelCategory = () => {
//   const [data, setData] = useState([]);
//   const { categoryId } = useParams();
//   const [loading, setLoading] = useState(true);

//   const GetSelectedCategory = async () => {
//     setLoading(true); // Set loading to true when fetching data
//     axios
//       .get(`http://localhost:4000/get-hotel-category/${categoryId}`)
//       .then((res) => {
//         if (res.data.status) {
//           setData(res.data.data);
//         }
//       })
//       .catch((error) => {
//         console.error(`Error fetching data: `, error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     GetSelectedCategory();
//   }, [categoryId]);

//   if (loading) {
//     return (
//       <div>
//         <CircularProgress />
//       </div>
//     );
//   }
//   return (
//     <>
//       <Navbar />
//       <div className="dashboard-container">
//         {data.hotels ? (
//           <div className="dashboard-container">
//             {data.hotels.map((hotelId) => (
//               <Link
//                 to={`/hotel/${hotelId._id}`}
//                 className="info__button"
//                 key={hotelId._id}
//               >
//                 <div className="product">
//                   <div
//                     id={`carouselExampleAutoplaying${hotelId._id}`}
//                     className="carousel slide"
//                   >
//                     <div className="carousel-inner">
//                       {hotelId.images.map((image, imageIndex) => (
//                         <div
//                           key={imageIndex}
//                           className={`carousel-item ${
//                             imageIndex === 0 ? "active" : ""
//                           }`}
//                         >
//                           <img
//                             src={image}
//                             className="d-block w-100 hotel_dashboard_image"
//                             alt={`Image ${imageIndex}`}
//                           />
//                         </div>
//                       ))}
//                     </div>
//                     <button
//                       className="carousel-control-prev"
//                       type="button"
//                       data-bs-target={`#carouselExampleAutoplaying${hotelId._id}`}
//                       data-bs-slide="prev"
//                     >
//                       <span
//                         className="carousel-control-prev-icon"
//                         aria-hidden="true"
//                       ></span>
//                       <span className="visually-hidden">Previous</span>
//                     </button>
//                     <button
//                       className="carousel-control-next"
//                       type="button"
//                       data-bs-target={`#carouselExampleAutoplaying${hotelId._id}`}
//                       data-bs-slide="next"
//                     >
//                       <span
//                         className="carousel-control-next-icon"
//                         aria-hidden="true"
//                       ></span>
//                       <span className="visually-hidden">Next</span>
//                     </button>
//                   </div>
//                   <div className="product__info">
//                     <h6 className="info__name">{hotelId.name}</h6>
//                     <h6 style={{ color: "gray" }} className="info__description">
//                       {hotelId.distance_from_you
//                         ? formatDistance(hotelId.distance_from_you) +
//                           " Kilometers away"
//                         : "Distance not available"}{" "}
//                     </h6>
//                     <h6 className="info__price">
//                       <strong>{formatIndianCurrency(hotelId.rent)}</strong>{" "}
//                       night
//                     </h6>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         ) : (
//           <p>No hotels found for this category.</p>
//         )}
//       </div>
//     </>
//   );
// };

// export default SelectedHotelCategory;
