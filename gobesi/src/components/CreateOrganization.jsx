import { useState } from 'react';

export function CreateOrganization() {
    // initialize the organization state
    const [organization, setOrganization] = useState({
        organization_name: '',
        classification: ''
    });

    // state for storing the currently fetched organization info
    const [currentOrganization, setCurrentOrganization] = useState(null);
    // state for displaying success or error messages
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // update the organization state when any input field changes
    const handleChange = (e) => {
        setOrganization({
            ...organization,
            [e.target.name]: e.target.value
        });
    };

    // handle form submission for creating an organization
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // validate required fields
            if (!organization.organization_name || !organization.classification) {
                throw new Error('All fields are required');
            }

            const response = await fetch('http://localhost:3000/api/organizations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(organization),
            });

            const data = await response.json();

            // check both the HTTP status and the success flag
            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Failed to create organization');
            }

            // update state with response
            setCurrentOrganization(data.data);
            setMessage('Organization created successfully!');

            // clear form
            setOrganization({
                organization_name: '',
                classification: ''
            });

        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <h2>Create New Organization</h2>
            <form onSubmit={handleSubmit}>
                {/* input field for organization name */}
                <div className="form-group">
                    <label>Organization Name*:</label>
                    <input
                        type="text"
                        name="organization_name"
                        value={organization.organization_name}
                        onChange={handleChange}
                        required
                        placeholder="ACSS-UPLB"
                        maxLength={50}
                    />
                </div>

                {/* dropdown for classification */}
                <div className="form-group">
                    <label>Classification*:</label>
                    <select
                        name="classification"
                        value={organization.classification}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a classification</option>
                        <option value="Academic">Academic</option>
                        <option value="Cultural">Cultural</option>
                        <option value="Political">Political</option>
                        <option value="Religious">Religious</option>
                        <option value="Sports">Sports</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* submit button with loading indicator */}
                <button type="submit" disabled={loading}>
                    {loading ? 'Processing...' : 'Create Organization'}
                </button>
            </form>

            {/* display success/error messages */}
            {message && (
                <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
                    {message}
                </div>
            )}

            {/* display created organization info */}
            {currentOrganization && (
                <div className="student-info">
                    <h3>Created Organization</h3>
                    <p><strong>Name:</strong> {currentOrganization.organization_name}</p>
                    <p><strong>Classification:</strong> {currentOrganization.classification}</p>
                </div>
            )}
        </div>
    );
}