import { httpPostGraphQL } from '../utils/index';
import { Constants } from '../constants/index';


const ParishesPresidentsActions = {};


ParishesPresidentsActions.buildGraphQLQuery = (name, date, page) =>  {
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
		}
    `;


    return `
    {
        parish: parishes_presidents(name: "${name}", date: "${date}", page: ${page}) {
            ${fields}
        }
    }`;
};



ParishesPresidentsActions.loadDataFromServer = (name, date, page) => {
    return dispatch => {
        dispatch({
            type: Constants.LOADING_DATA_PARISHES_PRESIDENTS
        });

        let graphQLData = ParishesPresidentsActions.buildGraphQLQuery(name, date, page);

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