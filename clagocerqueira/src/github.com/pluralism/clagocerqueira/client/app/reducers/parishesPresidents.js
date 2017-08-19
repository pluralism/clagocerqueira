import { Constants } from '../constants/index';


const initialState = {
    loading: false,
    objects_data: {
        [Constants.DATE_MAPPINGS.d1974_1976]: {
            name: "",
            dates: {
                name: "",
                objects: {
                    objects_data: [],
                    total_items: 0,
                    max_pages: 0,
                },
                total_pages: 0
            }
        },
        [Constants.DATE_MAPPINGS.d1976_2013]: {
            name: "",
            dates: {
                name: "",
                objects: {
                    objects_data: [],
                    total_items: 0,
                    max_pages: 0,
                },
                total_pages: 0
            }
        }
    },
    currentName: "",
};


const updateDataForName = (data, state) => {
    const realData = data.data;
    const stateData = state.objects_data;
    const keys = Object.keys(realData);
    keys.forEach((key) => {
        stateData[key] = realData[key];
    });

    return stateData;
};


export default function reduce(state = initialState, action = {}) {
    switch(action.type) {
        case Constants.LOADING_DATA_PARISHES_PRESIDENTS:
            return { ...state, loading: true };

        case Constants.LOADING_DATA_ERROR_PARISHES_PRESIDENTS:
            return initialState;

        case Constants.LOADING_DATA_SUCCESS_PARISHES_PRESIDENTS: {
            return { ...state,
                loading: false,
                objects_data: updateDataForName(action.data, state),
                currentName: action.currentName,
            };
        }
        default:
            return state;
    }
}
