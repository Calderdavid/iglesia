import React from 'react'
import ReactDOM from 'react-dom/client'
import { IglesiaApp } from './IglesiaApp'
import './styles.css'
import {BrowserRouter} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <IglesiaApp />
    </BrowserRouter>
  </React.StrictMode>
)
