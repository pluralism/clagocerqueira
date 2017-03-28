import Constants from '../constants/index';
import { httpPostGraphQL } from '../utils/index';


const PresidentsActions = {};


PresidentsActions.getDataByPage = (date, mapping, page) => {
  return dispatch => {
    // Inform the user that the application is loading data
    dispatch({
      type: Constants.LOADING_DATA
    });


    // Query that will be sent to the GraphQL server
    const graphQLData = `{
      ${mapping}: presidents(date: "${date}", page: ${page}) {
        date
        objects {
          name
          image
          description
        }
        total_pages
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
      } else {
        // Success, retrieve the data to the user
        dispatch({
          type: Constants.LOADING_DATA_SUCCESS,
          data: data.data,
          currentDate: date
        });
      }
    });
  };
};


PresidentsActions.getAllDataByPage = (page) => {
  return dispatch => {
    dispatch({
      type: Constants.LOADING_DATA
    });


    // Query to send to the GraphQL server
    const graphQLData = `{
      ${Constants.MAPPINGS.d1836_1910}: presidents(date: "${Constants.DATES.d1836_1910}", page: 1) {
        date
	      objects {
          name
          image
          description
	      }
        total_pages
      },
      ${Constants.MAPPINGS.d1910_1926}: presidents(date: "${Constants.DATES.d1910_1926}", page: 1) {
        date
	      objects {
          name
          image
          description
	      }
        total_pages
      },
      ${Constants.MAPPINGS.d1926_1974}: presidents(date: "${Constants.DATES.d1926_1974}", page: 1) {
        date
	      objects {
          name
          image
          description
	      }
        total_pages
      },
      ${Constants.MAPPINGS.d1974_1976}: presidents(date: "${Constants.DATES.d1974_1976}", page: 1) {
        date
        objects {
          name
          image
          description
        }
        total_pages
      },
      ${Constants.MAPPINGS.d1976_2013}: presidents(date: "${Constants.DATES.d1976_2013}", page: 1) {
        date
	      objects {
          name
          image
          description
	      }
        total_pages
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
      } else {
        // Success, retrieve the data!
        dispatch({
          type: Constants.LOADING_DATA_SUCCESS,
          data: data.data,
          currentDate: Constants.DATES.d1836_1910
        });
      }
    })
  };
};


// Default export
export default PresidentsActions;
