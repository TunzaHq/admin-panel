import React, { useState } from 'react';
import { makePostRequest } from '../Api/ApiHandler';

interface RegisterFormData {
  full_name: string;
  email: string;
  password: string;
}

interface LoginFormData {
  email: string;
  password: string;
}

const Auth: React.FC = () => {
  const [registerFormData, setRegisterFormData] = useState<RegisterFormData>({
    full_name: '',
    email: '',
    password: ''
  });

  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });

  const [registerMessage, setRegisterMessage] = useState<string>('');
  const [loginMessage, setLoginMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await makePostRequest('/register', registerFormData);
      setRegisterMessage('User registered successfully.');
      setLoginMessage('');
      setError('');
      console.log('Register response:', response);
      // You can handle the successful registration here
    } catch (error) {
      setError('Failed to register. Please try again later.');
      console.error('Register error:', error);
      // You can handle the registration error here
    }
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await makePostRequest('/login', loginFormData);
      setLoginMessage('User logged in successfully.');
      setRegisterMessage('');
      setError('');
      console.log('Login response:', response);
      // You can handle the successful login here
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      console.error('Login error:', error);
      // You can handle the login error here
    }
  };

  const handleRegisterFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleLoginFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  return (
    <div>
      <h1>Register</h1>
      {registerMessage && <p className="success">{registerMessage}</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={registerFormData.full_name}
          onChange={handleRegisterFormChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={registerFormData.email}
          onChange={handleRegisterFormChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={registerFormData.password}
          onChange={handleRegisterFormChange}
        />
        <button type="submit">Register</button>
      </form>

      <h1>Login</h1>
      {loginMessage && <p className="success">{loginMessage}</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginFormData.email}
          onChange={handleLoginFormChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginFormData.password}
          onChange={handleLoginFormChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Auth;
