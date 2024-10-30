import ActionTypes from './types';
import type { A_SetMessage, A_ClearMessage } from 'types/actions';

export const setMessage = (message: string): A_SetMessage => ({
    type: ActionTypes.SET_MESSAGE,
    payload: { message },
});

export const clearMessage = (): A_ClearMessage => ({
    type: ActionTypes.CLEAR_MESSAGE,
});
