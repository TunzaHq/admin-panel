import React, { useState } from 'react';
import { makePostRequest } from '../Api/ApiHandler';
import { useNavigate } from 'react-router-dom';

interface NewClaim {
  location: string;
  amount: number;
  subscription_id: string;
  description: string;
}

const AddClaim: React.FC = () => {
  const [newClaim, setNewClaim] = useState<NewClaim>({
    location: '',
    amount: 0,
    subscription_id: '',
    description: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewClaim((prevClaim) => ({ ...prevClaim, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await makePostRequest('/claims', newClaim);
      console.log('Claim added successfully:', response);
      navigate('/claims'); // Redirect to the claims page after adding the claim
    } catch (error) {
      console.error('Failed to add claim:', error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-2xl font-bold mb-4">Add Claim</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label className="text-lg">Location:</label>
          <input
            type="text"
            name="location"
            value={newClaim.location}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-64"
          />
        </div>
        <div>
          <label className="text-lg">Amount:</label>
          <input
            type="number"
            name="amount"
            value={newClaim.amount}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-64"
          />
        </div>
        <div>
          <label className="text-lg">Subscription ID:</label>
          <input
            type="text"
            name="subscription_id"
            value={newClaim.subscription_id}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-64"
          />
        </div>
        <div>
          <label className="text-lg">Description:</label>
          <input
            type="text"
            name="description"
            value={newClaim.description}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-64"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add Claim
        </button>
      </form>
    </div>
  );
};

export default AddClaim;
