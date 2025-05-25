import { useState } from 'react';

export function SearchOrganization() {
  // state for storing search input value
  const [searchTerm, setSearchTerm] = useState('');
  // state for storing found organization data
  const [organization, setOrganization] = useState(null);
  // state for storing success/error messages
  const [message, setMessage] = useState('');
  // state for tracking loading status
  const [loading, setLoading] = useState(false);

  // handles the search form submission
  const handleSearch = async (e) => {
    // prevent default form submission behavior
    e.preventDefault();
    // exit if search term is empty
    if (!searchTerm.trim()) return;

    // set loading state and clear any previous messages
    setLoading(true);
    setMessage('');
    
    try {
      // make api request to search for organization
      const response = await fetch(`http://localhost:3000/api/organizations/${encodeURIComponent(searchTerm)}`);
      // parse response data
      const data = await response.json();

      // check if response was not successful
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Organization not found');
      }

      // store organization data and set success message
      setOrganization(data.data);
      setMessage('Organization found!');
    } catch (error) {
      // handle errors by showing error message and clearing organization data
      setMessage(error.message);
      setOrganization(null);
    } finally {
      // always set loading to false when done
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Search Organization</h2>
      {/* search form */}
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <label>Organization Name:</label>
          {/* search input field */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter organization name"
            required
          />
        </div>
        {/* search button - disabled during loading */}
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* display success/error message */}
      {message && (
        <div className={`message ${organization ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      {/* display organization details if found */}
      {organization && (
        <div className="student-info">
          <h3>Organization Details</h3>
          <p><strong>Name:</strong> {organization.organization_name}</p>
          <p><strong>Classification:</strong> {organization.classification}</p>
        </div>
      )}
    </div>
  );
}