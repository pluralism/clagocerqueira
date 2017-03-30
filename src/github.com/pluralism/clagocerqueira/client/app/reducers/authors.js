import Constants from '../constants/index';


const initialState = {
  loading: false,
  currentDate: "",
  data: {
    [Constants.MAPPINGS.d1400_1500]: {
      date: "",
      objects: {
        objects_data: [],
        total_items: 0,
        max_pages: 0,
      },
      total_pages: 0
    },
    [Constants.MAPPINGS.d1501_1600]: {
      date: "",
      objects: {
        objects_data: [],
        total_items: 0,
        max_pages: 0,
      },
      total_pages: 0
    },
    [Constants.MAPPINGS.d1601_1700]: {
      date: "",
      objects: {
        objects_data: [],
        total_items: 0,
        max_pages: 0,
      },
      total_pages: 0
    },
    [Constants.MAPPINGS.d1701_1800]: {
      date: "",
      objects: {
        objects_data: [],
        total_items: 0,
        max_pages: 0,
      },
      total_pages: 0
    },
    [Constants.MAPPINGS.d1801_1900]: {
      date: "",
      objects: {
        objects_data: [],
        total_items: 0,
        max_pages: 0,
      },
      total_pages: 0
    },
    [Constants.MAPPINGS.d1901_2000]: {
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
    case Constants.LOADING_DATA_AUTHORS:
      return { ...state,
        loading: true,
        currentDate: action.currentDate };

    case Constants.LOADING_DATA_ERROR_AUTHORS:
      return { initialState };

    case Constants.LOADING_DATA_SUCCESS_AUTHORS:
      return { ...state,
        loading: false,
        data: updateDataForDate(action.data, state),
        currentDate: action.currentDate };

    default:
      return state;
  }
}
