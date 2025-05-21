import express from "express";            // enables to use express servers
import cors from "cors";
import { pool } from "./database.js"; // Import your database connection

const app = express();    // creates an instance of an Express application

// middleware
app.use(cors()); // enable CORS for React frontend
app.use(express.json()); // parse JSON request bodies

// test endpoint
app.get("/", (req, res) => {
  res.send("Student Management System API");
});

// Student endpoints
app.post("/api/students", async (req, res) => {
  try {
    const studentData = req.body;
    const [result] = await pool.query(
      "INSERT INTO student SET ?",
      [studentData]
    );
    res.status(201).json({ success: true, data: studentData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to create student" });
  }
});

app.get("/api/students/:studentNumber", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM student WHERE student_number = ?",
      [req.params.studentNumber]
    );
    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: "Student not found" });
    }
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Database error" });
  }
});

// Organization endpoints
app.post("/api/organizations", async (req, res) => {
  try {
    const orgData = req.body;
    const [result] = await pool.query(
      "INSERT INTO organization SET ?",
      [orgData]
    );
    res.status(201).json({ success: true, data: orgData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to create organization" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});