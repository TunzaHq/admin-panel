import React, { useState } from 'react';
import { makePostRequest } from '../Api/ApiHandler';
import { useNavigate } from 'react-router-dom';

interface NewPolicy {
  name: string;
  description: string;
  price: number;
  icon: string;
}

const AddPolicy: React.FC = () => {
  const [newPolicy, setNewPolicy] = useState<NewPolicy>({
    name: '',
    description: '',
    price: 0,
    icon: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPolicy((prevPolicy: NewPolicy) => ({ ...prevPolicy, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await makePostRequest('/policies', newPolicy);
      console.log('Policy added successfully:', response);
      navigate('/policies'); // Redirect to the policies page after adding the policy
    } catch (error) {
      console.error('Failed to add policy:', error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-2xl font-bold mb-4">Add Policy</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label className="text-lg">Name:</label>
          <input
            type="text"
            name="name"
            value={newPolicy.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-64"
          />
        </div>
        <div>
          <label className="text-lg">Description:</label>
          <input
            type="text"
            name="description"
            value={newPolicy.description}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-64"
          />
        </div>
        <div>
          <label className="text-lg">Price:</label>
          <input
            type="number"
            name="price"
            value={newPolicy.price}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-64"
          />
        </div>
        <div>
          <label className="text-lg">Icon:</label>
          <input
            type="text"
            name="icon"
            value={newPolicy.icon}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-64"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add Policy
        </button>
      </form>
    </div>
  );
};

export default AddPolicy;
