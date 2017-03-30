import Constants from '../constants/index';
import { httpPostGraphQL } from '../utils/index';


const GeneralObjectsActions = {};


GeneralObjectsActions.getDataByPage = (date, mapping, page, type) => {
  return dispatch => {
    // Inform the user that the application is loading data
    dispatch({
      type: Constants.LOADING_DATA
    });


    // Query that will be sent to the GraphQL server
    const graphQLData = `{
      ${mapping}: ${type}(date: "${date}", page: ${page}) {
        date
        objects {
          objects_data {
            name
            image
            description
          }
          total_items
          max_pages
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


GeneralObjectsActions.buildQueryForDate = (mapping, type, page) => {
  const fields = `
  date
  objects {
    objects_data {
      name
      image
      description
    }
    total_items
    max_pages
  }`;

  const query = `
    ${mapping[0]}: ${type}(date: "${mapping[1]}", page: ${page}) {
      ${fields}
    }`;

  return query;
};


/**
 * This function extracts all authors from the database
 * This is the function that should be called in the initial rendering,
 * when the page number is 1
*/
GeneralObjectsActions.getAllDataFromAuthors = (mappings) => {
  return dispatch => {
    dispatch({
      type: Constants.LOADING_DATA_AUTHORS
    });

    let graphQLData = `{`;
    /**
     * Iterate over all the elements in the array and build the query dinamically
     * To build the query we use a template that is shared by most of the elements
     * of the application.
    */
    mappings.forEach((mapping) => {
      graphQLData += GeneralObjectsActions.buildQueryForDate(mapping, Constants.AUTHORS, 1);
    });

    graphQLData += `}`;

    httpPostGraphQL(graphQLData)
    .then((data) => {
      // Something went wrong...
      if(data.hasOwnProperty('errors')) {
        // Dispatch an error
        dispatch({
          type: Constants.LOADING_DATA_ERROR_AUTHORS
        });
      } else {
        // Success, retrieve the data!
        dispatch({
          type: Constants.LOADING_DATA_SUCCESS_AUTHORS,
          data: data.data,
          currentDate: Constants.DATES.d1400_1500
        });
      }
    });
  };
};


GeneralObjectsActions.getAllDataByPage = (page, type) => {
  return dispatch => {
    dispatch({
      type: Constants.LOADING_DATA
    });


    // Query to send to the GraphQL server
    const graphQLData = `{
      ${Constants.MAPPINGS.d1836_1910}: ${type}(date: "${Constants.DATES.d1836_1910}", page: 1) {
        date
        objects {
          objects_data {
            name
            image
            description
          }
          total_items
          max_pages
        }
      },
      ${Constants.MAPPINGS.d1910_1926}: ${type}(date: "${Constants.DATES.d1910_1926}", page: 1) {
        date
        objects {
          objects_data {
            name
            image
            description
          }
          total_items
          max_pages
        }
      },
      ${Constants.MAPPINGS.d1926_1974}: ${type}(date: "${Constants.DATES.d1926_1974}", page: 1) {
        date
        objects {
          objects_data {
            name
            image
            description
          }
          total_items
          max_pages
        }
      },
      ${Constants.MAPPINGS.d1974_1976}: ${type}(date: "${Constants.DATES.d1974_1976}", page: 1) {
        date
        objects {
          objects_data {
            name
            image
            description
          }
          total_items
          max_pages
        }
      },
      ${Constants.MAPPINGS.d1976_2013}: ${type}(date: "${Constants.DATES.d1976_2013}", page: 1) {
        date
        objects {
          objects_data {
            name
            image
            description
          }
          total_items
          max_pages
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
      } else {
        // Success, retrieve the data!
        dispatch({
          type: Constants.LOADING_DATA_SUCCESS,
          data: data.data,
          currentDate: Constants.DATES.d1836_1910
        });
      }
    });
  };
};



export default GeneralObjectsActions;
