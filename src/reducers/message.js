import { SET_MESSAGE, CLEAR_MESSAGE } from '../actions/types';

const initState = {message: ''};

export default (state=initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_MESSAGE:
            // console.log('new message', payload);
            return {message: payload};
        case CLEAR_MESSAGE:
            return {message: ''};
        default:
            return state;
    }
};