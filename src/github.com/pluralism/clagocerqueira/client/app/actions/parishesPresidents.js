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
        console.log(graphQLData);


        httpPostGraphQL(graphQLData)
        .then((data) => {
            // Something went wrong...
            if(data.hasOwnProperty('errors')) {
                // Dispatch an error
                dispatch({
                    type: Constants.LOADING_DATA_ERROR_PARISHES_PRESIDENTS
                });
            } else {
                // Success, retrieve the data!
                dispatch({
                    type: Constants.LOADING_DATA_SUCCESS_PARISHES_PRESIDENTS,
                    data: data.data['parish'],
                    currentName: data.name
                });
            }
        });
    };
};


export default ParishesPresidentsActions;