// https://pokeapi.co/api/v2/pokemon?limit=151
const https = require("https");
const fs = require("fs/promises");
const { JSDOM } = require("jsdom");

exports.Scrapper = function ({ url, ...options }, processData, saveData) {
  const req = https.request(url, options, (res) => {
    if (res.statusCode >= 300) throw new Error("Something went wrong");

    let data = "";
    res.on("data", (chunk) => (data += chunk));

    res.on("end", () => {
      if (res.headers["content-type"].indexOf("html") >= 0) {
        data = new JSDOM(data);
        data = data.window.document;
      }
      if (res.headers["content-type"].indexOf("json") >= 0) {
        data = JSON.parse(data);
      }
      // Process data
      const dataProcessed = processData(data);
      // Save Data
      saveData(dataProcessed);
    });
  });

  this.scrap = () => req.end();
};

exports.CSVGenerator = (data, file) => {
  const csvHeaders = Object.keys(data[0]).join(",");
  const csvValues = data.map((p) => Object.values(p).join(","));
  fs.writeFile(file, `${csvHeaders}\n${csvValues.join("\n")}`);
};
