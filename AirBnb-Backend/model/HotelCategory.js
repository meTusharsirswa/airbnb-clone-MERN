const mongoose = require("mongoose");

const HotelCategorySchema = new mongoose.Schema(
  {
    icon: String,
    subtitle: String,
    hotels: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotels",
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel-Category", HotelCategorySchema);
