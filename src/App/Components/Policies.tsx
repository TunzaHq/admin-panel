import React, { useState, useEffect } from "react";
import { makeGetRequest, makePostRequest } from "../Api/ApiHandler";
import ReusableTable from "./ReusableTable";
import { useNavigate } from "react-router-dom";

const Plans: React.FC = () => {
  const [policies, setPolicies] = useState<any[]>([]);
  const [newPolicy, setNewPolicy] = useState<any>({
    name: "",
    description: "",
    price: 0,
    icon: "",
  });

  const navigate = useNavigate()

  useEffect(() => {
    fetchPolicies();
  }, []);

  const policiesCols = [
    {
      Header: "Created On",
      accessor: "created_at"
    },
    {
      Header: "Name",
      accessor: "name"
    },
    {
      Header: "Amount (Ksh.)",
      accessor: "price"
    },      
  ]

  const fetchPolicies = async () => {
    try {
      const token = await sessionStorage.getItem("token");
      const headers = { Authorization: token };
      const response = await makeGetRequest(
        "https://tunza.mybackend.studio/covers",
        headers
      );
      setPolicies(response);
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
      <ReusableTable columns={policiesCols} data={policies} title={"Plans"} />
    </>
  );
};

export default Plans;
