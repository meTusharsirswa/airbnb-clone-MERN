const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema(
  {
    name: { type: String },
    location: String,
    images: [{ type: String }],
    rent: { type: Number },
    description: { type: String },

    // guests: { type: Object },
    adult: { type: Number },
    child: { type: Number },
    infents: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotels", HotelSchema);
