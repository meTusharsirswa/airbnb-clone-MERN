const express = require("express");
const Hotel = require("../model/Hotels");

const searchHotels = async (req, res) => {
  try {
    const { location } = req.query;

    const hotels = await Hotel.find({
      location: { $regex: new RegExp(location, "i") },
    });

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
  const { name, location, images, adult, child, infents, rent, description } =
    req.body;

  const hotel = await Hotel({
    name: name,
    images: images,
    rent: rent,
    description: description,
    location: location,
    adult: adult,
    child: child,
    infents: infents,
  });

  await hotel.save();

  res.status(200).json({
    status: true,
    message: "Hotel Added Successfully !!!",
    data: hotel,
  });
};

const GetHotels = async (req, res) => {
  const hotels = await Hotel.find({});
  res.status(200).json({
    status: true,
    message: "Hotel List Fetched !!!",
    data: hotels,
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


const updateHotel = async (req, res) => {
  const hotelId = req.params.id;
  const updatedHotel = {
    name: req.body.name,
    location: req.body.location,
    images: req.body.images,
    rent: req.body.rent,
    description: req.body.description,
    adult: req.body.adult,
    child: req.body.child,
    infents: req.body.infents,
  };

  try {
    const hotel = await Hotel.findByIdAndUpdate(
      hotelId,
      { $set: updatedHotel },
      { new: true }
    );

    if (!hotel) {
      return res.status(404).json({
        status: false,
        message: "Hotel Id not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Hotel updated successfully",
      data: hotel,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const DeleteHotel = async (req, res) => {
  try {
    const hotelId = req.params.id;

    const deletedHotel = await Hotel.findByIdAndDelete(hotelId);

    if (!deletedHotel) {
      return res.status(404).json({
        status: false,
        message: "Hotel not found or already deleted",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Hotel Deleted Successfully",
      data: deletedHotel,
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
  updateHotel,
  DeleteHotel,
  searchHotels,
};
