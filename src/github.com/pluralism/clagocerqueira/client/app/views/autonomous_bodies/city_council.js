import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Footer from '../../components/common/footer';
import { isActiveTab } from '../../utils/index';
import { Constants } from '../../constants/index';
import { GeneralObjectTab } from '../../components/common/generalObjectTab';
import GeneralObjectsActions from '../../actions/generalObjects';



class CityCouncilView extends React.Component {
    constructor(props) {
        super(props);

        this.currentDate = Constants.DATES.d1976_2013;
        this.dateAndPageMappings = {
            [Constants.DATES.d1976_2013]: {
                mapping: 'data1976_2013',
                page: 1
            },
        };


        this.state = {
            activeTab: this.currentDate,
            canSwitchPage: true,
        };


        document.addEventListener("keydown", ::this.handleKeyDownEvent);
    }


    canUseSwitchPage() {
        this.setState({
            canSwitchPage: false
        }, () => {
            setTimeout(() => {
                this.setState({
                    canSwitchPage: true
                });
            }, Constants.MINIMUM_WAIT_TIME);
        });
    }


    handleKeyDownEvent(e) {
        if(e.keyCode === 37 && this.state.canSwitchPage) {
            // Left arrow was pressed
            this.getPreviousPageContent();
            // Prevent the user from pressing the button too fast (wait 0.5s)
            this.canUseSwitchPage();
        } else if(e.keyCode === 39 && this.state.canSwitchPage) {
            // Right arrow was pressed
            this.getNextPageContent();
            // Prevent the user from pressing the button too fast (wait 0.5s)
            this.canUseSwitchPage();
        }
    }


    renderHeader() {
        return (
            <nav className="clc-header one-page-header navbar navbar-default navbar-fixed-top navbar-toggleable-sm" data-role="navigation">
                <div className="navbar-header">
                    <div className="menu-container page-scroll">
                        <button type="button" className="navbar-toggle" data-toggle="collapse"
                                data-target=".clc-collapse">
                            <span className="sr-only">Toggle Navigation</span>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                        </button>

                        <a href="#body" className="navbar-brand main-font">
                            <img src={require('../../static/img/logo.jpg')} alt="Logo" className="img-responsive" />
                        </a>
                    </div>
                </div>

                <div className="collapse navbar-collapse clc-collapse">
                    <ul className="nav navbar-nav">
                        <li className="page-scroll home">
                            <a href="#">Início</a>
                        </li>

                        <li className="page-scroll">
                            <a href="#autores_amarantinos">Autores Amarantinos</a>
                        </li>

                        <li className="page-scroll">
                            <a href="#orgaos_autarquicos">Órgãos Autárquicos</a>
                        </li>

                        <li className="page-scroll">
                            <a href="#associacoes">Associações</a>
                        </li>

                        <li className="page-scroll">
                            <a href="#festividades">Festividades</a>
                        </li>

                        <li className="page-scroll">
                            <a href="#imprensa">Imprensa</a>
                        </li>

                        <li className="page-scroll">
                            <a href="#personalidades">Personalidades</a>
                        </li>

                        <li className="page-scroll">
                            <a href="#contacto">Contacto</a>
                        </li>

                        <li className="page-scroll">
                            <a href="#patrimonio_natural">Património Natural</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }


    componentDidMount() {
        const { dispatch, params } = this.props;

        const mappings = [
            [Constants.MAPPINGS.d1976_2013, Constants.DATES.d1976_2013]
        ];


        if(params.type !== undefined) {
            if(params.type === Constants.DATES.d1976_2013) {
                this.updateCurrentDate(params.type);
            }
        }

        /**
         * This function is invoked immediately after a component is mounted.
         * This is a good place to load data from a remote endpoint and to perform
         * network requests.
         */
        dispatch(GeneralObjectsActions.getAlLDataFromCityCouncil(mappings));
    }


    updateCurrentDate(value) {
        /**
         * Update the currentDate variable and keep the page
         * as the old one. This allow us to mantain consistency
         * with the lists of councilmen
         */
        this.currentDate = value;

        // Update the active tab!
        this.setState({
            activeTab: this.currentDate
        });
    }


    getPreviousPageContent() {
        const { dispatch } = this.props;
        let obj = this.dateAndPageMappings[this.currentDate];
        let currentPage = obj.page;

        if(currentPage > 1) {
            obj.page -= 1;

            dispatch(GeneralObjectsActions.getDataByPageCityCouncil(this.currentDate,
                obj.mapping, obj.page));
        }
    }


    getNextPageContent() {
        const { cityCouncil, dispatch } = this.props;
        let obj = this.dateAndPageMappings[this.currentDate];
        let currentPage = obj.page;
        let cityCouncilMapping = cityCouncil.data[obj.mapping];

        if(currentPage < cityCouncilMapping.objects.max_pages) {
            obj.page += 1;

            dispatch(GeneralObjectsActions.getDataByPageCityCouncil(this.currentDate,
                obj.mapping, obj.page));
        }
    }


    renderTabsContents() {
        const { cityCouncil } = this.props;

        return (
            <div className="tab-content">
                <GeneralObjectTab
                    tabID={'#first_tab'}
                    subtitle={"Assembleia Municipal"}
                    active={this.state.activeTab === Constants.DATES.d1976_2013}
                    dateMapping={Constants.MAPPINGS.d1976_2013}
                    data={cityCouncil.data[Constants.MAPPINGS.d1976_2013].objects.objects_data} />


                <div className="control-buttons">
                    <div className="prev-button" onClick={() => this.getPreviousPageContent()} />
                    <div className="next-button" onClick={() => this.getNextPageContent()} />
                </div>
            </div>
        );
    }


    renderTitleAndContent() {
        return (
            <section id="assembleia_data">
                <div className="g-pt-40">
                    <div className="text-center g-mb-30">
                        <div className="g-mb-30">
                            <h2><span className="g-color-default">Assembleia Municipal</span></h2>
                        </div>
                        <p className="g-page-title">Nam sed erat aliquet libero aliquet commodo.
                            Donec euismod augue non quam finibus, nec iaculis tellus gravida. Integer <br /> efficitur eros ut dui laoreet, ut blandit turpis tincidunt.</p>
                    </div>


                    <div className="search_on_list g-mb-30 text-center font-main">
                        <input type="text" placeholder="Pesquisar nos dados da assembleia&#8230;" />
                    </div>


                    <div className="tab-v7">
                        <ul className="tab-v7-nav" role="tablist">
                            <li role="presentation"
                                className={isActiveTab(Constants.DATES.d1976_2013, this.state)}>
                                <Link to={"#fifth_tab"}
                                      onClick={() => this.updateCurrentDate(Constants.DATES.d1976_2013)}
                                      role="tab" data-toggle="tab">{Constants.DATES.d1976_2013}</Link>
                            </li>
                        </ul>


                        {this.renderTabsContents()}
                    </div>
                </div>
            </section>
        );
    }


    render() {
        return (
            <div>
                <main className="container-fluid">
                    {this.renderHeader()}
                    {this.renderTitleAndContent()}
                    <Footer />
                </main>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    cityCouncil: state.generalObjects
});


export default connect(mapStateToProps)(CityCouncilView);