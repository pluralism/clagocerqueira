import React from 'react';
import { connect } from 'react-redux';
import Footer from '../../components/common/footer';


class SocialEntitiesView extends React.Component {
    constructor(props) {
        super(props);
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


    renderTitle() {
        return (
            <div className="text-center g-mb-30">
                <div className="g-mb-30">
                    <h2><span className="g-color-default">Órgãos Sociais</span></h2>
                </div>
                <div className="g-mb-30 g-pt-30">
                    <h5><span className="g-color-default subtitle">2017/2020</span></h5>
                </div>
            </div>
        );
    }


    renderPageContent() {
        return (
            <div className="misc-content g-mb-50">
                <div className="text-center g-pt-40">
                    <h2>ASSEMBLEIA GERAL</h2>
                </div>

                <div className="text-center g-pt-20">
                    <p className="social_entities_text">
                        <strong>Presidente</strong> – Ricardo Fernando Pereira Ribeiro
                    </p>
                    <p className="social_entities_text">
                        <strong>Secretário</strong> – João Pedro Sousa Alves Pinheiro
                    </p>
                    <p className="social_entities_text">
                        <strong>Secretário</strong> – Pedro Joaquim Catão dos Santos
                    </p>
                </div>


                <div className="text-center g-pt-40">
                    <h2>DIRECÇÃO</h2>
                </div>


                <div className="text-center g-pt-20">
                    <p className="social_entities_text">
                        <strong>Presidente</strong> – Pedro Varejão Alves Pinto
                    </p>
                    <p className="social_entities_text">
                        <strong>Tesoureiro</strong> – Ricardo Emanuel dos Santos Matias Pinto
                    </p>
                    <p className="social_entities_text">
                        <strong>Secretário</strong> – Luís Carlos Teixeira Coelho
                    </p>
                    <p className="social_entities_text">
                        <strong>Vogal</strong> – Carlos Alberto Teixeira Gonçalves da Silva
                    </p>
                    <p className="social_entities_text">
                        <strong>Vogal</strong> – Carlos Machado Teixeira
                    </p>
                </div>
            </div>
        );
    }


    renderTitleAndContent() {
        return (
            <section id="orgaos_sociais_data">
                <div className="g-pt-40">
                    {this.renderTitle()}
                    <hr />
                    {this.renderPageContent()}
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


const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(SocialEntitiesView)