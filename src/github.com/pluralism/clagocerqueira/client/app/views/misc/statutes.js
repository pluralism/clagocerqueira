import React from 'react';
import { connect } from 'react-redux';
import HeaderLinks from '../../components/common/headerLinks';
import Footer from '../../components/common/footer';


class StatutesView extends React.Component {
    constructor(props) {
        super(props);
    }



    renderTitle() {
        return (
            <div className="text-center g-mb-30">
                <div className="g-mb-30">
                    <h2><span className="g-color-default">Estatutos da Associação</span></h2>
                </div>
                <p className="g-page-title">Nam sed erat aliquet libero aliquet commodo.
                    Donec euismod augue non quam finibus, nec iaculis tellus gravida. Integer <br /> efficitur eros ut dui laoreet, ut blandit turpis tincidunt.
                </p>
            </div>
        );
    }


    renderPageContent() {
        return (
            <div className="misc-content g-mb-50">
                <div className="text-center g-pt-20">
                    <h1>CAPÍTULO I</h1>
                    <h2>CONSTITUIÇÃO, SEDE, ÁREA E ATRIBUIÇÕES</h2>
                    <h3>ARTIGOS</h3>
                    <h3 className="title_light">1º</h3>
                </div>

                <div className="g-pt-10">
                    <p className="article">
                        A Associação denomina-se “CÍRCULO LAGO CERQUEIRA”, e vai ter a sua sede na rua Carvalhas
                        de Sá, freguesia de São Gonçalo, concelho de Amarante, é criada por tempo indeterminada.
                    </p>
                </div>


                <div className="text-center g-pt-20">
                    <h3 className="title_light">2º</h3>
                </div>


                <div className="g-pt-10">
                    <p className="article">
                        A Associação “CÍRCULO LAGO CERQUEIRA”, desenvolve a sua atividade em
                        Portugal e no Mundo, com toda a independência em relação a Autarquias,
                        Partidos Políticos, Confissões Religiosas e Entidades Privadas.
                    </p>
                </div>


                <div className="text-center g-pt-20">
                    <h3 className="title_light">3º</h3>
                </div>


                <div className="g-pt-10">
                    <p className="article">
                        A Associação tem por objeto divulgações, conferências, exposições, promoção de
                        atividades e eventos, projetos e programas culturais.
                    </p>
                </div>


                <div className="text-center new_chapter">
                    <h1>CAPÍTULO II</h1>
                    <h3>DOS ASSOCIADOS</h3>
                    <h3 className="title_light">4º</h3>
                </div>


                <div className="g-pt-10">
                    <p className="article">
                        Serão admitidos como associados as pessoas que para tal sejam propostos e satisfaçam
                        os condicionalismos prescritos nestes estatutos.
                    </p>
                </div>


                <div className="text-center g-pt-20">
                    <h3 className="title_light">5º</h3>
                </div>


                <div className="g-pt-10">
                    <p className="article">
                        São direitos e deveres dos associados: <br />
                        a) Propor, eleger e ser eleito para os corpos diretivos da Associação;
                        <br />
                        b) Tomar parte ativa nas Assembleias Gerais, velar pelo cumprimento dos Estatutos e empenhar-se na prossecução dos fins da Associação;
                        <br />
                        c) Promover o fortalecimento da Associação e a unidade dos seus associados na defesa dos seus direitos e interesses e defesa da Associação;
                        <br />
                        d) Contribuir com a quota mínima que a Assembleia Geral deliberar.
                    </p>
                </div>


                <div className="text-center g-pt-20">
                    <h3 className="title_light">6º</h3>
                </div>


                <div className="g-pt-10">
                    <p className="article">
                        Os associados estão sujeitos às seguintes sanções:
                        <br />
                        a) Advertência por escrito;
                        <br />
                        b) Suspensão temporária;
                        <br />
                        c) Demissão.
                    </p>
                </div>


                <div className="text-center new_chapter">
                    <h1>CAPÍTULO III</h1>
                    <h3>CORPOS DIRETIVOS</h3>
                    <h3 className="title_light">7º</h3>
                </div>


                <div className="g-pt-10">
                    <p className="article">
                        Os corpos diretivos da Associação são: A Assembleia Geral, a Direção e o
                        Conselho Fiscal.
                    </p>
                </div>


                <div className="text-center g-pt-20">
                    <h3 className="title_light">8º</h3>
                </div>


                <div className="g-pt-10">
                    <p className="article">
                        Da Assembleia Geral fazem parte todos os associados em pleno uso dos
                        seus direitos, sendo a mesa composta por um Presidente e dois Secretários.
                    </p>
                </div>


                <div className="text-center g-pt-20">
                    <h3 className="title_light">9º</h3>
                </div>


                <div className="g-pt-10">
                    <p className="article">
                        Compete à Assembleia Geral:
                        <br />
                        a) Eleger de três em três anos os membros da Mesa da Assembleia Geral, da Direção e do Conselho Fiscal;
                        <br />
                        b) Deliberar sobre o relatório e contas de cada exercício e orçamento que lhe seja apresentado pela Direção.
                    </p>
                </div>


                <div className="text-center g-pt-20">
                    <h3 className="title_light">10º</h3>
                </div>


                <div className="g-pt-10">
                    <p className="article">
                        1 – A Assembleia Geral reunirá ordinariamente uma vez em cada ano para exercer
                        obrigatoriamente as atribuições que lhe são conferidas;
                        <br />
                        2 – A Assembleia Geral reunirá extraordinariamente sempre que necessário e seja
                        convocada pela Direção, Mesa de Assembleia Geral ou um mínimo de um terço dos associados.
                    </p>
                </div>


                <div className="text-center g-pt-20">
                    <h3 className="title_light">11º</h3>
                </div>


                <div className="g-pt-10">
                    <p className="article">
                        A Assembleia Geral só poderá funcionar em primeira convocação com a presença de pelo menos
                        metade dos seus associados. Caso á hora marcada não exista quórum, funciona com qualquer
                        número meia hora depois, em segunda convocatória.
                    </p>
                </div>


                <div className="text-center g-pt-20">
                    <h3 className="title_light">12º</h3>
                </div>


                <div className="g-pt-10">
                    <p className="article">
                        A Assembleia Geral é convocada por meio de aviso aos associados, com a antecedência mínima
                        de oito dias. No aviso indicar-se-á o dia, hora, local e respetiva ordem de trabalhos.
                    </p>
                </div>


                <div className="text-center g-pt-20">
                    <h3 className="title_light">13º</h3>
                </div>


                <div className="g-pt-10">
                    <p className="article">
                        1 – A Direção será composta por um Presidente, Tesoureiro, Secretário
                        e dois Vogais, eleitos em Assembleia Geral, de entre os associados em pleno
                        gozo dos seus direitos.
                        <br />
                        2 – A apresentação de listas deverá ser feita por um número de cinco associados
                        até três dias antes da Assembleia Geral.
                        <br />
                        3 – Só poderão ser eleitos para corpos diretivos, todos os associados inscritos
                        até um mês antes do ato eleitoral.
                        <br />
                        4 – Podem ser criadas secções para auxiliar a direção nos fins que lhe são cometidos.
                    </p>
                </div>


                <div className="text-center g-pt-20">
                    <h3 className="title_light">14º</h3>
                </div>


                <div className="g-pt-10">
                    <p className="article">
                        Compete à Direção:
                        <br />
                        a) Executar as decisões da Assembleia Geral;
                        <br />
                        b) Tomar todas as iniciativas consideradas importantes para a prossecução dos fins
                        da Associação;
                        <br />
                        c) Deliberar sobre a admissão, sanção ou exclusão dos associados;
                        <br />
                        d) Representar a Associação, bastando para que a mesma fique obrigada perante terceiros,
                        a assinatura de dois membros da Direção, sendo uma delas a do Presidente.
                    </p>
                </div>


                <div className="text-center g-pt-20">
                    <h3 className="title_light">15º</h3>
                </div>


                <div className="g-pt-10">
                    <p className="article">
                        1 – O Conselho Fiscal é composto por um Presidente, Vice-Presidente e um Vogal.
                        <br />
                        2 – O Conselho Fiscal reunirá pelo menos uma vez em cada trimestre.
                    </p>
                </div>



                <div className="text-center new_chapter">
                    <h1>CAPÍTULO IV</h1>
                    <h3>DISPOSIÇÕES GERAIS</h3>
                    <h3 className="title_light">16º</h3>
                </div>


                <div className="g-pt-10">
                    <p className="article">
                        Constituem receitas da Associação:
                        <br />
                        a) As joias de inscrição e quotizações, pagas pelos associados;
                        <br />
                        b) Subsídio, ofertas e outras receitas, desde que não constituam
                        encargo político ou qualquer compromisso para a Associação.
                    </p>
                </div>


                <div className="text-center g-pt-20">
                    <h3 className="title_light">17º</h3>
                </div>


                <div className="g-pt-10">
                    <p className="article">
                        Realizar-se-á uma Assembleia Geral, obrigatoriamente dentro de um ano, após a
                        publicação dos estatutos no Diário da República.
                    </p>
                </div>


                <div className="text-center g-pt-20">
                    <h3 className="title_light">18º</h3>
                </div>


                <div className="g-pt-10">
                    <p className="article">
                        À Assembleia Geral compete determinar o destino a dar ao património da Associação,
                        em caso de dissolução.
                    </p>
                </div>


                <div className="text-center g-pt-20">
                    <h3 className="title_light">19º</h3>
                </div>


                <div className="g-pt-10">
                    <p className="article">
                        Em todos os casos em que os presentes Estatutos sejam omissos, reger-se-á a
                        sua solução pela Lei vigente e pelo regulamento geral interino cuja aprovação e
                        alteração compete à Assembleia Geral.
                    </p>
                </div>

                <hr />

                <div className="date">
                    <p>Amarante, 02 de março de 2005</p>
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
                    <HeaderLinks />
                    {this.renderTitleAndContent()}
                    <Footer />
                </main>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(StatutesView);