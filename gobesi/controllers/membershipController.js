import { addMembership, getStudent, getOrganization, membershipExists } from "../backend/database.js";

export const createMembership = async (req, res) => {
  try {
    const membershipData = req.body;

    // validate student existence
    const student = await getStudent(membershipData.student_number);
    if (!student) {
      return res.status(404).json({ success: false, error: "Student not found" });
    }

    // validate organization existence
    const organization = await getOrganization(membershipData.organization_name);
    if (!organization) {
      return res.status(404).json({ success: false, error: "Organization not found" });
    }

    // check if the student already has a memberhsip to that org
    if (await membershipExists(membershipData.student_number, membershipData.organization_name)) {
      return res.status(400).json({ success: false, error: "Membership already exists" });
    } 

    // Proceed to add membership
    const membership = await addMembership(membershipData);

    res.status(201).json({ success: true, data: membership });
  } catch (error) {
    console.error("Error creating membership:", error);
    res.status(500).json({ success: false, error: "Failed to create Membership" });
  }
};
