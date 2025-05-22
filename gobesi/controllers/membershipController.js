// import function to add a new organization to the database
import { addOrganization } from "../backend/database.js";

// handles creation of a new organization
export const createOrganization = async (req, res) => {
  try {
    // get organization data from request body
    const orgData = req.body;

    // add the organization to the database
    const organization = await addOrganization(orgData);

    // send success response with organization data
    res.status(201).json({ success: true, data: organization });
  } catch (error) {
    // log error and send failure response
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to create organization" });
  }
};
