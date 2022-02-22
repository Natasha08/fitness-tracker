import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist-indexeddb-storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import rootReducer from 'app/reducers';
import FitnessAPI from 'app/services/FitnessAPI';
import NutritionixAPI from 'app/services/NutritionixAPI';

const persistConfig = {
  key: 'root',
  storage: storage('Fitness-Tracker-development'),
  stateReconciler: hardSet,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (gDM) => (
    gDM({serializableCheck: false})
    .concat(FitnessAPI.middleware)
    .concat(NutritionixAPI.middleware)
  )
});
setupListeners(store.dispatch);

export default store;
