import React, { useEffect, useState } from "react";
import {
  makeGetRequest,
  makePutRequest,
  makeDeleteRequest,
} from "../Api/ApiHandler";
import { IUser } from "../interfaces/user.interface";
import ReusableTable from "./ReusableTable";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const userCols = [
    {
      Header: "Joined",
      accessor: "created_at",
    },
    {
      Header: "Full Name",
      accessor: "full_name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Role",
      accessor: "role",
    },
  ];

  const fetchUsers = async () => {
    try {
      const token = await sessionStorage.getItem("token");
      const headers = { Authorization: token };
      const response = await makeGetRequest(
        "https://tunza.mybackend.studio/users",
        headers
      );
      console.log(response);
      
      let userList = response.sort((a: { id: number; }, b: { id: number; }) => {
        return b.id - a.id;
      });
      console.log(userList);
      
      setUsers(userList);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast("Error! Failed to fetch users");
      setError("Failed to fetch users. Please try again later.");
    }
  };

  const addUser = () => {
    navigate("/add-user");
  };

  return (
    <>
      <div className="right">
        <button type="submit" className="btn" onClick={addUser}>
          Add User
        </button>
      </div>
      <ReusableTable columns={userCols} data={users} title={"Users"} />
    </>
  );
};

export default UserManagement;
