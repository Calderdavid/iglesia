import React from 'react'
import ReactDOM from 'react-dom/client'
import { IglesiaApp } from './IglesiaApp'
import './styles.css'
import {BrowserRouter} from 'react-router-dom'
import { store } from './store/store'
import { Provider } from 'react-redux'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <IglesiaApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
