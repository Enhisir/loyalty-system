import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { AuthProvider } from './auth/authProvider'
import "@fontsource/big-shoulders-display";
import "@fontsource/big-shoulders-display/300.css";
import "@fontsource/big-shoulders-display/700.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
