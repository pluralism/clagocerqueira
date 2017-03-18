import Constants from '../constants/index';


const initialState = {
  loading: false,
  currentDate: "",
  data: []
};


export default function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case Constants.LOADING_DATA:
      return { loading: true, data: [], currentDate: action.currentDate };

    case Constants.LOADING_DATA_ERROR:
      return { initialState };

    case Constants.LOADING_DATA_SUCCESS:
      return { loading: false, data: action.data, currentDate: action.currentDate };

    default:
      return initialState;
  }
}
