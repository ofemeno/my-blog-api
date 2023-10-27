import "dotenv/config";
import express from "express";
import cors from "cors";
import { exit } from "node:process";
import blogRoutes from "./routes/index.js";
import { connectDb } from "./utils/connectDB.js";
import cookieParser from 'cookie-parser'

const PORT = process.env.PORT;
const URI = process.env.MONGO_DB_URI;
const app = express();

// cores configuration
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser())

app.use(blogRoutes);

connectDb(URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("API server started");
    });
  })
  .catch((error) => {
    console.log(error.message);
    exit(1);
  });
