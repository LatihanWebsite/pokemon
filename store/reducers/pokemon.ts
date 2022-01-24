import { AnyAction } from 'redux';
import { ActionType } from 'store/actionTypes';

const initialState = {
  data_owned: 0,
  data_fetch_pokemon: [],
  data_pokemon: {},
};

export const pokemonReducer = (state: any = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.GET_ALL_DATA_POKEMON:
      return { ...state, data_fetch_pokemon: action.payload };
    case ActionType.SET_DATA_OWNED:
      return { ...state, data_owned: action.payload };
    case ActionType.SET_DATA_POKEMON:
      return { ...state, data_pokemon: action.payload };
    default:
      return state;
  }
};
