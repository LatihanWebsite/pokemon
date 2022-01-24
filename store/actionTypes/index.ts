import { ErrorStatus } from 'store/reducers/status';

export enum ActionType {
  GET_ALL_DATA_POKEMON = 'GET_ALL_DATA_POKEMON',
  SET_DATA_POKEMON = 'SET_DATA_POKEMON',

  SET_DATA_OWNED = 'SET_DATA_OWNED',

  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
}

interface getAllDataPokemon {
  type: ActionType.GET_ALL_DATA_POKEMON;
  payload: any;
}

interface setDataPokemon {
  type: ActionType.SET_DATA_POKEMON;
  payload: any;
}

interface setOwned {
  type: ActionType.SET_DATA_OWNED;
  payload: number;
}

interface setLoading {
  type: ActionType.SET_LOADING;
  payload: boolean;
}

interface setError {
  type: ActionType.SET_ERROR;
  payload: ErrorStatus;
}

export type Action = getAllDataPokemon | setOwned | setLoading | setError | setDataPokemon;
