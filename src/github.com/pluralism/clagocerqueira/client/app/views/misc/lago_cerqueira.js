import React from 'react';
import { connect } from 'react-redux';
import Footer from '../../components/common/footer';


class LagoCerqueiraView extends React.Component {
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
                    <h2><span className="g-color-default">António Lago Cerqueira</span></h2>
                </div>
            </div>
        );
    }


    renderPageContent() {
        return (
            <div className="misc-content g-mb-50">
                <div className="g-pt-10">
                    <p className="article">
                        António Joaquim Machado do Lago Cerqueira nasceu na casa da Calçada,
                        freguesia de Cepelos, a 11 de outubro de 1880, em Amarante. Era filho de Francisco
                        Joaquim Pereira do Lago Cerqueira e de Inácia Maria Machado. O seu
                        percurso de vida destaca-se pelo grande entusiasmo que dedicou à República e à sua terra
                        natal – Amarante. Publicamente era conhecido por António do Lago Cerqueira.
                    </p>

                    <p className="article">
                        Os primeiros estudos foram efetuados no colégio do Espirito Santo,
                        em Braga, mais tarde terminados os estudos secundários, ingressou na Universidade Coimbra,
                        onde se formou em 1904 como bacharel em Filosofia, curso que continha também a vertente
                        de agricultura. Nesses anos de formação e de enriquecimento da sua personalidade adquire a
                        admiração pelo regime Republicano. Destaca-se também entre os estudantes nesta
                        cidade pela vida faustosa que levava, sendo a sua casa um espaço obrigatório de quem
                        gostava de usufruir de determinados prazeres da vida, transformando-se muitas das tertúlias e
                        convívios em acontecimentos memoráveis.
                    </p>

                    <p className="article">
                        Depois de terminar a sua vida académica, dedica-se à administração e ao engrandecimento das propriedades de que era proprietário. Defensor de um estado republicano para Portugal, pertenceu desde cedo ao Partido Republicano Português e mais tarde ao Partido Democrático, onde sempre militou. Com o advento da República, em outubro de 1910, e encontrando-se a viver em Amarante ocupa o lugar de vice – presidente da Comissão Administrativa do Município de Amarante, para ainda neste mês ocupar o cargo de Presidente. Foi eleito ininterruptamente para a presidência do município amarantino desde 1911 até 1917. Neste período recebe na sua terra natal e na sua Casa da Calçada inúmeras personalidades republicanas de destaque como Afonso Costa, António Maria da Silva, Rodrigo Rodrigues, Agatão Lança entre muitas outras.
                    </p>

                    <p className="article">
                        No ano de 1918 durante o período sidonista esteve preso no Porto, e depois de sofrer as agruras do aljube exila-se em França. Regressa a Amarante em março de 1919, depois de terminada a “Monarquia do Norte”. O regresso à sua terra natal foi marcante para a sociedade amarantina, que o desejava.
                    </p>

                    <p className="article">
                        Depois deste retorno ocupa o lugar de Presidente da Câmara Municipal de Amarante e apresenta-se como candidato, nas eleições de 1919 e 1925 pelo partido Democrático, ao lugar de deputado e em ambas é eleito em sufrágio. Torna a ser eleito, em 1923/25, presidente da Comissão Executiva do Município de Amarante e ainda para o triénio de 1926/28.
                    </p>

                    <p className="article">
                        António do Lago Cerqueira, pelo seu caracter e inteligência, pelos inúmeros e importantes melhoramentos, que preconizou em Amarante, conquistou o respeito e tornou-se uma figura inolvidável dos seus conterrâneos, para sempre.
                    </p>

                    <p className="article">
                        Depois de ter declinado vários convites para ocupar pastas ministeriais, aceitou participar no governo presidido por António Maria da Silva em julho de 1925, sobraçando as pastas do Trabalho e dos Negócios Estrangeiros.
                        Fez também parte do directório do Partido Democrático.
                    </p>

                    <p className="article">
                        Republicano como poucos, foi por António do Lago Cerqueira que saiu o último “Viva a República” no interior da Assembleia da República, em 31 de maio de 1926, dia da realização dos últimos trabalhos parlamentares, pois terminou aqui o período legislativo. O Parlamento da República só 48 anos depois voltaria a ter os seus lugares ocupados com membros eleitos livremente.
                    </p>

                    <p className="article">
                        A Revolução de 3 de Fevereiro de 1927, surge perante o inconformismo de inúmeros republicanos e perante o rumo que o país estava a tomar. António do Lago Cerqueira também inconformado com o que estava a acontecer intervém diretamente no Porto ao lado dos revoltosos. Em Amarante as tropas revolucionárias chegaram mesmo a entrincheirar-se nas suas propriedades para lutarem contra as tropas fiéis ao governo. Fica patenteado mais uma vez a enorme devoção deste ilustre amarantino à causa republicana. Com o fracasso deste movimento revolucionário, é forçado a um novo exilio, agora mais longo. Sai de Portugal voltando novamente a França.
                        É julgado e condenado pelo Tribunal Militar Especial, entretanto criado para julgar os revoltosos.
                    </p>

                    <p className="article">
                        Durante este forçado exilio, faz parte do grupo dos emigrados em Paris, filiados no Partido Republicano Português integrado nesse mesmo grupo nas conversações com a Liga da Defesa da República, denominada Liga de Paris, vindo mesmo a fazer parte do programa de publicações organizada em Beiriz, por Cunha Leal, subordinado ao tema “A Situação da Lavoura, especialmente da Viticultura”.
                    </p>

                    <p className="article">
                        Partilha o afastamento do país, tal como no primeiro exilio, com Bernardino Machado, Afonso Costa, entre muitos outros.
                    </p>

                    <p className="article">
                        Em França, dedica-se ainda ao aprofundamento dos conhecimentos em viticultura e volta a estudar, frequentando um curso sobre vinificação, no Instituto Nacional de Agronomia. Publica um livro, em 1929, intitulado “Os vinhos de Portugal”.
                    </p>

                    <p className="article">
                        Amnistiado em 1935 e depois de revisitar a Portugal sensivelmente de três em três meses, regressa ao nosso país definitivamente após o início da segunda Guerra Mundial, para se dedicar às Caves da Calçada, por ele fundadas.
                    </p>

                    <p className="article">
                        Estas importantes caves, tiveram o seu início com a construção de uma adega em 1917, tendo efectuado registos de patentes de vinhos ainda antes desta data. Cria em 1944 uma sociedade denominada António de Lago Cerqueira. Através do comércio vinícola leva o nome de Amarante e dos vinhos verdes a grande parte do mundo, muitos registos de vinhos ainda perduram.
                    </p>

                    <p className="article">
                        Foi agraciado em 1926, com a ordem honorífica de Grande Oficial da Ordem de Cristo
                        A 28 de outubro de 1945, morre na sua Casa da Calçada, em Amarante. A 9 de novembro de 1947, Amarante presta-lhe uma impressionante homenagem pública, a um dos maiores filhos da terra, com a inauguração de um busto em sua memória, em plena ditadura e contra a qual ele tanto lutou.
                    </p>

                    <hr />

                    <div className="author">
                        <p>Pedro Alves Pinto</p>
                    </div>
                </div>
            </div>
        );
    }


    renderTitleAndContent() {
        return (
            <section id="estatutos_data">
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

export default connect(mapStateToProps)(LagoCerqueiraView);