import { Dispatch } from 'react';
import { Action, ActionType } from 'store/actionTypes';
import { ErrorStatus } from 'store/reducers/status';

export const setLoading = (value: boolean) => (dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionType.SET_LOADING,
    payload: value,
  });
};

export const setError = (value: ErrorStatus) => (dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionType.SET_ERROR,
    payload: value,
  });
};
