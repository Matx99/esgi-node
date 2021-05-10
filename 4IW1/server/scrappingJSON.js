const { Scrapper, CSVGenerator } = require("./scrapper");

new Scrapper(
  {
    url:
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Springfield,IL?unitGroup=us&key=AHBS12DVFHFFSHF764DGDB",
  },
  (data) =>
    data.days.map(({ datetime, tempmax, tempmin, description }) => ({
      datetime,
      tempmax,
      tempmin,
      description,
    })),
  (data) => CSVGenerator(data, "./weather.csv")
).scrap();
