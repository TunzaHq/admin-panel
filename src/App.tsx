import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Loader from './App/Components/Loader/Loader';
import Login from './App/Components/Login';
import Dashboard from './App/Components/Dashboard';
import Navbar from './App/Components/Navbar';
import Policies from './App/Components/Policies';
import UserManagement from './App/Components/User';
import Register from './App/Components/Register';


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simulating an asynchronous check for user authentication
  // Replace this with actual authentication logic
  useEffect(() => {
    setTimeout(() => {
      // Assuming the user is authenticated
      setIsLoggedIn(true);
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  if (!isLoggedIn) window.location.href = '/login';

  return (

    <div>
        <BrowserRouter>
            <Navbar>
                <Routes>
                    <Route path='/' element={<Login/>}/>
                    <Route path='/dashboard' element={<Dashboard/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/policies' element={<Policies />} />
                    <Route path='/new-policy' element={<Policies />} />
                    <Route path='/user-management' element={<UserManagement />}/>
                </Routes>
            </Navbar>
        </BrowserRouter>
    </div>
  );
}

export default App;
