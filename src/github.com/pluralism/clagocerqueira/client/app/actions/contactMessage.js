import { Constants } from '../constants/index';
import { httpPostGraphQL } from '../utils/index';


const ContactMessageActions = {};


ContactMessageActions.sendMessage = (data) => {
  return dispatch => {
    dispatch({
      type: Constants.MESSAGE_SENDING
    });

    // Perform a POST request to the GraphQL server
    const graphQLData = `
      mutation _{ 
        createMessage(name: "${data.name}", phone: "${data.phone}", email:"${data.email}", subject: "${data.subject}", content: "${data.content}") {
          name
          email
          content
          created_at
        }
      }`;


    httpPostGraphQL(graphQLData)
    .then((data) => {
      if(data.data.createMessage === null && data.hasOwnProperty('errors')) {
        // Check if something wrong happened
        dispatch({
          type: Constants.MESSAGE_SENT_ERRORS
        });
      } else if(data.data.createMessage !== null && !data.hasOwnProperty('errors')) {
        // Message was sent with success
        dispatch({
          type: Constants.MESSAGE_SENT
        });
      }
    });
  }
};


export default ContactMessageActions;
