import express from "express";
import { createStudent, getStudentByNumber } from "../controllers/studentController.js";
import { createOrganization } from "../controllers/membershipController.js";
import { createFee } from "../controllers/feeController.js";

const router = express.Router();

// student routes
router.post("/students", createStudent);
router.get("/students/:studentNumber", getStudentByNumber);

// rganization routes
router.post("/organizations", createOrganization);

// fee routes
router.post("/fees", createFee);

export default router;
