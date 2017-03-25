import Constants from '../constants/index';


const initialState = {
  loading: false,
  currentDate: "",
  data: {
    data1836_1910: {
      date: "",
      objects: [],
      total_pages: 0
    },
    data1910_1926: {
      date: "",
      objects: [],
      total_pages: 0
    },
    data1926_1974: {
      date: "",
      objects: [],
      total_pages: 0
    },
    data1976_2013: {
      date: "",
      objects: [],
      total_pages: 0
    }
  },
};


/**
 * Utility function to help us update the last state of the
 * Redux store.
 * By doing we can update a single entry in the array instead of
 * the whole array, we ultimately can make the app faster
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
      return { ...state, loading: true, currentDate: action.currentDate };

    case Constants.LOADING_DATA_ERROR:
      return { initialState };

    case Constants.LOADING_DATA_SUCCESS:
      return { ...state, loading: false, data: updateDataForDate(action.data, state),
        currentDate: action.currentDate };

    default:
      return state;
  }
}
