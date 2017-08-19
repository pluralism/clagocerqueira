import { Constants } from '../constants/index';


const initialState = {
  sending: false,
  sent: false,
  sentWithSuccess: false
};


export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case Constants.MESSAGE_SENDING:
      return { ...state, sending: true, sent: false, sentWithSuccess: false };

    case Constants.MESSAGE_SENT:
      return { ...state, sending: false, sent: true, sentWithSuccess: true };

    case Constants.MESSAGE_SENT_ERRORS:
      return { ...state, sending: false, sent: true, sentWithSuccess: false };

    default:
      return state;
  }
}
