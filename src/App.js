import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import '@fontsource/roboto';

import 'App.scss';
import store from 'app/store';
import Home from 'app/components/Home.js';

const persistor = persistStore(store);

export default function App({initialEntries=['/'], providedStore=store, Router=BrowserRouter}={}) {
  return (
    <Provider store={providedStore}>
      <PersistGate loading={null} persistor={persistor}>
        <Router initialEntries={initialEntries}>
          <Home/>
        </Router>
      </PersistGate>
    </Provider>
  );
}
