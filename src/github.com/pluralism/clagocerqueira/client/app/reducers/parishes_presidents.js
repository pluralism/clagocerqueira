import { Constants } from '../constants/index';


const initialState = {
    loading: false,
    objects_data: [],
    max_pages: 0,
    total_items: 0
};


export default function reduce(state = initialState, action = {}) {
    switch(action.type) {
        case Constants.LOADING_DATA_PARISHES_PRESIDENTS:
            return { ...state, loading: true };

        case Constants.LOADING_DATA_ERROR_PARISHES_PRESIDENTS:
            return { initialState };

        case Constants.LOADING_DATA_SUCCESS_PARISHES_PRESIDENTS:
            return { ...state,
                loading: false,
                objects_data: action.dates[0].objects.objects_data,
                max_pages: action.dates[0].max_pages,
                total_items: action.dates[0].total_items
            };

        default:
            return state;
    }
}
