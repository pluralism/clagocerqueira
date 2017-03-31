import Constants from '../constants/index';
import { httpPostGraphQL } from '../utils/index';


const GeneralObjectsActions = {};


GeneralObjectsActions.getDataByPage = (name, mapping, page, type) => {
  return dispatch => {
    // Inform the user that the application is loading data
    dispatch({
      type: Constants.LOADING_DATA
    });


    // Query that will be sent to the GraphQL server
    const graphQLData = `{
      ${mapping}: ${type}(name: "${name}", page: ${page}) {
        name
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
          currentName: name
        });
      }
    });
  };
};


GeneralObjectsActions.buildQueryForDate = (mapping, type, page) => {
  const fields = `
  name
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
    ${mapping[0]}: ${type}(name: "${mapping[1]}", page: ${page}) {
      ${fields}
    }`;

  return query;
};



GeneralObjectsActions.getDataByPageAuthors = (name, mapping, page, type) => {
  return dispatch => {
    // Inform the user that the application is loading data
    dispatch({
      type: Constants.LOADING_DATA_AUTHORS
    });


    // Query that will be sent to the GraphQL server
    const graphQLData = `{
      ${mapping}: ${type}(name: "${name}", page: ${page}) {
        name
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
          type: Constants.LOADING_DATA_ERROR_AUTHORS
        });
      } else {
        // Success, retrieve the data to the user
        dispatch({
          type: Constants.LOADING_DATA_SUCCESS_AUTHORS,
          data: data.data,
          currentName: name
        });
      }
    });
  };
};


GeneralObjectsActions.getDataByPageAssociations = (name, mapping, page, type) => {
  return dispatch => {
    // Inform the user that the application is loading data
    dispatch({
      type: Constants.LOADING_DATA_ASSOCIATIONS
    });


    // Query that will be sent to the GraphQL server
    const graphQLData = `{
      ${mapping}: ${type}(name: "${name}", page: ${page}) {
        name
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
          type: Constants.LOADING_DATA_ERROR_ASSOCIATIONS
        });
      } else {
        // Success, retrieve the data to the user
        dispatch({
          type: Constants.LOADING_DATA_SUCCESS_ASSOCIATIONS,
          data: data.data,
          currentName: name
        });
      }
    });
  };
};


GeneralObjectsActions.buildGraphQLDataFromMappings = (mappings, constant, page) => {
  let graphQLData = `{`;

  mappings.forEach((mapping) => {
    graphQLData += GeneralObjectsActions.buildQueryForDate(mapping, constant, page);
  });
  graphQLData += `}`;

  return graphQLData;
};



GeneralObjectsActions.loadDataFromServer =
  (loadingAction, errorAction, successAction, page, mappings, type) => {
  return dispatch => {
    dispatch({
      type: loadingAction
    });

    let graphQLData = GeneralObjectsActions.buildGraphQLDataFromMappings(mappings,
      type, page);

    httpPostGraphQL(graphQLData)
    .then((data) => {
      // Something went wrong...
      if(data.hasOwnProperty('errors')) {
        // Dispatch an error
        dispatch({
          type: errorAction
        });
      } else {
        // Success, retrieve the data!
        dispatch({
          type: successAction,
          data: data.data,
          currentName: mappings[0][1]
        });
      }
    });
  };
};


/**
 * This function extracts all authors from the database
 * This is the function that should be called in the initial rendering,
 * when the page number is 1
*/
GeneralObjectsActions.getAllDataFromAuthors = (mappings) => {
  return GeneralObjectsActions.loadDataFromServer(Constants.LOADING_DATA_AUTHORS,
    Constants.LOADING_DATA_ERROR_AUTHORS,
    Constants.LOADING_DATA_SUCCESS_AUTHORS,
    1,
    mappings,
    Constants.AUTHORS);
};



GeneralObjectsActions.getAllDataFromAssociations = (mappings) => {
  return GeneralObjectsActions.loadDataFromServer(Constants.LOADING_DATA_ASSOCIATIONS,
    Constants.LOADING_DATA_ERROR_ASSOCIATIONS,
    Constants.LOADING_DATA_SUCCESS_ASSOCIATIONS,
    1,
    mappings,
    Constants.ASSOCIATIONS_TABLE);
};



/**
 * This function extracts all presidents from the database
 * This is the function that should be called in the initial rendering,
 * when the page number is 1
*/
GeneralObjectsActions.getAllDataFromPresidents = (mappings) => {
  return GeneralObjectsActions.loadDataFromServer(Constants.LOADING_DATA,
    Constants.LOADING_DATA_ERROR,
    Constants.LOADING_DATA_SUCCESS,
    1,
    mappings,
    Constants.PRESIDENTS);
};



/**
 * This function extracts all councilmen from the database
 * This is the function that should be called in the initial rendering,
 * when the page number is 1
*/
GeneralObjectsActions.getAllDataFromCouncilmen = (mappings) => {
  return GeneralObjectsActions.loadDataFromServer(Constants.LOADING_DATA,
    Constants.LOADING_DATA_ERROR,
    Constants.LOADING_DATA_SUCCESS,
    1,
    mappings,
    Constants.COUNCILMEN);
};



GeneralObjectsActions.getAllDataByPage = (page, type) => {
  return dispatch => {
    dispatch({
      type: Constants.LOADING_DATA
    });


    // Query to send to the GraphQL server
    const graphQLData = `{
      ${Constants.MAPPINGS.d1836_1910}: ${type}(name: "${Constants.DATES.d1836_1910}", page: 1) {
        name
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
      ${Constants.MAPPINGS.d1910_1926}: ${type}(name: "${Constants.DATES.d1910_1926}", page: 1) {
        name
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
      ${Constants.MAPPINGS.d1926_1974}: ${type}(name: "${Constants.DATES.d1926_1974}", page: 1) {
        name
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
      ${Constants.MAPPINGS.d1974_1976}: ${type}(name: "${Constants.DATES.d1974_1976}", page: 1) {
        name
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
      ${Constants.MAPPINGS.d1976_2013}: ${type}(name: "${Constants.DATES.d1976_2013}", page: 1) {
        name
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
          currentName: Constants.DATES.d1836_1910
        });
      }
    });
  };
};



export default GeneralObjectsActions;
