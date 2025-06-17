require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes/index");
const mongoose = require("mongoose");
const { customCors } = require("./middlewares/cors");

const MONGODB_URI = process.env.MONGODB_URI || "";
console.log(MONGODB_URI);

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});

const app = express();
const port = process.env.PORT || 5000;

app.use(customCors);
// app.use(cors());

app.use(express.json());

app.use("/api", router);

app.listen(port, () => {
    console.log(`server listening at port: ${port}`);
}); 