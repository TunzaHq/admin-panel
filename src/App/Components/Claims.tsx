import React, { useState, useEffect } from 'react';
import { makeGetRequest, makePutRequest } from '../Api/ApiHandler';
import '../Style/claims.css';
import ReusableTable from './ReusableTable';

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

  const claimsCols = [
    {
      Header: "Created On",
      accessor: "createdAt"
    },
    {
      Header: "Status",
      accessor: "status"
    },
    {
      Header: "Amount (Ksh.)",
      accessor: "amount"
    },      
  ]

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const token = await sessionStorage.getItem("token");
      const headers = { Authorization: token };
      const response = await makeGetRequest(
        "https://tunza.mybackend.studio/claims",
        headers
      );
      setClaims(response);
    } catch (error) {
      console.error('Failed to fetch claims:', error);
      setError('Failed to fetch claims. Please try again later.');
    }
  };

  return (
    <>
    <div className="right">
      <button type="submit" className="btn">Add Claim</button>
    </div>
      <ReusableTable
        columns={claimsCols}
        data={claims}
        title={"Claims"}
      />
    </>
  );
};

export default Claims;
