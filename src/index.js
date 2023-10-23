const express = require("express");
const config = require("config");
const cors = require("cors");
const blogRoutes = require('./routes')

const PORT = config.get("PORT");

const app = express();

app.use(cors());

app.use(
  express.json()
);

app.use(blogRoutes)

app.listen(PORT, () => {
  console.log("API server started");
});
