import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

// source == https://www.youtube.com/watch?v=Hej48pi_lOc

export const pool = mysql.createPool({ // pool = collection of connections to our database
    host: "127.0.0.1", // change to 'localhost' if connection error arises 
    user: "root",
    password: "",
    database: "gobesi"
}).promise()

export async function showTables() {
    const result = await pool.query("show tables");
    return result;
}

const tables = await showTables();
console.log(tables);

// Student Operations
export async function addStudent(studentData) {
    const [result] = await pool.query(`
        INSERT INTO student 
        (student_number, first_name, middle_name, last_name, degree_program, gender, birthdate, username, password)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
        studentData.student_number,
        studentData.first_name,
        studentData.middle_name,
        studentData.last_name,
        studentData.degree_program,
        studentData.gender,
        studentData.birthdate,
        studentData.username,
        studentData.password
    ]);
    return getStudent(studentData.student_number);
}

export async function getStudent(studentNumber) {
    const [rows] = await pool.query(`
        SELECT * FROM student 
        WHERE student_number = ?
    `, [studentNumber]);
    return rows[0];
}

export async function updateStudent(studentNumber, updateData) {
    await pool.query(`
        UPDATE student
        SET ?
        WHERE student_number = ?
    `, [updateData, studentNumber]);
    return getStudent(studentNumber);
}

export async function deleteStudent(studentNumber) {
    await pool.query(`
        DELETE FROM student 
        WHERE student_number = ?
    `, [studentNumber]);
}

// Organization Operations
export async function addOrganization(orgData) {
    const [result] = await pool.query(`
        INSERT INTO organization 
        (organization_name, classification)
        VALUES (?, ?)
    `, [orgData.organization_name, orgData.classification]);
    return getOrganization(orgData.organization_name);
}

export async function getOrganization(orgName) {
    const [rows] = await pool.query(`
        SELECT * FROM organization 
        WHERE organization_name = ?
    `, [orgName]);
    return rows[0];
}

// Fee Operations
export async function addFee(feeData) {
    const [result] = await pool.query(`
        INSERT INTO fee 
        (amount, academic_year, semester, date_paid, due_date, type, date_issued, status, student_number, organization_name)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
        feeData.amount,
        feeData.academic_year,
        feeData.semester,
        feeData.date_paid,
        feeData.due_date,
        feeData.type,
        feeData.date_issued,
        feeData.status,
        feeData.student_number,
        feeData.organization_name
    ]);
    return result.insertId;  // Returns the auto-generated transaction_id
}

// Membership Operations
export async function addMembership(membershipData) {
    const [result] = await pool.query(`
        INSERT INTO has_a_membership 
        (student_number, organization_name, academic_year, semester, status, committee, semester_joined, role)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
        membershipData.student_number,
        membershipData.organization_name,
        membershipData.academic_year,
        membershipData.semester,
        membershipData.status,
        membershipData.committee,
        membershipData.semester_joined,
        membershipData.role
    ]);
    return result;
}

// Student Record View
export async function getStudentRecord(studentNumber) {
    const [rows] = await pool.query(`
        SELECT * FROM student_record 
        WHERE \`Student Number\` = ?
    `, [studentNumber]);
    return rows[0];
}