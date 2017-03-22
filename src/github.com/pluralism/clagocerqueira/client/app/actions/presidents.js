import Constants from '../constants/index';
import { httpPostGraphQL } from '../utils/index';


const PresidentsActions = {};


PresidentsActions.getDataByDate = (first, offset) => {
  return dispatch => {
    dispatch({
      type: Constants.LOADING_DATA
    });


    // Query to send to the GraphQL server
    const graphQLData = `{
      data1836_1910: presidents(date: "1836-1910", page: 1) {
        date
	      objects {
          name
          image
          description
	      }
      },
      data1910_1926: presidents(date: "1910-1926", page: 1) {
        date
	      objects {
          name
          image
          description
	      }
      },
      data1926_1974: presidents(date: "1926-1974", page: 1) {
        date
	      objects {
          name
          image
          description
	      }
      },
      data1976_2013: presidents(date: "1976-2013", page: 1) {
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
      // Something went wrong...
      if(data.hasOwnProperty('errors')) {
        // Dispatch an error
        dispatch({
          type: Constants.LOADING_DATA_ERROR
        });
      } else if(data.data.presidents !== null && !data.hasOwnProperty('errors')){
        // Success, retrieve the data!
        dispatch({
          type: Constants.LOADING_DATA_SUCCESS,
          data: data.data,
          currentDate: "1836-1910"
        });
      }
    })
  };
};


// Default export
export default PresidentsActions;
