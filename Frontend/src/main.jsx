import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './style.scss'
import { SITE_CONFIG } from './config/site.constants.js'

document.title = SITE_CONFIG.title

const descriptionMeta = document.querySelector('meta[name="description"]')

if (descriptionMeta) {
  descriptionMeta.setAttribute('content', SITE_CONFIG.description)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
