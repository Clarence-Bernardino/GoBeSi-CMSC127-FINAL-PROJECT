import { useState } from 'react';

export function CreateFee() {
    // state for storing fee form data
    const [fee, setFee] = useState({
        amount: '',
        academic_year: '',
        semester: '',
        date_paid: '',
        due_date: '',
        type: '',
        date_issued: '',
        status: '',
        student_number: '',
        organization_name: ''
    });

    // state for success/error messages
    const [message, setMessage] = useState('');
    // state for loading status
    const [loading, setLoading] = useState(false);
    // state for storing the created fee data
    const [currentFee, setCurrentFee] = useState(null);

    // handles input changes for all form fields
    const handleChange = (e) => {
        setFee({
            ...fee,
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
                !fee.amount ||
                !fee.academic_year ||
                !fee.semester ||
                !fee.due_date ||
                !fee.type ||
                !fee.date_issued ||
                !fee.status ||
                !fee.student_number ||
                !fee.organization_name
            ) {
                throw new Error('All required fields must be filled');
            }

            // prepare fee data with amount converted to number
            const feeData = {
                ...fee,
                amount: parseFloat(fee.amount)
            };

            // send fee data to the API
            const response = await fetch('http://localhost:3000/api/fees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(feeData),
            });

            const data = await response.json();

            // check for API errors
            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Failed to create fee');
            }

            // on success:
            setCurrentFee({ ...feeData, transaction_id: data.transactionId }); // store created fee with transaction ID
            setMessage(`Fee created successfully! Transaction ID: ${data.transactionId}`);
            // reset form fields
            setFee({
                amount: '',
                academic_year: '',
                semester: '',
                date_paid: '',
                due_date: '',
                type: '',
                date_issued: '',
                status: '',
                student_number: '',
                organization_name: ''
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
                <h2>Create New Fee</h2>
                {/* fee creation form */}
                <form onSubmit={handleSubmit}>
                    {/* student information section */}
                    <div className="form-group">
                        <label>Student Number*:</label>
                        <input
                            type="text"
                            name="student_number"
                            value={fee.student_number}
                            onChange={handleChange}
                            required
                            placeholder="2023-12345"
                            maxLength={10}
                        />
                    </div>

                    <div className="form-group">
                        <label>Organization Name*:</label>
                        <input
                            type="text"
                            name="organization_name"
                            value={fee.organization_name}
                            onChange={handleChange}
                            required
                            placeholder="ACSS-UPLB"
                            maxLength={50}
                        />
                    </div>

                    {/* fee amount field with number input */}
                    <div className="form-group">
                        <label>Amount* (PHP):</label>
                        <input
                            type="number"
                            name="amount"
                            value={fee.amount}
                            onChange={handleChange}
                            required
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                        />
                    </div>

                    {/* academic information section */}
                    <div className="form-group">
                        <label>Academic Year*:</label>
                        <input
                            type="text"
                            name="academic_year"
                            value={fee.academic_year}
                            onChange={handleChange}
                            required
                            placeholder="2023-2024"
                            maxLength={9}
                        />
                    </div>

                    <div className="form-group">
                        <label>Semester*:</label>
                        <select
                            name="semester"
                            value={fee.semester}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                    </div>

                    {/* fee type dropdown */}
                    <div className="form-group">
                        <label>Fee Type*:</label>
                        <select
                            name="type"
                            value={fee.type}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value="Membership">Membership</option>
                            <option value="Event">Event</option>
                            <option value="Donation">Donation</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* payment status dropdown */}
                    <div className="form-group">
                        <label>Status*:</label>
                        <select
                            name="status"
                            value={fee.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value="Paid">Paid</option>
                            <option value="Unpaid">Unpaid</option>
                            <option value="Overdue">Overdue</option>
                        </select>
                    </div>

                    {/* date fields */}
                    <div className="form-group">
                        <label>Date Issued*:</label>
                        <input
                            type="date"
                            name="date_issued"
                            value={fee.date_issued}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Due Date*:</label>
                        <input
                            type="date"
                            name="due_date"
                            value={fee.due_date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* conditional date paid field (only enabled when status is Paid) */}
                    <div className="form-group">
                        <label>Date Paid:</label>
                        <input
                            type="date"
                            name="date_paid"
                            value={fee.date_paid}
                            onChange={handleChange}
                            disabled={fee.status !== 'Paid'}
                        />
                    </div>

                    {/* submit button */}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Create Fee'}
                    </button>
                </form>
                
                {/* message display with success/error styling */}
                {message && (
                    <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
                        {message}
                    </div>
                )}

                {/* display created fee details if successful */}
                {currentFee && (
                    <div className="student-info">
                        <h3>Fee Details</h3>
                        <p><strong>Transaction ID:</strong> {currentFee.transaction_id}</p>
                        <p><strong>Amount:</strong> PHP {parseFloat(currentFee.amount).toFixed(2)}</p>
                        <p><strong>Student:</strong> {currentFee.student_number}</p>
                        <p><strong>Organization:</strong> {currentFee.organization_name}</p>
                    </div>
                )}
            </div>
        </div>
    );
}