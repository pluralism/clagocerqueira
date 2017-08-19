import { Constants } from '../constants/index';


const initialState = {
    loading: false,
    objects_data: [],
    max_pages: 0,
    total_items: 0
};


export default function reduce(state = initialState, action = {}) {
    switch(action.type) {
        case Constants.LOADING_DATA_PARISH:
            return { ...state, loading: true };

        case Constants.LOADING_DATA_ERROR_PARISH:
            return { initialState };

        case Constants.LOADING_DATA_SUCCESS_PARISH:
            return { ...state,
                loading: false,
                objects_data: action.objects_data,
                max_pages: action.max_pages,
                total_items: action.total_items
            };

        default:
            return state;
    }
}
