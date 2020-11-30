import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { BrowserRouter as Router } from 'react-router-dom';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from "redux-thunk";
import { Provider } from 'react-redux';
import orderReducer from './store/reducers/OrdersReducers';
import authReducer from './store/reducers/AuthReducers';

const rootReducer = combineReducers({
  auth: authReducer,
orders: orderReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  
    <Router>
      <Provider store={store}>
    <App />
      </Provider>
    </Router>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
