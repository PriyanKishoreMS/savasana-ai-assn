const express = require("express");
const app = express();
const routes = require("./routes/routes");
require("dotenv").config();
const { connectMongoDB } = require("./config/mongodb.config");

connectMongoDB();

app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => {
	res.send("Savasana AI API");
});

module.exports = app;
