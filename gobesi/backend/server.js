import express from "express";            // enables to use express servers
import cors from "cors";
import router from '../routes/router.js';   // import router

const app = express();    // creates an instance of an Express application

// middleware
app.use(cors()); // enable CORS for React frontend
app.use(express.json()); // parse JSON request bodies

// test endpoint
app.get("/", (req, res) => {
  res.send("Student Management System API");
});

// use routes
app.use("/api", router);

// start server
const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});