import { useState } from 'react';
import './App.css';

function App() {
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

  const [currentStudent, setCurrentStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Validate required fields
      if (!student.student_number || !student.first_name || !student.middle_name || 
          !student.last_name || !student.birthdate || !student.username || !student.password) {
        throw new Error('All fields are required');
      }

      const response = await fetch('http://localhost:3000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      });

      if (!response.ok) {
        throw new Error('Failed to create student');
      }

      const data = await response.json();
      setCurrentStudent(data.data);
      setMessage('Student created successfully!');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!student.student_number) {
      setMessage('Please enter a student number');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/students/${student.student_number}`
      );

      if (!response.ok) {
        throw new Error('Student not found');
      }

      const data = await response.json();
      setCurrentStudent(data.data);
      setMessage('');
    } catch (error) {
      setMessage(error.message);
      setCurrentStudent(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Student Management System</h1>

      <div className="card">
        <h2>Create New Student</h2>
        <form onSubmit={handleSubmit}>
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

          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Create Student'}
          </button>
        </form>
      </div>

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

      {message && <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
        {message}
      </div>}

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

export default App;