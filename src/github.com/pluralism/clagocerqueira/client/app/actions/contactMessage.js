import Constants from '../constants/index';


const ContactMessageActions = {};


ContactMessageActions.sendMessage = (data) => {
  return dispatch => {
    dispatch({
      type: Constants.MESSAGE_SENDING
    });

    dispatch({
      type: Constants.MESSAGE_SENT
    });
  }
};


export default ContactMessageActions;
