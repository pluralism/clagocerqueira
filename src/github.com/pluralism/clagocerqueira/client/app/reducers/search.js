import { Constants } from '../constants/index';


const initialState = {
    loading: false,
    success: false
};


export default function reduce(state = initialState, action = {}) {
    switch(action.type) {
        case Constants.LOADING_DATA_SEARCH:
            return { ...state, loading: true };

        case Constants.LOADING_DATA_ERROR_SEARCH:
            return { ...state, loading: false, success: false };

        default:
            return state;
    }
}