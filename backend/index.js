import express from "express";
import { dbconnect } from "./config/config.js";
import router from "./router/router.js";
import cors from "cors";
import userRoutes from "./router/users.js";
import dotenv from "dotenv";
// import { Data } from "./Data.js";
// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to the database
dbconnect(); // Use this as the main DB connection function

// Middlewares
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Routes
app.use("/", router);
app.use("/api/users", userRoutes); // User-related routes
// General routes

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running successfully at http://localhost:${PORT}`);
});

// import express from "express";
// import { dbconnect } from "./config/config.js"; // Adjust path as needed

// const app = express();

// dbconnect(); // Connect to MongoDB and seed data

// app.get("/", (req, res) => {
//   res.send("hello world");
// });

// app.get("/api/data", async (req, res) => {
//   try {
//     const data = await DataModel.find();
//     res.json(data);
//   } catch (error) {
//     res.status(500).send("Error retrieving data from database");
//   }
// });

// app.listen(4000, () => {
//   console.log("Server running successfully at http://localhost:4000");
// });
