import React from 'react';
import { connect } from 'react-redux';
import HeaderLinks from '../../components/common/headerLinks';
import Footer from '../../components/common/footer';
import { Link } from 'react-router';
import { isActiveTab } from '../../utils/index';
import { GeneralObjectTab } from '../../components/common/generalObjectTab';
import { Constants } from '../../constants/index';
import ParishesPresidentsActions from '../../actions/parishesPresidents';


class ParishesPresidentsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentParish: "Aboadela",
            activeTab: "",
            currentPage: 1
        };
    }

    componentDidMount() {
        const { dispatch, parishesPresidents } = this.props;

        dispatch(ParishesPresidentsActions.getDatesForParish(this.state.currentParish, parishesPresidents.dateAndPageMappings, 
            this.state, parishesPresidents.generalMappings));
    }


    updateCurrentDate(value) {
        const { dispatch } = this.props;

        /**
         * Update the currentDate variable and keep the page
         * as the old one. This allow us to mantain consistency
         * with the lists of councilmen
         */
        // this.currentDate = value;
        // Update the active tab!
        this.setState({
            activeTab: value
        }, () => {
            dispatch({
                type: Constants.PARISHES_UPDATE_DATE,
                currentDate: value
            });
        });
    }


    getNextPageContent() {
        const { parishesPresidents, dispatch } = this.props;
        let obj = parishesPresidents.dateAndPageMappings[parishesPresidents.currentDate];
        let currentPage = obj.page;
        let parishPresidentMapping = parishesPresidents.objects_data[obj.mapping].dates.objects;

        if(currentPage < parishPresidentMapping.max_pages) {
            obj.page += 1;

            dispatch(ParishesPresidentsActions.getParishPresidentsByPage(
                parishesPresidents.currentDate,
                this.state.currentParish,
                obj.mapping,
                obj.page));
        }
    }


    getPreviousPageContent() {
        const { parishesPresidents, dispatch } = this.props;
        let obj = parishesPresidents.dateAndPageMappings[parishesPresidents.currentDate];
        let currentPage = obj.page;

        if(currentPage > 1) {
            obj.page -= 1;

            dispatch(ParishesPresidentsActions.getParishPresidentsByPage(
                parishesPresidents.currentDate,
                this.state.currentParish,
                obj.mapping,
                obj.page));
        }
    }


    handleParishChange(e) {
        const { dispatch, parishesPresidents } = this.props;

        this.setState({
            currentParish: e.target.value,
            currentPage: 1
        }, () => {
        const { dispatch, parishesPresidents } = this.props;
            dispatch(ParishesPresidentsActions.getDatesForParish(this.state.currentParish, parishesPresidents.dateAndPageMappings, 
                this.state, parishesPresidents.generalMappings));
        });

    }


    renderParishesSelect() {
        return (
            <div className="parishes_select">
                <label className="select">
                    <select value={this.state.currentParish}
                            onChange={::this.handleParishChange}
                            className="rounded font-main">
                        {Constants.PARISHES_NAMES.map((item, index) => {
                            return <option key={index} value={item}>{item}</option>
                        })}
                    </select>
                </label>
            </div>
        );
    }


    renderContent() {
        const { parishesPresidents } = this.props;

        return (
            <section id="parishes_presidents">
                <div className="g-pt-40">
                    <div className="text-center g-mb-30">
                        <div className="g-mb-30">
                            <h2><span className="g-color-default">Presidentes das Juntas de Freguesia</span></h2>
                        </div>
                        <p className="g-page-title">
                            Seleccione a freguesia e de seguida serão apresentados todos os presidentes para o intervalo de tempo definido.
                        </p>
                        <p className="g-page-title">
                            Poderá também optar por pesquisar pelo presidente que procura.
                        </p>
                        <p className="g-page-title">
                            A pesquisa será realizada entre todas as freguesias.
                        </p>
                    </div>


                    <div className="search_on_list g-mb-30 text-center font-main">
                        <form target={"_blank"} action={"/pt/pesquisa"} method={"get"}>
                            <input type="text" name="value" placeholder="Pesquisar presidentes&#8230;" autoFocus />
                            <input type="hidden" name="type" defaultValue={"parishes_president"} />
                        </form>
                    </div>

                    {this.renderParishesSelect()}

                    <div className="tab-v7 g-mt-30">
                        <ul className="tab-v7-nav" role="tablist">
                            {parishesPresidents.dates.map((item, index) => {
                                return <li key={item} role="presentation" className={isActiveTab(item, this.state) ? "active" : ""}>
                                    <Link role="tab" data-toggle="tab" onClick={() => this.updateCurrentDate(item)}>{item}</Link>
                                </li>
                            })}
                        </ul>

                        {this.renderTabsContents()}
                    </div>
                </div>
            </section>
        );
    }


    renderCustomTab(date, mapping, parishesPresidents) {
        if(this.state.activeTab === date && 
            parishesPresidents.objects_data[mapping] !== undefined &&
            parishesPresidents.objects_data[mapping].dates.objects.objects_data.length !== 0) {
            return <GeneralObjectTab
                tabID={'#first_tab'}
                subtitle={"Presidentes"}
                active={this.state.activeTab === date}
                dateMapping={mapping}
                data={parishesPresidents.objects_data[mapping].
                    dates.objects.objects_data} />
        } else
            return (
                <p className="for_clearing">Por Apurar</p>
            );
    }


    renderTabsContents() {
        const { parishesPresidents } = this.props;
        const mapping = parishesPresidents.dateAndPageMappings[parishesPresidents.currentDate] === undefined ? "" : 
                        parishesPresidents.dateAndPageMappings[parishesPresidents.currentDate].mapping;
        return (
            <div className="tab-content">
                {this.renderCustomTab(parishesPresidents.currentDate, mapping, parishesPresidents)}

                <div className="control-buttons">
                    <div className="prev-button" onClick={() => this.getPreviousPageContent()} />
                    <div className="next-button" onClick={() => this.getNextPageContent()} />
                </div>
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
    parishesPresidents: state.parishesPresidents
});


export default connect(mapStateToProps)(ParishesPresidentsView);
