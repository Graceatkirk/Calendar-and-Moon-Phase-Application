import { useState, useEffect } from 'react';
import './App.css';
import EventCalendar from './components/eventcalendar';
import LoginForm from './components/loginform';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if there's a token in localStorage
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token); // Set isLoggedIn based on whether the token exists
  }, []);

  const handleLogin = (token) => {
    // Store token in localStorage and update isLoggedIn state
    localStorage.setItem('authToken', token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Clear token from localStorage and update isLoggedIn state
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  return (
    <div className="app-container">
      <header>
        <h1>My Calendar App</h1>
      </header>

      <main>
        {isLoggedIn ? (
          <>
            <EventCalendar /> {/* Calendar component */}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <LoginForm onLogin={handleLogin} />
        )}
      </main>

      <footer>
        <p>© 2024 Calendar App</p>
      </footer>
    </div>
  );
}

export default App;