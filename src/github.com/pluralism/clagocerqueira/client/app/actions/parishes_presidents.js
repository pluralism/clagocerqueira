import { httpPostGraphQL } from '../utils/index';


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
        ${name}: parishes_presidents(name: ${name}, date: ${date}, page: ${page}) {
            ${fields}
        }
    }`;
};



ParishesPresidentsActions.loadDataFromServer = (loadingAction, errorAction, successAction, name, date, page) => {
    return dispatch => {
        dispatch({
            type: loadingAction
        });

        let graphQLData = ParishesPresidentsActions.buildGraphQLQuery(name, date, page);

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
                    currentPage: data.name
                });
            }
        });
    };
};


export default ParishesPresidentsActions;