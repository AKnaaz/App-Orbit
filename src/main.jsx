import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router";
import { router } from './router/router.jsx';
import AuthProvider from './context/AuthContext/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <div className='max-w-7xl mx-auto'>
      <AuthProvider>
          <RouterProvider router={router} />
      </AuthProvider>
     </div>
  </StrictMode>,
)
