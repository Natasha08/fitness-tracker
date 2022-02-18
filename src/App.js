import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';

import './App.css';
import store from './app/store';
import Home from './app/Home.js';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Home/>
      </BrowserRouter>
    </Provider>
  );
}
