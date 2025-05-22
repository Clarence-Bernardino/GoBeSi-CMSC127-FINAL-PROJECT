// import function to add a fee record to the database
import { addFee } from "../backend/database.js";

// handles creation of a new fee transaction
export const createFee = async (req, res) => {
  try {
    // get fee data from request body
    const feeData = req.body;

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