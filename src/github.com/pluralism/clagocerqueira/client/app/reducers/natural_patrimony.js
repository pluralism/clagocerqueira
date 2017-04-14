import { Constants } from '../constants/index';



const initialState = {
    loading: false,
    currentName: "",
    data: {
        [Constants.NATURAL_PATRIMONY.BROOKS]: {
            name: "",
            objects: {
                objects_data: [],
                total_items: 0,
                max_pages: 0,
            },
            total_pages: 0
        },
        [Constants.NATURAL_PATRIMONY.RIVERS]: {
            name: "",
            objects: {
                objects_data: [],
                total_items: 0,
                max_pages: 0,
            },
            total_pages: 0
        },
        [Constants.NATURAL_PATRIMONY.MOUNTAINS]: {
            name: "",
            objects: {
                objects_data: [],
                total_items: 0,
                max_pages: 0,
            },
            total_pages: 0
        },
    }
};


/**
 * Utility function to help us update the last state of the
 * Redux store.
 * By doing we can update a single entry in the array instead of
 * the whole array, and ultimately make the app faster
 */
const updateDataForName = (data, state) => {
    const stateData = state.data;
    let keys = Object.keys(data);
    keys.forEach((key) => {
        stateData[key] = data[key];
    });
    return stateData;
};



export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case Constants.LOADING_DATA_NATURAL_PATRIMONY:
            return { ...state,
                loading: true,
                currentName: action.currentName };

        case Constants.LOADING_DATA_ERROR_NATURAL_PATRIMONY:
            return initialState;

        case Constants.LOADING_DATA_SUCCESS_NATURAL_PATRIMONY:
            return { ...state,
                loading: false,
                data: updateDataForName(action.data, state),
                currentName: action.currentName };

        default:
            return state;
    }
}
