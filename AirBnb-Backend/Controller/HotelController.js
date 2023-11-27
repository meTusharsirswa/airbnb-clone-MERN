const express = require("express");
const Hotel = require("../model/Hotels");
const HotelCategory = require("../model/HotelCategory");
// const Hotels = require("../model/Hotels");


const searchHotels = async (req, res) => {
  try {
    const { location } = req.query;

    // Use a regular expression to perform a case-insensitive search
    const hotels = await Hotel.find({ location: { $regex: new RegExp(location, "i") } });

    res.status(200).json({
      status: true,
      message: "Search results fetched successfully",
      data: hotels,
    });
  } catch (error) {
    console.error("Error searching hotels:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const PostHotels = async (req, res) => {
  const {
    name,
    location,
    images,
    adult,
    child,
    infents,
    rent,
    description,

    // guests,
    hotel_category,
  } = req.body;
  const Hotels = await Hotel({
    name: name,

    images: images,
    rent: rent,
    description: description,
    location: location,
    adult: adult,
    child: child,
    infents: infents,
    // guests: guests,
    hotel_category: hotel_category,
  });
  await Hotels.save();

  await HotelCategory.findByIdAndUpdate(
    hotel_category,
    { $push: { hotels: Hotels._id } },
    { new: true }
  );

  res.status(200).json({
    status: true,
    message: "Hotel Added Successfully !!!",
    data: Hotels,
  });
};

const GetHotels = async (req, res) => {
  const Hotels = await Hotel.find({}).populate("hotel_category");
  res.status(200).json({
    status: true,
    message: "Hotel List Fetched !!!",
    data: Hotels,
  });
};

const GetHotelsById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    res.status(200).json({
      status: true,
      message: "Find By Hotel Id ",
      data: hotel,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateGuests = async (req, res) => {
  const productId = req.params.id;
  const updatedGuest = {
    name: req.body.name,
    location: req.body.location,
    images: req.body.images,
    rent:req.body.rent,
    description: req.body.description,
    hotel_category: req.body.hotel_category,
    adult: req.body.adult,
    child: req.body.child,
    infents: req.body.infents,
  };
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      productId,
      { $set: updatedGuest },
      { new: true }
    );

    if (!updatedHotel) {
      return res.status(404).json({
        status: false,
        message: "Hotel Id not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Number of guests updated successfully",
      data: updatedHotel,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const DeleteHotel = async (req, res) => {
  try {
    const hotelId = req.params.id; // Get the hotel ID from the request parameters

    const deletedHotel = await Hotel.findByIdAndDelete(hotelId);

    if (!deletedHotel) {
      return res.status(404).json({
        status: false,
        message: "Hotel not found or already deleted",
      });
    }

    // Remove the deleted hotel's ID from the associated category
    await HotelCategory.findByIdAndUpdate(
      deletedHotel.hotel_category,
      { $pull: { hotels: deletedHotel._id } },
      { new: true }
    );

    return res.status(200).json({
      status: true,
      message: "Hotel Deleted Successfully",
      data: deletedHotel, // Return the deleted hotel data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  PostHotels,
  GetHotels,
  GetHotelsById,
  updateGuests,
  DeleteHotel,
  searchHotels
};
