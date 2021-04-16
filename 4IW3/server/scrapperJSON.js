const { Scrapper, CSVGenerator } = require("./scrapper.js");

new Scrapper(
  { url: "https://pokeapi.co/api/v2/pokemon?limit=151" },
  (data) => data.results,
  (data) => CSVGenerator(data, "./pokes.csv")
).scrap();
