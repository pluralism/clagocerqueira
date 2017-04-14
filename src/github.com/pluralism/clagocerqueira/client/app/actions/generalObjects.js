import { Constants } from '../constants/index';
import { httpPostGraphQL } from '../utils/index';


const GeneralObjectsActions = {};



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


  return `
    ${mapping[0]}: ${type}(name: "${mapping[1]}", page: ${page}) {
      ${fields}
    }`;
};


GeneralObjectsActions.getDataByPageSimple =
    (name, mapping, page, type, loadingAction, actionError, actionSuccess) => {
  return dispatch => {
    dispatch({
        type: loadingAction
    });


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
      if (data.hasOwnProperty('errors')) {
        dispatch({
            type: actionError
        });
      } else {
        dispatch({
            type: actionSuccess,
            max_pages: data.data[mapping].objects.max_pages,
            objects_data: data.data[mapping].objects.objects_data,
            total_items: data.data[mapping].objects.total_items,
        });
      }
    });
  };
};



GeneralObjectsActions.getDataByPage =
    (name, mapping, page, type, loadingAction, actionError, actionSuccess) => {
  return dispatch => {
    // Inform the user that the application is loading data
    dispatch({
      type: loadingAction
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
          type: actionError
        });
      } else {
        // Success, retrieve the data to the user
        dispatch({
          type: actionSuccess,
          data: data.data,
          currentName: name
        });
      }
    });
  };
};


GeneralObjectsActions.getDataByPagePress = (name, mapping, page) => {
  return GeneralObjectsActions.getDataByPage(
    name,
    mapping,
    page,
    Constants.PRESS_TABLE,
    Constants.LOADING_DATA_PRESS,
    Constants.LOADING_DATA_ERROR_PRESS,
    Constants.LOADING_DATA_SUCCESS_PRESS);
};



GeneralObjectsActions.getDataByPageCouncilmen = (name, mapping, page) => {
  return GeneralObjectsActions.getDataByPage(
    name,
    mapping,
    page,
    Constants.COUNCILMEN,
    Constants.LOADING_DATA,
    Constants.LOADING_DATA_ERROR,
    Constants.LOADING_DATA_SUCCESS);
};


GeneralObjectsActions.getDataByPageCityCouncil = (name, mapping, page) => {
    return GeneralObjectsActions.getDataByPage(
        name,
        mapping,
        page,
        Constants.CITY_COUNCIL_TABLE,
        Constants.LOADING_DATA,
        Constants.LOADING_DATA_ERROR,
        Constants.LOADING_DATA_SUCCESS);
};


GeneralObjectsActions.getDataByPagePresidents = (name, mapping, page) => {
  return GeneralObjectsActions.getDataByPage(
    name,
    mapping,
    page,
    Constants.PRESIDENTS,
    Constants.LOADING_DATA,
    Constants.LOADING_DATA_ERROR,
    Constants.LOADING_DATA_SUCCESS);
};



GeneralObjectsActions.getDataByPageAuthors = (name, mapping, page) => {
  return GeneralObjectsActions.getDataByPage(
    name,
    mapping,
    page,
    Constants.AUTHORS,
    Constants.LOADING_DATA_AUTHORS,
    Constants.LOADING_DATA_ERROR_AUTHORS,
    Constants.LOADING_DATA_SUCCESS_AUTHORS);
};


GeneralObjectsActions.getDataByPageAssociations = (name, mapping, page) => {
  return GeneralObjectsActions.getDataByPage(
    name,
    mapping,
    page,
    Constants.ASSOCIATIONS_TABLE,
    Constants.LOADING_DATA_ASSOCIATIONS,
    Constants.LOADING_DATA_ERROR_ASSOCIATIONS,
    Constants.LOADING_DATA_SUCCESS_ASSOCIATIONS);
};


GeneralObjectsActions.getDataByPageNaturalPatrimony = (name, mapping, page) => {
    return GeneralObjectsActions.getDataByPage(
      name,
      mapping,
      page,
      Constants.NATURAL_PATRIMONY_TABLE,
      Constants.LOADING_DATA_NATURAL_PATRIMONY,
      Constants.LOADING_DATA_ERROR_NATURAL_PATRIMONY,
      Constants.LOADING_DATA_SUCCESS_NATURAL_PATRIMONY);
};


GeneralObjectsActions.getDataByPageParishes = (name, mapping, page) => {
  return GeneralObjectsActions.getDataByPageSimple(
      name,
      mapping,
      page,
      Constants.FESTIVITIES_TABLE,
      Constants.LOADING_DATA_PARISH,
      Constants.LOADING_DATA_ERROR_PARISH,
      Constants.LOADING_DATA_SUCCESS_PARISH);
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



GeneralObjectsActions.getAlLDataFromCityCouncil = (mappings) => {
  return GeneralObjectsActions.loadDataFromServer(Constants.LOADING_DATA,
    Constants.LOADING_DATA_ERROR,
    Constants.LOADING_DATA_SUCCESS,
    1,
    mappings,
    Constants.CITY_COUNCIL_TABLE);
};



GeneralObjectsActions.getAllDataFromAssociations = (mappings) => {
  return GeneralObjectsActions.loadDataFromServer(Constants.LOADING_DATA_ASSOCIATIONS,
    Constants.LOADING_DATA_ERROR_ASSOCIATIONS,
    Constants.LOADING_DATA_SUCCESS_ASSOCIATIONS,
    1,
    mappings,
    Constants.ASSOCIATIONS_TABLE);
};



GeneralObjectsActions.getAllDataFromPress = (mappings) => {
  return GeneralObjectsActions.loadDataFromServer(Constants.LOADING_DATA_PRESS,
    Constants.LOADING_DATA_ERROR_PRESS,
    Constants.LOADING_DATA_SUCCESS_PRESS,
    1,
    mappings,
    Constants.PRESS_TABLE);
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



GeneralObjectsActions.getAllDatafromNaturalPatrimony = (mappings) =>  {
  return GeneralObjectsActions.loadDataFromServer(Constants.LOADING_DATA_NATURAL_PATRIMONY,
    Constants.LOADING_DATA_SUCCESS_NATURAL_PATRIMONY,
    Constants.LOADING_DATA_ERROR_NATURAL_PATRIMONY,
    1,
    mappings,
    Constants.NATURAL_PATRIMONY_TABLE);
};


export default GeneralObjectsActions;
