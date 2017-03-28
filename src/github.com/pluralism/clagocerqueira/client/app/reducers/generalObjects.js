import Constants from '../constants/index';


const initialState = {
  loading: false,
  currentDate: "",
  data: {
    [Constants.MAPPINGS.d1836_1910]: {
      date: "",
      objects: {
        objects_data: [],
        total_items: 0,
        max_pages: 0,
      },
      total_pages: 0
    },
    [Constants.MAPPINGS.d1910_1926]: {
      date: "",
      objects: {
        objects_data: [],
        total_items: 0,
        max_pages: 0,
      },
      total_pages: 0
    },
    [Constants.MAPPINGS.d1926_1974]: {
      date: "",
      objects: {
        objects_data: [],
        total_items: 0,
        max_pages: 0,
      },
      total_pages: 0
    },
    [Constants.MAPPINGS.d1974_1976]: {
      date: "",
      objects: {
        objects_data: [],
        total_items: 0,
        max_pages: 0,
      },
      total_pages: 0
    },
    [Constants.MAPPINGS.d1976_2013]: {
      date: "",
      objects: {
        objects_data: [],
        total_items: 0,
        max_pages: 0,
      },
      total_pages: 0
    }
  }
};


/**
 * Utility function to help us update the last state of the
 * Redux store.
 * By doing we can update a single entry in the array instead of
 * the whole array, and ultimately make the app faster
*/
const updateDataForDate = (data, state) => {
  const stateData = state.data;
  let keys = Object.keys(data);
  keys.forEach((key) => {
    stateData[key] = data[key];
  });
  return stateData;
};


export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case Constants.LOADING_DATA:
      return { ...state,
        loading: true,
        currentDate: action.currentDate };

    case Constants.LOADING_DATA_ERROR:
      return { initialState };

    case Constants.LOADING_DATA_SUCCESS:
      return { ...state,
        loading: false,
        data: updateDataForDate(action.data, state),
        currentDate: action.currentDate };

    default:
      return state;
  }
}
