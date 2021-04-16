// https://pokeapi.co/api/v2/pokemon?limit=151
const https = require("https");
const fs = require("fs/promises");

const url = "https://pokeapi.co/api/v2/pokemon?limit=151";

const req = https.request(url, {}, (res) => {
  console.log(console.log("Response received", res.statusCode));

  if (res.statusCode >= 300) throw new Error("Something went wrong");

  let data = "";
  res.on("data", (chunk) => (data += chunk));

  res.on("end", (e) => {
    if (res.headers["content-type"].indexOf("json") >= 0) {
      data = JSON.parse(data);
      // Process data
      const pokes = data.results;
      // Save Data
      const csvHeaders = Object.keys(pokes[0]).join(",");
      const csvValues = pokes.map((p) => Object.values(p).join(","));
      fs.writeFile("./pokes.csv", `${csvHeaders}\n${csvValues.join("\n")}`);
    }
    console.log("Response ended");
  });
});

req.end();
