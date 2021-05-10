// https://pomber.github.io/covid19/timeseries.json

const http = require("http");
const https = require("https");
const fs = require("fs/promises");
const { JSDOM } = require("jsdom");

exports.Scrapper = function ({ url, ...options }, processData, saveData) {
  const protocol = url.startsWith("https") ? https : http;

  const request = protocol.request(url, options, (response) => {
    let data = "";
    response.on("data", (chunk) => (data += chunk));

    response.on("end", () => {
      // Parsing
      if (response.headers["content-type"].indexOf("json") !== -1) {
        data = JSON.parse(data);
      } else {
        const dom = new JSDOM(data);
        data = dom.window.document;
      }
      // Processing
      data = processData(data);
      // Saving
      saveData(data);
    });
  });
  this.scrap = () => request.end();
};

exports.CSVGenerator = (data, filename = "./exports.csv") => {
  const csvHeaders = Object.keys(data[0]).join(",");
  const csvBody = data.map((it) => Object.values(it).join(","));
  fs.writeFile(filename, csvHeaders + "\n" + csvBody.join("\n"));
};
