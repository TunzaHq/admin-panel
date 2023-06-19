import React, { useState, useEffect } from 'react';
import { makeGetRequest, makePostRequest } from '../Api/ApiHandler';

const Policies: React.FC = () => {
  const [policies, setPolicies] = useState<any[]>([]);
  const [newPolicy, setNewPolicy] = useState<any>({
    name: '',
    description: '',
    price: 0,
    icon: '',
  });

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      const response = await makeGetRequest('/plans');
      setPolicies(response);
    } catch (error) {
      console.error('Failed to fetch policies:', error);
    }
  };

  const createPolicy = async () => {
    try {
      const response = await makePostRequest('/plans', newPolicy);
      console.log('Policy created successfully:', response);
      // Clear the new policy form
      setNewPolicy({
        name: '',
        description: '',
        price: 0,
        icon: '',
      });
      // Fetch updated policies list
      fetchPolicies();
    } catch (error) {
      console.error('Failed to create policy:', error);
    }
  };

  return (
    <div className='ms-5'>
      <h2>Policies</h2>

      {/* Display existing policies */}
      <h3>Existing Policies</h3>
{Array.isArray(policies) ? (
  policies.map((policy) => (
    <div key={policy.id} className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{policy.name}</h5>
        <p className="card-text">Description: {policy.description}</p>
        <p className="card-text">Price: {policy.price}</p>
        <p className="card-text">Icon: {policy.icon}</p>
      </div>
    </div>
  ))
) : (
  <p>No policies found.</p>
)}


      {/* Create new policy form */}
      <h3>Create New Policy</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPolicy();
        }}
      >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={newPolicy.name}
            onChange={(e) =>
              setNewPolicy({ ...newPolicy, name: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={newPolicy.description}
            onChange={(e) =>
              setNewPolicy({ ...newPolicy, description: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price:</label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={newPolicy.price}
            onChange={(e) =>
              setNewPolicy({ ...newPolicy, price: parseInt(e.target.value) })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="icon" className="form-label">Icon:</label>
          <input
            type="text"
            className="form-control"
            id="icon"
            value={newPolicy.icon}
            onChange={(e) =>
              setNewPolicy({ ...newPolicy, icon: e.target.value })
            }
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Policy</button>
      </form>
    </div>
  );
};

export default Policies;
