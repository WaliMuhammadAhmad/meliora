import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ContextApiStates from './ContextApi/ContextApiStates';
import { Auth0Provider } from '@auth0/auth0-react';

// Auth0 configuration (from your Auth0 dashboard)
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

// Callback function for handling redirects after login
const onRedirectCallback = (appState) => {
  window.history.replaceState(
    {},
    document.title,
    appState?.returnTo || window.location.pathname
  );
};

// Creating the root React element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Wrapping your entire app with Auth0Provider to provide authentication context
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      <ContextApiStates>
        <App />
      </ContextApiStates>
    </Auth0Provider>
  </React.StrictMode>
);

// Measure performance (optional)
reportWebVitals();
