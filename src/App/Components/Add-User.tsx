import React, { useState } from "react";
import { makePostRequest } from "../Api/ApiHandler";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddUser: React.FC = () => {
  const [newUser, setNewUser] = useState({
    full_name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = await sessionStorage.getItem("token");
      const headers = { Authorization: token };
      const response = await makePostRequest(
        "https://tunza.mybackend.studio/auth/register",
        newUser,
        headers
      );
      toast.success("Success")
      navigate('/users')      
      setNewUser({
        full_name: "",
        email: "",
        password: "",
      });
      // Handle any further actions after user creation, such as redirecting to another page
    } catch (error) {
      console.error("Failed to add user:", error);
      setError("Failed to add user. Please try again later.");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add User</h1>

      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="full_name" className="block mb-1">
            Full Name:
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded py-2 px-3"
            id="full_name"
            name="full_name"
            value={newUser.full_name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">
            Email:
          </label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded py-2 px-3"
            id="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">
            Password:
          </label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded py-2 px-3"
            id="password"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn">
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
