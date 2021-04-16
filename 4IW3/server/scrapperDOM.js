const { CSVGenerator, Scrapper } = require("./scrapper");

new Scrapper(
  { url: "https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP" },
  (document) => {
    const trs = [];
    document.querySelectorAll(".wikitable tbody tr").forEach((trElement) => {
      if (trElement.querySelector('th[scope="col"]')) return;
      const fields = trElement.querySelectorAll("th,td");
      trs.push({
        code: fields[0].textContent.trim(),
        message: fields[1].textContent.trim(),
        description: fields[2].textContent.trim(),
      });
    });
    return trs;
  },
  (data) => CSVGenerator(data, "./http_codes.csv")
).scrap();
