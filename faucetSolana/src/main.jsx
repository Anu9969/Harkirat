import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppEth from './AppEth.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppEth />
  </StrictMode>,
)
