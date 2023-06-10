import React, { useState, useEffect } from 'react';
import './App.css';
import Loader from './App/Components/Loader/Loader';
import Auth from './App/Components/Auth';
import Dashboard from './App/Components/Dashboard';
import Navbar from './App/Components/Navbar';

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

  return (
    <div className="App">
      {isLoggedIn && <Navbar />}
      <div className="content">
        {isLoggedIn ? <Dashboard /> : <Auth />}
      </div>
    </div>
  );
}

export default App;
