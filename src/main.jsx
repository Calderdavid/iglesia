import React from 'react'
import ReactDOM from 'react-dom/client'
import { IglesiaApp } from './IglesiaApp'
import './styles.css'
import {BrowserRouter} from 'react-router-dom'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import './assets/globals.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
        <ChakraProvider>
          <BrowserRouter>
            <IglesiaApp />
          </BrowserRouter>
        </ChakraProvider>
      </Provider>
  </React.StrictMode>
)
