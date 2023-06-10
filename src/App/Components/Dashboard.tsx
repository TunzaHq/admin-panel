import React from 'react';
import '../Style/dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="card-container">
        <div className="card">
          <h2>Card 1</h2>
          {/* Add content for Card 1 */}
        </div>

        <div className="card">
          <h2>Card 2</h2>
          {/* Add content for Card 2 */}
        </div>

        <div className="card">
          <h2>Card 3</h2>
          {/* Add content for Card 3 */}
        </div>

        <div className="card">
          <h2>Card 4</h2>
          {/* Add content for Card 4 */}
        </div>

        <div className="card">
          <h2>Card 5</h2>
          {/* Add content for Card 5 */}
        </div>

        <div className="card">
          <h2>Card 6</h2>
          {/* Add content for Card 6 */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
