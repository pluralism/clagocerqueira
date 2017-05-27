import { httpPostGraphQL } from '../utils/index';
import { Constants } from '../constants/index';


const ParishesPresidentsActions = {};


ParishesPresidentsActions.buildQueryForDate = (mapping, name, page, type) => {
    const fields = `
    name
    dates {
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
    }`;


    return `
    ${mapping[0]}: ${type}(name: "${name}", date: "${mapping[1]}", page: ${page}) {
      ${fields}
    }`;
};


ParishesPresidentsActions.buildGraphQLDataFromMappings = (name, mappings, page) => {
    let graphQLData = `{`;

    mappings.forEach((mapping) => {
        graphQLData += ParishesPresidentsActions.buildQueryForDate(
            mapping,
            name,
            page,
            Constants.PARISHES_PRESIDENTS);
    });
    graphQLData += `}`;

    return graphQLData;
};



ParishesPresidentsActions.getAllDataFromParishesPresidents = (name, mappings) => {
    return ParishesPresidentsActions.loadDataFromServer(
        name,
        Constants.LOADING_DATA_PARISHES_PRESIDENTS,
        Constants.LOADING_DATA_ERROR_PARISHES_PRESIDENTS,
        Constants.LOADING_DATA_SUCCESS_PARISHES_PRESIDENTS,
        1,
        mappings);
};



ParishesPresidentsActions.loadDataFromServer =
    (name, loadingAction, errorAction, successAction, page, mappings) => {
    return dispatch => {
        dispatch({
            type: loadingAction
        });

        let graphQLData = ParishesPresidentsActions.buildGraphQLDataFromMappings(
            name,
            mappings,
            page);


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
                    data: data,
                    currentName: mappings[0][1],
                });
            }
        });
    };
};


export default ParishesPresidentsActions;