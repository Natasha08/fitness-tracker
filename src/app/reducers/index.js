import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist-indexeddb-storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import user from 'app/reducers/user';
import FitnessAPI from 'app/services/FitnessAPI';
import NutritionixAPI from 'app/services/NutritionixAPI';
import nutritionix from 'app/reducers/nutritionix';

const persistConfig = {
  key: 'root',
  storage: storage('Fitness-Tracker-development'),
  stateReconciler: hardSet,
  blacklist: [NutritionixAPI.reducerPath, nutritionix.name]
};

const rootReducer = combineReducers({
  [FitnessAPI.reducerPath]: FitnessAPI.reducer,
  [NutritionixAPI.reducerPath]: NutritionixAPI.reducer,
  user: user.reducer,
  nutritionix: nutritionix.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
