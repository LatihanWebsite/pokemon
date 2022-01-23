import { AnyAction } from 'redux';
import { Action, ActionType } from 'store/actionTypes';

export interface ErrorStatus {
  status: boolean;
  massage: string;
}

export interface StateStatus {
  error: ErrorStatus;
  loading: boolean;
}

const initialState = {
  error: {
    status: false,
    massage: '',
  },
  loading: false,
};

export const statusReducer = (state: StateStatus = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_LOADING:
      return { ...state, loading: action.payload };
    case ActionType.SET_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
