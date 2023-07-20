const express = require("express");
const dotenv = require("dotenv");
const app = express();
const PORT = 5000 || process.env.PORT;
const routes = require("./routes/routes");
const connectMongoDB = require("./config/mongodb.config");

dotenv.config();
connectMongoDB();

app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => {
	res.send("Savasana AI API");
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
