import { httpPostGraphQL } from '../utils/index';
import { Constants } from '../constants/index';


const SearchActions = {};

SearchActions.homepageSearch = (value) => {
    const query = `
        search_homepage: search(value: "${value}") {
        
        } 
    `;


    return dispatch => {
        dispatch({
            type: Constants.LOADING_DATA
        });


        httpPostGraphQL(query)
            .then((data) => {
            if(data.hasOwnProperty('errors')) {

            } else {

            }
        });
    };
};


export default SearchActions;