const { Schema } = require("mongoose");
const conn = require("../../lib/mongo");

const WeatherSchema = new Schema({
  datetime: { type: String },
  tempmax: Number,
  tempmin: Number,
  description: String,
});

const Weather = conn.model("Weather", WeatherSchema);

module.exports = Weather;
