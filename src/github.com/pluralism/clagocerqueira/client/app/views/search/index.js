import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import HeaderLinks from '../../components/common/headerLinks';
import Footer from '../../components/common/footer';
import { Constants } from '../../constants/index';
import SearchActions from '../../actions/search';
import { SearchTab } from '../../components/common/searchTab';


class SearchResultsView extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        if(this.props.results !== null && this.props.results.length > 0) {
            return (
                <div className="tab-content">
                    <SearchTab
                        tabID={'#first_tab'}
                        active="true"
                        data={this.props.results}
                    />
                </div>
            );
        }
    }
}



class SearchView extends React.Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        let searchValue = this.props.location.query.value;
        let typeValue = this.props.location.query.type;

        if(searchValue !== undefined) {
            const { dispatch } = this.props;

            if(typeValue !== undefined) {
                dispatch(SearchActions.searchByType(searchValue, typeValue));
            } else {
                dispatch(SearchActions.homepageSearch(searchValue));
            }
        }
    }


    renderContent() {
        return (
            <section id="pesquisa_data">
                <div className="g-pt-40">
                    <div className="text-center g-mb-30">
                        <div className="g-mb-30">
                            <h2><span className="g-color-default">Pesquisa</span></h2>
                        </div>
                        <p className="g-page-title">
                            Nam sed erat aliquet libero aliquet commodo.
                            Donec euismod augue non quam finibus, nec iaculis tellus gravida. Integer <br /> efficitur eros ut dui laoreet, ut blandit turpis tincidunt.
                        </p>
                    </div>


                    <div className="tab-v7">
                        <ul className="tab-v7-nav" role="tablist">
                            <li role="presentation" className="active">
                                <Link to={"#search_results_tab"} role="tab" data-toggle="tab">{Constants.SEARCH_TEXT.RESULTS}</Link>
                            </li>
                        </ul>


                        {this.renderSearchResults()}
                    </div>
                </div>
            </section>
        );
    }


    renderSearchResults() {
        const { search } = this.props;

        if(search.loading === false && search.success === true) {
            return <SearchResultsView results={search.data} />;
        }
    }



    render() {
        return (
            <main>
                <HeaderLinks />
                {this.renderContent()}
                <Footer />
            </main>
        );
    }
}


const mapStateToProps = (state) => ({
    search: state.search
});


export default connect(mapStateToProps)(SearchView);