import Constants from '../constants/index';
import { httpPostGraphQL } from '../utils/index';


const PresidentsActions = {};


PresidentsActions.getDataByDate = (date) => ({
  return dispatch => {
    dispatch({
      type: Constants.LOADING_DATA
    });

    // Query to send to the GraphQL server
    const graphQLData = `{
      presidents(date: ${date}) {
        date
	      objects {
		          name
		          image
		          description
	      }
      }
    }`;

    httpPostGraphQL(graphQLData)
    .then((data) => {
      if(data.data.presidents === null && data.hasOwnProperty('errors')) {
        // Something went wrong, dispatch an error!
        dispatch({
          type: Constants.LOADING_DATA_ERROR
        });
      } else if(data.data.presidents !== null && !data.hasOwnProperty('errors')){
        // Success!
        dispatch({
          type: Constants.LOADING_DATA_SUCCESS,
          data: data.data.presidents.objects,
          currentDate: data.data.presidents.date
        });
      }
    });
  };
});


export default PresidentsActions;
