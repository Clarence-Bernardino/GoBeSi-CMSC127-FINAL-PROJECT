// import function to add a new organization to the database
import { addOrganization, getOrganization } from "../backend/database.js";

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

export const findOrganization = async (req, res) => {
  try {
    const orgName = req.params.name;
    const organization = await getOrganization(orgName);

    if (!organization) {
      return res.status(404).json({ 
        success: false, 
        error: "Organization not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      data: organization 
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to search organization" 
    });
  }
};
