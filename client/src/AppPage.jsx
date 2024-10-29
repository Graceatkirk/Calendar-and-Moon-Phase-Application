import React from 'react'; // import React library
import EventCalendar from './components/eventcalendar'; // import the EventCalendar component   
import './App.css'; // import the App.css file
import './index.css'; // import the index.css file


// Create a functional component called AppPage

        const AppPage = () =>{
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

    export default AppPage; // export the component