import React, { useState, useEffect } from 'react';
import { makeGetRequest, makePutRequest } from '../Api/ApiHandler';
import '../Style/claims.css';

interface Claim {
  id: number;
  location: string;
  amount: number;
  subscription_id: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const Claims: React.FC = () => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const response = await makeGetRequest('/claims');
      setClaims(response);
    } catch (error) {
      console.error('Failed to fetch claims:', error);
      setError('Failed to fetch claims. Please try again later.');
    }
  };

  const handleEditClaim = (claim: Claim) => {
    setSelectedClaim(claim);
    setMessage('');
    setError('');
  };

  const handleUpdateClaim = async (updatedClaim: Claim) => {
    try {
      const response = await makePutRequest(`/claims/${updatedClaim.id}`, {
        status: 'pending',
      });
      const updatedClaims = claims.map((claim) =>
        claim.id === updatedClaim.id ? response : claim
      );
      setClaims(updatedClaims);
      setSelectedClaim(null);
      setMessage('Claim updated successfully.');
      setError('');
    } catch (error) {
      console.error('Failed to update claim:', error);
      setError('Failed to update claim. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Claims</h1>

      {message && <p className="alert alert-success">{message}</p>}
      {error && <p className="alert alert-danger">{error}</p>}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Location</th>
            <th>Amount</th>
            <th>Subscription ID</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(claims) &&
            claims.map((claim) => (
              <tr key={claim.id}>
                <td>{claim.id}</td>
                <td>{claim.location}</td>
                <td>{claim.amount}</td>
                <td>{claim.subscription_id}</td>
                <td>{claim.description}</td>
                <td>{claim.status}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEditClaim(claim)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {selectedClaim && (
        <div>
          <h2>Edit Claim</h2>
          <form onSubmit={() => handleUpdateClaim(selectedClaim)}>
            {/* Render input fields to update claim information */}
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Claims;
