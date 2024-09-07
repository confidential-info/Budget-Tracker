//React and React-Router-Dom Imports
import React from 'react'
import ReactDOM from 'react-dom/client'

//CSS and App.jsx Import
import './index.css'
import App from './App'

//React Pop-Up i.e. Toastify 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Authorization Import i.e. Clerk
import { ClerkProvider } from '@clerk/clerk-react'

// Import your publishable key
const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

console.log('Publishable Key:', PUBLISHABLE_KEY); // Debug log

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <App />
      <ToastContainer />
    </ClerkProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals  
