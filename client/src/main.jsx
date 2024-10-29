import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App';
import './index.css'; // Import your CSS styles

// Get the root element from the HTML
const rootElement = document.getElementById('root');

// Create a root and render the App component wrapped in BrowserRouter
const root = createRoot(rootElement); // Create a root
root.render(
  <BrowserRouter> {/* Wrap App with BrowserRouter */}
    <App />
  </BrowserRouter>
);
