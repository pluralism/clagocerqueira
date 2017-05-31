import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import HeaderLinks from '../../components/common/headerLinks';
import Footer from '../../components/common/footer';
import {GeneralObjectTab} from '../../components/common/generalObjectTab';
import { Constants } from '../../constants/index';
import GeneralObjectsActions from '../../actions/generalObjects';


class FestivitiesView extends React.Component {
    constructor(props) {
        super(props);

        const { params } = this.props;

        /**
         * Select the parish that the user wants if it is a valid entry
         * All the valids entries are registered in the PARISHES object, in the
         * Constants file
         */
        if(Object.keys(Constants.PARISHES).indexOf(params.type) > -1) {
            this.state = {
                currentParish: params.type,
                currentPage: 1
            };
        } else {
            this.state = {
                currentParish: 'aboadela_sanche',
                currentPage: 1
            };
        }

        this.mappings = [];
        Object.keys(Constants.PARISHES).forEach((item) => {
            this.mappings.push([item, item]);
        });
    }


    componentDidMount() {
        const { dispatch } = this.props;
        let obj = {
            mapping: this.state.currentParish,
            page: this.state.currentPage
        };



        dispatch(GeneralObjectsActions.
        getDataByPageParishes(this.state.currentParish,
            obj.mapping,
            obj.page));
    }


    renderContent() {
        return (
            <section id="festividades_data">
                <div className="g-pt-40">
                    <div className="text-center g-mb-30">
                        <div className="g-mb-30">
                            <h2><span className="g-color-default">Festividades</span></h2>
                        </div>
                        <p className="g-page-title">Nam sed erat aliquet libero aliquet commodo.
                            Donec euismod augue non quam finibus, nec iaculis tellus gravida. Integer <br /> efficitur eros ut dui laoreet, ut blandit turpis tincidunt.
                        </p>
                    </div>


                    <div className="search_on_list g-mb-30 text-center font-main">
                        <form target={"_blank"} action={"/pt/pesquisa"} method={"get"}>
                            <input type="text" name="value" placeholder="Pesquisar festividades&#8230;" autoFocus />
                            <input type="hidden" name="type" defaultValue={"festivity"} />
                        </form>
                    </div>

                    {this.renderParishesSelect()}

                    <div className="tab-v7 g-mt-30">
                        <ul className="tab-v7-nav" role="tablist">
                            <li role="presentation" className="active">
                                <Link to={"#first_tab"}
                                      role="tab"
                                      data-toggle="tab">{Constants.PARISHES[this.state.currentParish]}
                                </Link>
                            </li>
                        </ul>

                        {this.renderTabContents()}
                    </div>
                </div>
            </section>
        );
    }


    refreshListContent() {
        const { dispatch } = this.props;

        let obj = {
            mapping: this.state.currentParish,
            page: this.state.currentPage
        };

        dispatch(GeneralObjectsActions.
        getDataByPageParishes(this.state.currentParish,
            obj.mapping,
            obj.page));
    }


    getPreviousPageContent() {
        let currentPage = this.state.currentPage;

        if(currentPage > 1) {
            this.setState({
                currentPage: currentPage - 1
            }, () => {
                this.refreshListContent();
            });
        }
    }


    getNextPageContent() {
        const { parishes } = this.props;
        let currentPage = this.state.currentPage;

        if(currentPage < parishes.max_pages) {
            this.setState({
                currentPage: currentPage + 1
            }, () => {
                this.refreshListContent();
            });
        }
    }


    renderTabContents() {
        const { parishes } = this.props;

        return (
            <div className="tab-content">
                <GeneralObjectTab
                    tabID={'#first_tab'}
                    subtitle={Constants.PARISHES[this.state.currentParish]}
                    active={true}
                    data={parishes.objects_data} />


                <div className="control-buttons">
                    <div className="prev-button" onClick={() => this.getPreviousPageContent()}/>
                    <div className="next-button" onClick={() => this.getNextPageContent()}/>
                </div>
            </div>
        );
    }


    handleParishChange(e) {
        this.setState({
            currentParish: e.target.value,
            page: 1
        }, () => {
            const { dispatch } = this.props;
            let obj = {
                mapping: this.state.currentParish,
                page: this.state.currentPage
            };


            dispatch(GeneralObjectsActions.
            getDataByPageParishes(this.state.currentParish,
                obj.mapping,
                obj.page));
        });
    }



    renderParishesSelect() {
        return (
            <div className="parishes_select">
                <label className="select">
                    <select value={this.state.currentParish}
                            onChange={::this.handleParishChange}
                            className="rounded font-main">
                        {this.mappings.map((item) => {
                            return <option key={item[1]} value={item[1]}>{Constants.PARISHES[item[1]]}</option>
                        })}
                    </select>
                </label>
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
    parishes: state.parishes
});

export default connect(mapStateToProps)(FestivitiesView)