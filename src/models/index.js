const mongoose = require("mongoose");

const { Schema } = mongoose;

const UrlSchema = Schema(
  {
    longUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    shortCode: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("url", UrlSchema);
