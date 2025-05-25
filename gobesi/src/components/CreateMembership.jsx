import { useState } from 'react';

export function CreateMembership() {
    // state for storing membership form data
    const [membership, setMembership] = useState({
        student_number: '',
        organization_name: '',
        academic_year: '',
        semester: '',
        status: '',
        committee: '',
        semester_joined: '',
        role: ''
    });

    // state for success/error messages
    const [message, setMessage] = useState('');
    // state for loading status
    const [loading, setLoading] = useState(false);
    // state for storing the created membership data
    const [currentMembership, setCurrentMembership] = useState(null);

    // handles input changes for all form fields
    const handleChange = (e) => {
        setMembership({
            ...membership,
            [e.target.name]: e.target.value
        });
    };

    // handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // validate required fields
            if (
                !membership.student_number ||
                !membership.organization_name ||
                !membership.academic_year ||
                !membership.semester ||
                !membership.status ||
                !membership.semester_joined ||
                !membership.role
            ) {
                throw new Error('All required fields must be filled');
            }

            // send membership data to the API
            const response = await fetch('http://localhost:3000/api/memberships', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(membership),
            });

            const data = await response.json();

            // check for API errors
            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Failed to create membership');
            }

            // on success:
            setCurrentMembership(data.data); // store created membership
            setMessage('Membership created successfully!');
            // reset form fields
            setMembership({
                student_number: '',
                organization_name: '',
                academic_year: '',
                semester: '',
                status: '',
                committee: '',
                semester_joined: '',
                role: ''
            });

        } catch (error) {
            setMessage(error.message); // show error message
        } finally {
            setLoading(false); // always stop loading
        }
    };

    return (
        <div className="app">
            <div className="card">
                <h2>Create New Membership</h2>
                {/* membership form */}
                <form onSubmit={handleSubmit}>
                    {/* student number field */}
                    <div className="form-group">
                        <label>Student Number*:</label>
                        <input
                            type="text"
                            name="student_number"
                            value={membership.student_number}
                            onChange={handleChange}
                            required
                            placeholder="2023-12345"
                            maxLength={10}
                        />
                    </div>

                    {/* organization name field */}
                    <div className="form-group">
                        <label>Organization Name*:</label>
                        <input
                            type="text"
                            name="organization_name"
                            value={membership.organization_name}
                            onChange={handleChange}
                            required
                            placeholder="ACSS-UPLB"
                            maxLength={50}
                        />
                    </div>

                    {/* academic year field */}
                    <div className="form-group">
                        <label>Academic Year*:</label>
                        <input
                            type="text"
                            name="academic_year"
                            value={membership.academic_year}
                            onChange={handleChange}
                            required
                            placeholder="2024-2025"
                            maxLength={9}
                        />
                    </div>

                    {/* semester dropdown */}
                    <div className="form-group">
                        <label>Semester*:</label>
                        <select
                            name="semester"
                            value={membership.semester}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                    </div>

                    {/* status dropdown */}
                    <div className="form-group">
                        <label>Status*:</label>
                        <select
                            name="status"
                            value={membership.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Alumni">Alumni</option>
                        </select>
                    </div>

                    {/* committee field (optional) */}
                    <div className="form-group">
                        <label>Committee:</label>
                        <input
                            type="text"
                            name="committee"
                            value={membership.committee}
                            onChange={handleChange}
                            placeholder="e.g. Finance, Logistics"
                            maxLength={30}
                        />
                    </div>

                    {/* semester joined dropdown */}
                    <div className="form-group">
                        <label>Semester Joined*:</label>
                        <select
                            name="semester_joined"
                            value={membership.semester_joined}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                    </div>

                    {/* role field */}
                    <div className="form-group">
                        <label>Role*:</label>
                        <input
                            type="text"
                            name="role"
                            value={membership.role}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Member, President"
                            maxLength={10}
                        />
                    </div>

                    {/* submit button */}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Create Membership'}
                    </button>
                </form>
                
                {/* display success/error messages */}
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}