import React, { useEffect, useState } from 'react';
import {
  makeGetRequest,
  makePostRequest,
  makePutRequest,
  makeDeleteRequest,
} from '../Api/ApiHandler';

interface User {
  id: number;
  full_name: string;
  avatar: string;
  email: string;
  location: string;
  password: string;
  role: string;
  created_at: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await makeGetRequest('/users');
      setUsers(response);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setError('Failed to fetch users. Please try again later.');
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setMessage('');
    setError('');
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await makeDeleteRequest(`/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
      setMessage('User deleted successfully.');
      setError('');
    } catch (error) {
      console.error('Failed to delete user:', error);
      setError('Failed to delete user. Please try again later.');
    }
  };

  const handleUpdateUser = async (updatedUser: User) => {
    try {
      const response = await makePutRequest(`/users/${updatedUser.id}`, updatedUser);
      const updatedUsers = users.map(user => (user.id === updatedUser.id ? response : user));
      setUsers(updatedUsers);
      setSelectedUser(null);
      setMessage('User updated successfully.');
      setError('');
    } catch (error) {
      console.error('Failed to update user:', error);
      setError('Failed to update user. Please try again later.');
    }
  };

  return (
    <div>
      <h1>User Management</h1>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.full_name}</td>
              <td>{user.email}</td>
              <td>{user.location}</td>
              <td>
                <button onClick={() => handleEditUser(user)}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div>
          <h2>Edit User</h2>
          <form onSubmit={() => handleUpdateUser(selectedUser)}>
            {/* Render input fields to update user information */}
            <button type="submit">Save</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
