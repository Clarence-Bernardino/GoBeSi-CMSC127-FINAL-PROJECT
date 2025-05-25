import { useState } from 'react';

export function SearchStudent() {
  // state for storing student search input
  const [student, setStudent] = useState({ student_number: '' });
  // state for storing the found student data
  const [currentStudent, setCurrentStudent] = useState(null);
  // state for storing success/error messages
  const [message, setMessage] = useState('');
  // state for tracking loading status
  const [loading, setLoading] = useState(false);

  // handler for input changes
  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  // handler for search button click
  const handleSearch = async () => {
    if (!student.student_number) {
      setMessage('Please enter a student number');
      return;
    }

    // set loading to true when starting the search
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/students/${student.student_number}`);
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
      // set loading to false when search completes (success or failure)
      setLoading(false);
    }
  };

  return (
    <div>
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
          {/* button is disabled when loading to prevent multiple searches */}
          <button onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      {/* message for success or error */}
      {message && (
        <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

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