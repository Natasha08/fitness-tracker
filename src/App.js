import React from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import '@fontsource/roboto';

import 'App.scss';
import store from 'app/store';
import Home from 'app/components/Home.js';

const persistor = persistStore(store);

export const App = Home;

const Router = process.env.NODE_ENV === 'test' ? MemoryRouter : BrowserRouter;

export default function AppWithProvider({initialEntries=['/'], providedStore=store}={}) {
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
