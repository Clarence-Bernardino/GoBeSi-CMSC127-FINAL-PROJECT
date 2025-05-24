// import function to add a new Membership to the database
import { addMembership } from "../backend/database.js";

// handles creation of a new Membership
export const createMembership = async (req, res) => {
  try {
    // get Membership data from request body
    const membershipData = req.body;

    // add the Membership to the database
    const membership = await addMembership(membershipData);

    // send success response with Membership data
    res.status(201).json({ success: true, data: membership });
  } catch (error) {
    // log error and send failure response
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to create Membership" });
  }
};
