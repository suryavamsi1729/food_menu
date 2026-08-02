import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext.jsx'
import { SavedRecipesProvider } from '@/context/SavedRecipesContext.jsx'

import './index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SavedRecipesProvider>
          <App />
        </SavedRecipesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
