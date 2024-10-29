
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/loginform'; // adjust path as needed
import AppPage from './appPage'; // your app page component

function App() {
  // Add an onLogin handler
  const handleLogin = async (email, password) => {
    // Add your login logic here
    console.log('Logging in with:', email, password);
    // You might want to add actual authentication logic here
    return Promise.resolve(); // Simulate successful login
  };

  return (
    <Routes>
      <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
      <Route path="/app" element={<AppPage />} />
    </Routes>
  );
}

export default App;

