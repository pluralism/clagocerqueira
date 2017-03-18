import Constants from '../constants/index';


const initialState = {
  loading: false,
  currentDate: "",
  data: []
};


export default function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case Constants.LOADING_DATA:
      return { ...state, loading: true, data: [] };
    case Constants.LOADING_DATA_ERROR:
      return { initialState };
    case Constants.LOADING_DATA_SUCCESS:
      return { ...state, loading: false, data: state.data, currentDate: state.currentDate };
  }
}
