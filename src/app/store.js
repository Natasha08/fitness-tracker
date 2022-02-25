import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import rootReducer from 'app/reducers';
import FitnessAPI from 'app/services/FitnessAPI';
import NutritionixAPI from 'app/services/NutritionixAPI';

const store = configureStore({
  reducer: rootReducer,
  middleware: (gDM) => (
    gDM({serializableCheck: false})
    .concat(FitnessAPI.middleware)
    .concat(NutritionixAPI.middleware)
  )
});
setupListeners(store.dispatch);

export default store;
