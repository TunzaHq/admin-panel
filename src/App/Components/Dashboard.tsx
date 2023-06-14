import React from 'react';
import '../Style/dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
        <h1 style={{fontWeight: 900}}>Dashboard</h1>
        <p style={{fontWeight: 700, color: 'var(--gray)'}}>Welcome Paul</p>

        <div className='d-flex'>
            <img src="/assets/svg/calendar.svg" alt="calendar icon" />
            <p className='my-auto mx-3'>Pick Date Range</p>
        </div>
    </div>
  );
};

export default Dashboard;
