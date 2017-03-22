import Constants from '../constants/index';
import { httpPostGraphQL } from '../utils/index';


const PresidentsActions = {};


PresidentsActions.getDataByDate = (date) => {
  return dispatch => {
    dispatch({
      type: Constants.LOADING_DATA
    });

    // Query to send to the GraphQL server
    const graphQLData = `{
      date18361910: presidents(date: "1836-1910") {
        date
	      objects {
          name
          image
          description
	      }
      },
      date19101926: presidents(date: "1910-1926") {
        date
	      objects {
          name
          image
          description
	      }
      },
      date19261974: presidents(date: "1926-1974") {
        date
	      objects {
          name
          image
          description
	      }
      },
      date19762013: presidents(date: "1976-2013") {
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
        // Success, retrieve the data!
        dispatch({
          type: Constants.LOADING_DATA_SUCCESS,
          data: data.data.presidents.objects,
          currentDate: data.data.presidents.date
        });
      }
    });
  };
};


// Default export
export default PresidentsActions;
