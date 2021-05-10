const { Schema } = require("mongoose");
const conn = require("../../lib/mongo");

const HttpCodeSchema = new Schema({
  _id: Number,
  message: String,
  description: String,
});

const HttpCode = conn.model("HttpCode", HttpCodeSchema);

module.exports = HttpCode;
