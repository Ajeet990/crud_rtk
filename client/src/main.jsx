import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import './myCss.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store.jsx'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <ToastContainer/>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
