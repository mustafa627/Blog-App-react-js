import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import theme from './CMP/theme.jsx'
import { CssBaseline, ThemeProvider } from "@mui/material";
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <ThemeProvider theme={theme}>
    <CssBaseline />
  <App />
   </ThemeProvider>
  </BrowserRouter>
)
