import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./src/db/connect.js";
import cookieParser from "cookie-parser";
import fs from "node:fs";
import errorHandler from "./src/helpers/errorhandler.js";

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

// Middleware for CORS
const allowedOrigins = [
  process.env.CLIENT_URL, // Production URL (e.g., https://taskfyer.vercel.app)
  "http://localhost:3000", // Development URL (localhost)
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
//new
app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:3000"], // Allow both production and local origins
    credentials: true,
  })
);
//newend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Error handler middleware
app.use(errorHandler);

// Routes
const routeFiles = fs.readdirSync("./src/routes");

routeFiles.forEach((file) => {
  // Use dynamic import for routes
  import(`./src/routes/${file}`)
    .then((route) => {
      app.use("/api/v1", route.default);
    })
    .catch((err) => {
      console.log("Failed to load route file", err);
    });
});

const server = async () => {
  try {
    await connect();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("Failed to start server.....", error.message);
    process.exit(1);
  }
};

server();

