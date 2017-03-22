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


export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case Constants.LOADING_DATA:
      return { loading: true, currentDate: action.currentDate };

    case Constants.LOADING_DATA_ERROR:
      return { initialState };

    case Constants.LOADING_DATA_SUCCESS:
      return { ...state, loading: false, data: action.data, currentDate: action.currentDate };

    default:
      return state;
  }
}
