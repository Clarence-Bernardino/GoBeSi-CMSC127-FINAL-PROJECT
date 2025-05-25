import { useState } from 'react';

export function CreateStudent() {
    // initialize the student state
    const [student, setStudent] = useState({
        student_number: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        degree_program: '',
        gender: '',
        birthdate: '',
        username: '',
        password: ''
    });

    // state for storing the currently fetched student info
    const [currentStudent, setCurrentStudent] = useState(null);
    // state for displaying success or error messages
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // update the student state when any input field changes
    const handleChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
    };

    // handle form submission for creating a student
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent default form submission behavior
        setLoading(true); // show loading indicator
        setMessage(''); // Clear previous messages

        try {
            // check if all required fields are filled
            if (
                !student.student_number ||
                !student.first_name ||
                !student.middle_name ||
                !student.last_name ||
                !student.birthdate ||
                !student.username ||
                !student.password
            ) {
                throw new Error('All fields are required');
            }

            // use the postData helper function
            const response = await fetch('http://localhost:3000/api/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(student),
            });
            const data = await response.json();

            // Check both the HTTP status and the success flag
            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Failed to create student');
            }

            // update state with response
            setCurrentStudent(data.data);
            setMessage('Student created successfully!');

            // clear the form
            setStudent({
                student_number: '',
                first_name: '',
                middle_name: '',
                last_name: '',
                degree_program: '',
                gender: '',
                birthdate: '',
                username: '',
                password: ''
            });

        } catch (error) {
            // display error message if something goes wrong
            setMessage(error.message);
        } finally {
            // stop the loading indicator
            setLoading(false);
        }
    };

    return (
        <div className="app">
            {/* form to create new student */}
            <div className="card">
                <h2>Create New Student</h2>
                <form onSubmit={handleSubmit}>
                    {/* input field for student number */}
                    <div className="form-group">
                        <label>Student Number*:</label>
                        <input
                            type="text"
                            name="student_number"
                            value={student.student_number}
                            onChange={handleChange}
                            required
                            placeholder="2023-12345"
                            maxLength={10}
                        />
                    </div>

                    {/* input field for first name */}
                    <div className="form-group">
                        <label>First Name*:</label>
                        <input
                            type="text"
                            name="first_name"
                            value={student.first_name}
                            onChange={handleChange}
                            required
                            placeholder="Juan"
                            maxLength={50}
                        />
                    </div>

                    {/* input field for middle name */}
                    <div className="form-group">
                        <label>Middle Name*:</label>
                        <input
                            type="text"
                            name="middle_name"
                            value={student.middle_name}
                            onChange={handleChange}
                            required
                            placeholder="Miguel"
                            maxLength={20}
                        />
                    </div>

                    {/* input field for last name */}
                    <div className="form-group">
                        <label>Last Name*:</label>
                        <input
                            type="text"
                            name="last_name"
                            value={student.last_name}
                            onChange={handleChange}
                            required
                            placeholder="Dela Cruz"
                            maxLength={20}
                        />
                    </div>

                    {/* dropdown for selecting degree program */}
                    <div className="form-group">
                        <label>Degree Program*:</label>
                        <select
                            name="degree_program"
                            value={student.degree_program}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a program</option>
                            <option value="BSCS">BSCS</option>
                            <option value="BSIT">BSIT</option>
                            <option value="BSIS">BSIS</option>
                            <option value="BSCE">BSCE</option>
                        </select>
                    </div>

                    {/* radio buttons for selecting gender */}
                    <div className="form-group">
                        <label>Gender*:</label>
                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="M"
                                    checked={student.gender === 'M'}
                                    onChange={handleChange}
                                    required
                                />
                                Male
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="F"
                                    checked={student.gender === 'F'}
                                    onChange={handleChange}
                                />
                                Female
                            </label>
                        </div>
                    </div>

                    {/* input field for birthdate */}
                    <div className="form-group">
                        <label>Birthdate*:</label>
                        <input
                            type="date"
                            name="birthdate"
                            value={student.birthdate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* input field for username */}
                    <div className="form-group">
                        <label>Username*:</label>
                        <input
                            type="text"
                            name="username"
                            value={student.username}
                            onChange={handleChange}
                            required
                            placeholder="jmiguel"
                            maxLength={20}
                        />
                    </div>

                    {/* input field for password */}
                    <div className="form-group">
                        <label>Password*:</label>
                        <input
                            type="password"
                            name="password"
                            value={student.password}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                            maxLength={20}
                        />
                    </div>

                    {/* submit button with loading indicator */}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Processing...' : 'Create Student'}
                    </button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}