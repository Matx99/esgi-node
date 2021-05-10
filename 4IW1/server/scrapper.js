const https = require("https");
const fs = require("fs/promises");
const { JSDOM } = require("jsdom");

exports.Scrapper = function Scrapper(
  { url, ...requestOptions },
  processData,
  saveData
) {
  const request = https.request(url, requestOptions, (response) => {
    let data = [];
    response.on("data", (chunk) => data.push(chunk));

    response.on("end", () => {
      data = Buffer.concat(
        data,
        data.reduce((acc, item) => acc + item.length, 0)
      );
      // Parse message
      if (response.headers["content-type"].indexOf("json") !== -1) {
        data = JSON.parse(data);
      }
      if (response.headers["content-type"].indexOf("image") !== -1) {
        //data = data;
      }
      if (response.headers["content-type"].indexOf("html") !== -1) {
        const dom = new JSDOM(data.toString());
        data = dom.window.document;
      }
      //Process Data
      data = processData(data);
      //Save data
      saveData(data);
    });
  });

  this.scrap = () => request.end();
};

exports.CSVGenerator = (data, filename) => {
  const csvHeader = Object.keys(data[0]).join(",");
  const csvBody = data
    .map((datum) => Object.values(datum).join(","))
    .join("\n");
  exports.FileGenerator(csvHeader + "\n" + csvBody, filename);
};

exports.FileGenerator = (data, filename) => {
  fs.writeFile(filename, data).then((_) => console.log("Data saved"));
};
