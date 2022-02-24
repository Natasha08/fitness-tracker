import { combineReducers } from 'redux';

import userReducer from 'app/reducers/user';
import FitnessAPI from 'app/services/FitnessAPI';
import NutritionixAPI from 'app/services/NutritionixAPI';
import nutritionix from 'app/reducers/nutritionix';

const rootReducer = combineReducers({
  [FitnessAPI.reducerPath]: FitnessAPI.reducer,
  [NutritionixAPI.reducerPath]: NutritionixAPI.reducer,
  user: userReducer,
  nutritionix
});

export default rootReducer;
