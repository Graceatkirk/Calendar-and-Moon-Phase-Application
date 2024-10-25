import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import EventCalendar from './components/eventcalendar';

function App() {
    return (
      <div className="app-container">
        <header>
          <h1>My Calendar App</h1>
        </header>
        
        <main>
          <EventCalendar /> {/* Calendar component */}
        </main>
        
        <footer>
          <p>© 2024 Calendar App</p>
        </footer>
      </div>
    );
  }
  
  
  export default App;