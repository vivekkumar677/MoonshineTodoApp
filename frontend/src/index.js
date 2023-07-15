import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { applyMiddleware, compose} from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { Toaster } from 'react-hot-toast';
import reducers from './reducers';

const store = configureStore({reducer:reducers}, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
        <Toaster />
      </Provider>
    </Router>
  </React.StrictMode>
);

export default store;