import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { readFunction } from "./utils/supabase.js";
import { writeFunction } from "./utils/write.js";
import { mip3ReadFunction, mip3WriteFunction } from "./utils/mip3.js";

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

app.use(
  cors({
    origin: "*",
  }),
);

app.get("/state/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await readFunction(id);
    const response = JSON.parse(new TextDecoder().decode(data));
    delete response.lastProcessedSequentialId;

    res.send(response.state);
  } catch (error) {
    console.log(error);
  }
});

app.get("/mip3-state/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await mip3ReadFunction(id);
    const response = JSON.parse(new TextDecoder().decode(data));
    delete response.lastProcessedSequentialId;

    res.send(response.state);
  } catch (error) {
    console.log(error);
  }
});

app.get("/super-state/:id", async (req, res) => {
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

app.get("/kv/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await readFunction(id);
    const response = JSON.parse(new TextDecoder().decode(data));
    delete response.lastProcessedSequentialId;

    res.send(response.kv);
  } catch (error) {
    console.log(error);
  }
});

app.post("/transactions", async (req, res) => {
  try {
    const { functionId, inputs, ignoreState } = req.body;

    const tx = await writeFunction(inputs, functionId, ignoreState);

    res.send(tx);
  } catch (error) {
    console.log(error);
  }
});

app.post("/mip3-transactions", async (req, res) => {
  try {
    const { functionId, inputs, ignoreState } = req.body;

    const tx = await mip3WriteFunction(inputs, functionId, ignoreState);

    res.send(tx);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => console.log("Server started"));
