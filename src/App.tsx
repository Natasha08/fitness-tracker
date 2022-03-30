import * as React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import '@fontsource/roboto';

import 'App.scss';
import store from './app/store';
import Home from './app/components/Home';
import Router from './Router';

const persistor = persistStore(store);

export default function App({initialEntries=['/'], providedStore=store, InitRouter={name: 'unknown'}}={}) {
  return (
    <Provider store={providedStore}>
      <PersistGate loading={null} persistor={persistor}>
        <Router initialEntries={initialEntries} Router={InitRouter} Children={Home} />
      </PersistGate>
    </Provider>
  );
}
