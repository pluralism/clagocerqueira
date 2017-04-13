import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Footer from '../../components/common/footer';
import { isActiveTab } from '../../utils/index';
import { Constants } from '../../constants/index';



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