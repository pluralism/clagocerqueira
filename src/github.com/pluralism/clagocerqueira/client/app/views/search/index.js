import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import HeaderLinks from '../../components/common/headerLinks';
import Footer from '../../components/common/footer';
import { Constants } from '../../constants/index';
import SearchActions from '../../actions/search';



class SearchView extends React.Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        let searchValue = this.props.location.query.valor;

        if(searchValue !== undefined) {
            const { dispatch } = this.props;

            // Perform the actual search here!
            dispatch(SearchActions.homepageSearch(searchValue));
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


                        {this.renderTabsContents()}
                    </div>
                </div>
            </section>
        );
    }


    renderTabsContents() {
        return (
            <div className="tab-content">
            </div>
        );
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