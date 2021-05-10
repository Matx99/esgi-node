const express = require("express");
const HttpCode = require("./models/mongo/http_code");

const app = express();

app.use(express.json());

app.get("/codes", (req, res) => {
  const { page, perPage, ...query } = req.query;
  HttpCode.find(query)
    .limit(parseInt(perPage))
    .skip((parseInt(page) - 1) * parseInt(perPage))
    .then((data) => res.json(data));
});

app.post("/codes", (req, res) => {
  HttpCode.create(req.body).then((data) => res.status(201).json(data));
});

app.get("/codes/:code", (req, res) => {
  const id = req.params.code;
  HttpCode.findById(id).then((data) =>
    data !== null ? res.json(data) : res.sendStatus(404)
  );
});
app.put("/codes/:code", (req, res) => {
  HttpCode.findByIdAndUpdate(req.params.code, req.body, {
    new: true,
  }).then((data) => (data !== null ? res.json(data) : res.sendStatus(404)));
});

app.delete("/codes/:code", (req, res) => {
  // <==> HttpCode.deleteOne({ _id: req.params.code })
  HttpCode.findByIdAndDelete(req.params.code).then((data) =>
    res.sendStatus(data !== null ? 204 : 404)
  );
});

app.listen(process.env.PORT || 3000, () => console.log("server is listening"));
