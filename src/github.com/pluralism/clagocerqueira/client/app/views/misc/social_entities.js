import React from 'react';
import { connect } from 'react-redux';
import HeaderLinks from '../../components/common/headerLinks';
import Footer from '../../components/common/footer';


class SocialEntitiesView extends React.Component {
    constructor(props) {
        super(props);
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
                        <strong>Secretário</strong> – António José Moura Ferreira
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


                <div className="text-center g-pt-40">
                    <h2>CONSELHO FISCAL</h2>
                </div>


                <div className="text-center g-pt-20">
                    <p className="social_entities_text">
                        <strong>Presidente</strong> – Pedro Joaquim Catão dos Santos
                    </p>
                    <p className="social_entities_text">
                        <strong>Vice-presidente</strong> – André Pinto da Silva Clemente Teixeira
                    </p>
                    <p className="social_entities_text">
                        <strong>Vogal</strong> – Sérgio Martins Vieira da Cunha
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
                    <HeaderLinks />
                    {this.renderTitleAndContent()}
                    <Footer />
                </main>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(SocialEntitiesView)