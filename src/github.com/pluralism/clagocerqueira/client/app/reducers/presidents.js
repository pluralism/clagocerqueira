import Constants from '../constants/index';


const initialState = {
  loading: false,
  currentDate: "",
  data: {
    data1836_1910: {
      page: 0,
      date: "",
      objects: []
    },
    data1910_1926: {
      page: 0,
      date: "",
      objects: []
    },
    data1926_1974: {
      page: 0,
      date: "",
      objects: []
    },
    data1976_2013: {
      page: 0,
      date: "",
      objects: []
    }
  },
};


function updateDataOnReducer(presidentData) {
  let newState =
  let keys = Object.keys(presidentData);

  keys.forEach((key) => {
    console.log(presidentData[key]);
  });
}


export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case Constants.LOADING_DATA:
      return { loading: true, currentDate: action.currentDate };

    case Constants.LOADING_DATA_ERROR:
      return { initialState };

    case Constants.LOADING_DATA_SUCCESS:
      return { ...state, loading: false, data: updateDataOnReducer(action.data), currentDate: action.currentDate };

    default:
      return state;
  }
}
