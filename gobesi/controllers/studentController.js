// import functions to interact with the database
import { addStudent, getStudent } from "../backend/database.js";

// handles creation of a new student
export const createStudent = async (req, res) => {
  try {
    // get student data from request body
    const studentData = req.body;

    // add the student to the database
    const student = await addStudent(studentData);

    // send success response with created student data
    res.status(201).json({ success: true, data: student });
  } catch (error) {
    // log error and send failure response
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to create student" });
  }
};

// handles retrieving a student using student number
export const getStudentByNumber = async (req, res) => {
  try {
    // get student from the database using the route parameter
    const student = await getStudent(req.params.studentNumber);

    // if student not found, send 404 response
    if (!student) {
      return res.status(404).json({ success: false, error: "Student not found" });
    }

    // send success response with student data
    res.json({ success: true, data: student });
  } catch (error) {
    // log error and send failure response
    console.error(error);
    res.status(500).json({ success: false, error: "Database error" });
  }
};