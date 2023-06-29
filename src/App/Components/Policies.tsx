import React, { useState, useEffect } from "react";
import { makeGetRequest, makePostRequest } from "../Api/ApiHandler";
import ReusableTable from "./ReusableTable";
import { useNavigate } from "react-router-dom";

interface Policy {
  created_at: string;
  name: string;
  price: number;
}

const Plans: React.FC = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPolicies();
  }, []);

  const policiesCols = [
    {
      Header: "Created On",
      accessor: "created_at",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Amount (Ksh.)",
      accessor: "price",
    },
  ];

  const fetchPolicies = async () => {
    try {
      const token = await sessionStorage.getItem("token");
      const headers = { Authorization: token };
      const response = await makeGetRequest(
        "https://tunza.mybackend.studio/covers",
        headers
      );
      if (Array.isArray(response)) {
        setPolicies(response);
      }
    } catch (error) {
      console.error("Failed to fetch policies:", error);
    }
  };

  const addPlan = () => {
    navigate("/add-plan");
  };

  return (
    <>
      <div className="right">
        <button type="submit" className="btn" onClick={addPlan}>
          Add Policies
        </button>
      </div>
      {Array.isArray(policies) ? (
        <ReusableTable columns={policiesCols} data={policies} title={"Plans"} />
      ) : (
        <p>No policies available.</p>
      )}
    </>
  );
};

export default Plans;
