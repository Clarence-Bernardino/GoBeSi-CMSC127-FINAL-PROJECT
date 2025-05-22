import { useState } from 'react'; // import the useState hook from react
import './App.css'; // import the css file for styling

function App() {
  // initialize the student state with default values
  const [student, setStudent] = useState({
    student_number: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    degree_program: 'BSCS',
    gender: 'M',
    birthdate: '',
    username: '',
    password: ''
  });

  // state for storing the currently fetched student info
  const [currentStudent, setCurrentStudent] = useState(null);
  // state for showing a loading spinner or disabling buttons
  const [loading, setLoading] = useState(false);
  // state for displaying success or error messages
  const [message, setMessage] = useState('');

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
    try {
      // check if all required fields are filled
      if (!student.student_number || !student.first_name || !student.middle_name || 
          !student.last_name || !student.birthdate || !student.username || !student.password) {
        throw new Error('All fields are required'); // throw an error if any field is missing
      }

      // send a POST request to the backend to create a new student
      const response = await fetch('http://localhost:3000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      });

      // check if the response is not successful
      if (!response.ok) {
        throw new Error('Failed to create student');
      }

      // parse the response and update currentStudent state
      const data = await response.json();
      setCurrentStudent(data.data);
      setMessage('Student created successfully!');
    } catch (error) {
      // display error message if something goes wrong
      setMessage(error.message);
    } finally {
      // stop the loading indicator
      setLoading(false);
    }
  };

  // handle searching for a student by student number
  const handleSearch = async () => {
    // check if student number is provided
    if (!student.student_number) {
      setMessage('Please enter a student number');
      return;
    }
    
    setLoading(true); // show loading indicator
    try {
      // send a GET request to the backend to fetch student data
      const response = await fetch(
        `http://localhost:3000/api/students/${student.student_number}`
      );

      // if student is not found
      if (!response.ok) {
        throw new Error('Student not found');
      }

      // parse and store the fetched student data
      const data = await response.json();
      setCurrentStudent(data.data);
      setMessage('');
    } catch (error) {
      // show error if fetch fails
      setMessage(error.message);
      setCurrentStudent(null);
    } finally {
      // stop the loading indicator
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Student Management System</h1>

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
            />
          </div>

          {/* submit button with loading indicator */}
          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Create Student'}
          </button>
        </form>
      </div>

      {/* form for searching a student */}
      <div className="card">
        <h2>Search Student</h2>
        <div className="search-group">
          <input
            type="text"
            placeholder="Enter Student Number"
            name="student_number"
            value={student.student_number}
            onChange={handleChange}
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      {/* message for success or error */}
      {message && <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
        {message}
      </div>}

      {/* display student info if available */}
      {currentStudent && (
        <div className="student-info">
          <h3>Student Details</h3>
          <p><strong>Student Number:</strong> {currentStudent.student_number}</p>
          <p><strong>Full Name:</strong> {currentStudent.first_name} {currentStudent.middle_name} {currentStudent.last_name}</p>
          <p><strong>Degree Program:</strong> {currentStudent.degree_program}</p>
          <p><strong>Gender:</strong> {currentStudent.gender === 'M' ? 'Male' : 'Female'}</p>
          <p><strong>Birthdate:</strong> {new Date(currentStudent.birthdate).toLocaleDateString()}</p>
          <p><strong>Username:</strong> {currentStudent.username}</p>
        </div>
      )}
    </div>
  );
}

export default App; // export the App component for use in other files