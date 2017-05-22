import React from 'react';
import { connect } from 'react-redux';
import HeaderLinks from '../../components/common/headerLinks';
import Footer from '../../components/common/footer';
import { Link } from 'react-router';
import { isActiveTab } from '../../utils/index';
import { GeneralObjectTab } from '../../components/common/generalObjectTab';
import { Constants } from '../../constants/index';



class ParishesPresidentsView extends React.Component {
    constructor(props) {
        super(props);

        this.currentDate = "1976-2013";
        this.state = {
            currentParish: Constants.PARISHES_NAMES[0],
            activeTab: this.currentDate,
            currentPage: 1
        };
    }


    componentDidMount() {
        const { dispatch } = this.props;

        let obj = {
            name: this.state.currentParish,
            page: this.state.currentPage
        };
    }


    updateCurrentDate(value) {
        this.currentDate = value;
        // Update the active tab!
        this.setState({
            activeTab: this.currentDate
        });
    }


    handleParishChange(e) {
        this.setState({
            currentParish: e.target.value,
            currentPage: 1
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
        return (
            <section id="parishes_presidents">
                <div className="g-pt-40">
                    <div className="text-center g-mb-30">
                        <div className="g-mb-30">
                            <h2><span className="g-color-default">Presidentes das Juntas de Freguesia</span></h2>
                        </div>
                        <p className="g-page-title">Nam sed erat aliquet libero aliquet commodo.
                            Donec euismod augue non quam finibus, nec iaculis tellus gravida. Integer <br /> efficitur eros ut dui laoreet, ut blandit turpis tincidunt.
                        </p>
                    </div>


                    <div className="search_on_list g-mb-30 text-center font-main">
                        <input type="text" placeholder="Pesquisar presidentes&#8230;" />
                    </div>

                    {this.renderParishesSelect()}

                    <div className="tab-v7 g-mt-30">
                        <ul className="tab-v7-nav" role="tablist">
                            <li role="presentation"
                                className={isActiveTab(Constants.DATES.d1974_1976, this.state) ? "active" : ""}>
                                <Link to={"#first_tab"}
                                      onClick={() => this.updateCurrentDate(Constants.DATES.d1974_1976)}
                                      role="tab" data-toggle="tab">{Constants.DATES.d1974_1976}</Link>
                            </li>
                            <li role="presentation"
                                className={isActiveTab(Constants.DATES.d1976_2013, this.state) ? "active" : ""}>
                                <Link to={"#second_tab"}
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


    renderTabsContents() {

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

});


export default connect(mapStateToProps)(ParishesPresidentsView);