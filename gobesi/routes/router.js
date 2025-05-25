import express from "express";
import { createStudent, getStudentByNumber } from "../controllers/studentController.js";
import { createOrganization, findOrganization} from "../controllers/organizationController.js";
import { createMembership} from "../controllers/membershipController.js";
import { createFee } from "../controllers/feeController.js";

const router = express.Router();

// student routes
router.post("/students", createStudent);
router.get("/students/:studentNumber", getStudentByNumber);

// organization routes
router.post("/organizations", createOrganization);
router.get("/organizations/:name", findOrganization);

// membership routes
router.post("/memberships", createMembership);

// fee routes
router.post("/fees", createFee);

export default router;
