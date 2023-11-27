const express = require("express");
const HotelCategory = require("../model/HotelCategory");

const PostHotelCategory = async (req, res) => {
  const {
    icon,
    subtitle,
  } = req.body;
  const categories = await HotelCategory({
    icon : icon,
    subtitle : subtitle,
    hotels : []
  });
  await categories.save()
  res.status(200).json({
    status: true,
    message: "Hotel Category Added Successfully !!!",
    data: categories,
  });
};

const GetHotelCategory = async (req, res) => {
  const HotelCategories = await HotelCategory.find({}).populate("hotels");
  res.status(200).json({
    status: true,
    message: "Hotel Category List Fetched !!!",
    data: HotelCategories,
  });
};

const GetHotelCategoryById = async (req, res) => {
  try {
    const hotel = await HotelCategory.findById(req.params.id).populate("hotels");
    res.status(200).json({
      status: true,
      message: "Find Hotel category by Id ",
      data: hotel,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateHotelCategory = async (req,res) =>{
  const updateData = {
    icon : req.body.icon,
    subtitle : req.body.subtitle,
  }
  const updatedData = await HotelCategory.findByIdAndUpdate(
    req.body._id,
    {$set : updateData},
    {new : true})
    if(!updatedData){
      res.json({
        status : false,
        message : "HotelCategory Id not Defined",
      })
    }else{
      res.json({
        status : true,
        message : "Hotel Category Data Updated Successfully "
      })
    }
}

module.exports = {
  PostHotelCategory,
  GetHotelCategory,
  GetHotelCategoryById,
  updateHotelCategory
};
