import { combineReducers } from 'redux';
import { pokemonReducer } from './pokemon';
import { statusReducer } from './status';

const reducers = combineReducers({
  pokemon: pokemonReducer,
  status: statusReducer,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
