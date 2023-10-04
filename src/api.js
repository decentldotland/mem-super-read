import express from "express";
import bodyParser from "body-parser";
import { readFunction } from "./utils/supabase.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  bodyParser.urlencoded({
    limit: "200mb",
    extended: false,
  }),
);
app.use(bodyParser.json({ limit: "200mb" }));

app.use(function (req, res, next) {
  req.setTimeout(500000, function () {});
  next();
});

app.use((err, req, res, next) => {
  console.error("An error occurred:", err);
  res.status(500).json({ error: "An internal server error occurred." });
});

app.get("/state/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await readFunction(id);
    const response = JSON.parse(new TextDecoder().decode(data));
    delete response.lastProcessedSequentialId;

    res.send(response);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => console.log("Server started"));
