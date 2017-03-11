import Constants from '../constants/index';


const Actions = {};


Actions.sendMessage = (data) => {
  return dispatch => {
    dispatch({
      type: Constants.MESSAGE_SENDING
    });
  }
};


export default Actions;
