import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AgentCard from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AgentCard/>
  </StrictMode>,
)
