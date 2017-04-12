import React from 'react';
import { connect } from 'react-redux';
import Footer from '../../components/common/footer';
import { Constants } from '../../constants/index';


class FestivitiesView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

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


    renderUpperSection() {
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
                        <input type="text" placeholder="Pesquisar festividades&#8230;" />
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
                    {this.renderUpperSection()}
                    <Footer />
                </main>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(FestivitiesView)