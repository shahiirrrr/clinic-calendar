// Entry point for the React application
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import global styles (Tailwind or custom SCSS/CSS)
import './index.css';

// Import the main App component
import App from './App';

// Create a root element for rendering the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App inside React.StrictMode for highlighting potential issues
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
