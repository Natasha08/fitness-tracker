import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import './App.css';
import store from './app/store';
import Home from './app/Home.js';

const persistor = persistStore(store);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Home/>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
