require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 8555;
const dbConnect = require("./config/dbConnect.config");
const path = require("path");

const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.use("/e-commerce", require("./routes/index"));

app.listen(port, () => {
    console.log(`Server is Running on http://localhost:${port}`);
});