import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import EventCalendar from './components/eventcalendar';
import LoginForm from './components/loginform';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
    // Replace this with real authentication logic
    if (username && password) {
      setIsLoggedIn(true); // Set logged-in state to true on successful login
    } else {
      alert("Please enter a valid username and password.");
    }
  };

  return (
    <div className="app-container">
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <>
          <header>
            <h1>My Calendar App</h1>
          </header>
          
          <main>
            <EventCalendar /> {/* Calendar component */}
          </main>
          
          <footer>
            <p>© 2024 Calendar App</p>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;