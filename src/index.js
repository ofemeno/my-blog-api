import "dotenv/config";
import express from "express";
import cors from "cors";
import { exit } from "node:process";
import blogRoutes from "./routes/index.js";
import { connectDb } from "./utils/connectDB.js";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const PORT = process.env.PORT;
const URI = process.env.MONGO_DB_URI;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// console.log(__filename);
// console.log(__dirname);

const app = express();

// cores configuration
const corsOptions = {
  origin: "https://my-blog-m8sl.onrender.com",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/uploads", express.static(join(__dirname, "../uploads")));

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
