import { httpPostGraphQL } from '../utils/index';
import { Constants } from '../constants/index';


const SearchActions = {};


SearchActions.searchByType = (value, type) => {
    return dispatch => {
        dispatch({
            type: Constants.LOADING_DATA_SEARCH
        });

        const query = `
        {
            search: search_type(value: "${value}", type: "${type}") {
                results {
                    name
                    _index
                    _type
                    objects {
                        objects_data {
                            name
                            image
                            description
                            extra
                        }
                        total_items
                    }
                }
            }
        }
        `;


        httpPostGraphQL(query)
        .then((data) => {
            // Something went wrong...
            if(data.hasOwnProperty('errors')) {
                // Dispatch an error
                dispatch({
                    type: Constants.LOADING_DATA_ERROR_SEARCH
                });
            } else {
                dispatch({
                    type: Constants.LOADING_DATA_SUCCESS_SEARCH,
                    data: data.data.search.results
                });
            }
        });
    };
};


SearchActions.homepageSearch = (value) => {
    return dispatch => {
        dispatch({
            type: Constants.LOADING_DATA_SEARCH
        });

        const query = `
        {
            search: search_homepage(value: "${value}") {
                results {
                    name
                    _index
                    _type
                    objects {
                        objects_data {
                            name
                            image
                            description
                            extra
                        }
                        total_items
                    }
                }
            }
        }
        `;


        httpPostGraphQL(query)
        .then((data) => {
            // Something went wrong...
            if(data.hasOwnProperty('errors')) {
                // Dispatch an error
                dispatch({
                    type: Constants.LOADING_DATA_ERROR_SEARCH
                });
            } else {
                dispatch({
                    type: Constants.LOADING_DATA_SUCCESS_SEARCH,
                    data: data.data.search.results
                });
            }
        });
    };
};


export default SearchActions;