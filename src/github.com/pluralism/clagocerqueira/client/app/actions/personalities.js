import { Constants } from '../constants/index';
import { httpPostGraphQL } from '../utils/index';


const PersonalitiesActions = {};


PersonalitiesActions.getDataByPage = (page) => {
  return dispatch => {
    // Inform the user that the application is loading data
    dispatch({
      type: Constants.LOADING_PERSONALITIES_DATA
    });


    // Query that will be sent to the server
    const graphQLData = `{
      personalities(page: ${page}) {
        objects_data {
          name
          image
          description
        }
        max_pages
        total_items
      }
    }`;


    httpPostGraphQL(graphQLData)
    .then((data) => {
      // Check if something went wrong...
      if(data.hasOwnProperty('errors')) {
        console.log(data);
        // Dispatch an error
        dispatch({
          type: Constants.LOADING_PERSONALITIES_ERROR
        });
      } else {
        // Success, retrieve the data to the user!
        dispatch({
          type: Constants.LOADING_PERSONALITIES_SUCCESS,
          max_pages: data.data.personalities.max_pages,
          objects_data: data.data.personalities.objects_data,
          total_items: data.data.personalities.total_items,
        });
      }
    });
  };
};


export default PersonalitiesActions;
