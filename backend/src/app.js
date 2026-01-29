const express = require("express");
const connectDB = require("./config/database");

const app = express();

app.listen(3000, () => {
  connectDB();
  console.log("Server is running on http://localhost:3000");
});
