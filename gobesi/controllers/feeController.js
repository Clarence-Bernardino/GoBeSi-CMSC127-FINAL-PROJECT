// import function to add a fee record to the database
import { addFee, feeExists, getStudent, getOrganization } from "../backend/database.js";

// handles creation of a new fee transaction
export const createFee = async (req, res) => {
  try {
    // get fee data from request body
    const feeData = req.body;

    // check if student exists
    const student = await getStudent(feeData.student_number);
    if (!student) {
      return res.status(404).json({ success: false, error: "Student not found" });
    }

    // validate organization existence
    const organization = await getOrganization(feeData.organization_name);
    if (!organization) {
      return res.status(404).json({ success: false, error: "Organization not found" });
    }

     // check if fee already exists
    const duplicate = await feeExists(feeData);
    if (duplicate) {
      return res.status(409).json({ success: false, error: "Fee already exists" });
    }

    // add fee to the database and get the transaction id
    const transactionId = await addFee(feeData);

    // send success response with the transaction id
    res.status(201).json({ success: true, transactionId });
  } catch (error) {
    // log error and send failure response
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to create fee" });
  }
};