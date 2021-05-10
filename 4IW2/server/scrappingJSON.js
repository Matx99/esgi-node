// https://pomber.github.io/covid19/timeseries.json

const { CSVGenerator, Scrapper } = require("./scrapper");

const scrapper = new Scrapper(
  { url: "https://pomber.github.io/covid19/timeseries.json" },
  (data) =>
    Object.keys(data).map((country) => {
      const lastStat = data[country][data[country].length - 1];
      return {
        country,
        day_death: lastStat.deaths,
        total_death: lastStat.confirmed,
      };
    }),
  (data) => CSVGenerator(data, "./covid.csv")
);

scrapper.scrap();
