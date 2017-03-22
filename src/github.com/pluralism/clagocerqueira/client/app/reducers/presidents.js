import Constants from '../constants/index';


const initialState = {
  loading: false,
  currentDate: "",
  data: []
};


export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case Constants.LOADING_DATA:
      return { loading: true, data: initialState.data, currentDate: action.currentDate };

    case Constants.LOADING_DATA_ERROR:
      return { initialState };

    case Constants.LOADING_DATA_SUCCESS:
      return { ...state, loading: false, data: action.data, currentDate: action.currentDate };

    default:
      return state;
  }
}
