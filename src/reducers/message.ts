// import { SET_MESSAGE, CLEAR_MESSAGE } from '../actions/types';
import ActionTypes from "actions/types";
import type { A_SetMessage, A_ClearMessage } from "types/actions";
import type { MessageState } from "types/states";

const initState:MessageState = {message: ''};

export default (state:MessageState=initState, action: A_SetMessage|A_ClearMessage) => {
    switch (action.type) {
        case ActionTypes.SET_MESSAGE:
            // console.log('new message', payload);
            return {message: action.payload};
        case ActionTypes.CLEAR_MESSAGE:
            return {message: ''};
        default:
            return state;
    }
};

