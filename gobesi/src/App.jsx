import { useState } from 'react';
import { CreateStudent } from './components/CreateStudent';
import { SearchStudent } from './components/SearchStudent';
import { CreateOrganization } from './components/CreateOrganization';
import { SearchOrganization } from './components/SearchOrganization';
import { CreateMembership } from './components/Createmembership';
import { CreateFee } from './components/CreateFee';
import './App.css';

function App() {
  // define state to track which tab is currently active
  const [activeTab, setActiveTab] = useState('createStudent');

  return (
    <div className="app">
      <h1>Student Management System</h1>

      <div className="tab-container">
        <div className="tab-header">
          <button
            className={`tab-button ${activeTab === 'createStudent' ? 'active' : ''}`}
            onClick={() => setActiveTab('createStudent')}
          >
            Create Student
          </button>
          <button
            className={`tab-button ${activeTab === 'searchStudent' ? 'active' : ''}`}
            onClick={() => setActiveTab('searchStudent')}
          >
            Search Student
          </button>
          <button
            className={`tab-button ${activeTab === 'createOrganization' ? 'active' : ''}`}
            onClick={() => setActiveTab('createOrganization')}
          >
            Create Organization
          </button>
          <button
            className={`tab-button ${activeTab === 'searchOrganization' ? 'active' : ''}`}
            onClick={() => setActiveTab('searchOrganization')}
          >
            Search Organization
          </button>
          <button
            className={`tab-button ${activeTab === 'createMembership' ? 'active' : ''}`}
            onClick={() => setActiveTab('createMembership')}
          >
            Create Membership
          </button>
          <button
            className={`tab-button ${activeTab === 'createFee' ? 'active' : ''}`}
            onClick={() => setActiveTab('createFee')}
          >
            Create Membership
          </button>
        </div>

        {/* render the component based on the selected tab */}
        <div className="tab-content">
          {activeTab === 'createStudent' && <CreateStudent />}
          {activeTab === 'searchStudent' && <SearchStudent />}
          {activeTab === 'createOrganization' && <CreateOrganization />}
          {activeTab === 'searchOrganization' && <SearchOrganization />}
          {activeTab === 'createMembership' && <CreateMembership />}
          {activeTab === 'createFee' && <CreateFee />}
        </div>
      </div>
    </div>
  );
}

export default App;
