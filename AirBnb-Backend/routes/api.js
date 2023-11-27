const express = require("express")
const router = express.Router();
const Hotel = require("../model/Hotels");

// User Routes
const {UserDetail , loginData,userData,logout} = require("../Controller/UserController")
router.route("/register").post(UserDetail);
router.route("/login").post(loginData);
router.route('/user').get(userData)
router.route('/user-logout').post(logout)

// Hotel Routes
const Hotels = require("../Controller/HotelController")
router.post("/add-hotel", Hotels.PostHotels);
router.get("/get-hotels", Hotels.GetHotels);
router.get("/get-hotels/:id", Hotels.GetHotelsById);
router.get("/hotels/search", Hotels.searchHotels);
router.post("/update-hotel/:id", Hotels.updateHotel);
router.delete("/delete-hotel/:id",Hotels.DeleteHotel)


  

module.exports = router;

  