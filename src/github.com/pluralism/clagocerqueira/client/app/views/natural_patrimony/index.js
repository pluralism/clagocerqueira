import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { isActiveTab } from '../../utils/index';
import { GeneralObjectTab } from '../../components/common/generalObjectTab';
import HeaderLinks from '../../components/common/header_links';
import Footer from '../../components/common/footer';
import { Constants } from '../../constants/index';
import GeneralObjectsActions from '../../actions/generalObjects';




class NaturalPatrimonyView extends React.Component {
    constructor(props) {
        super(props);

        this.currentName = Constants.NATURAL_PATRIMONY.BROOKS;
        this.nameAndPageMappings = {
            [Constants.NATURAL_PATRIMONY.BROOKS]: {
                mapping: Constants.NATURAL_PATRIMONY.BROOKS,
                page: 1
            },
            [Constants.NATURAL_PATRIMONY.RIVERS]: {
                mapping: Constants.NATURAL_PATRIMONY.RIVERS,
                page: 1
            },
            [Constants.NATURAL_PATRIMONY.MOUNTAINS]: {
                mapping: Constants.NATURAL_PATRIMONY.MOUNTAINS,
                page: 1
            },
        };

        this.state = {
            activeTab: Constants.NATURAL_PATRIMONY.BROOKS,
            canSwitchPage: true,
        };
    }


    componentDidMount() {
        const mappings = [
            [Constants.NATURAL_PATRIMONY.BROOKS, Constants.NATURAL_PATRIMONY.BROOKS],
            [Constants.NATURAL_PATRIMONY.RIVERS, Constants.NATURAL_PATRIMONY.RIVERS],
            [Constants.NATURAL_PATRIMONY.MOUNTAINS, Constants.NATURAL_PATRIMONY.MOUNTAINS]
        ];


        const { dispatch, params } = this.props;


        if(params.type !== undefined) {
            if(params.type === Constants.NATURAL_PATRIMONY.BROOKS ||
                params.type === Constants.NATURAL_PATRIMONY.RIVERS ||
                params.type === Constants.NATURAL_PATRIMONY.MOUNTAINS) {
                this.updateCurrentName(params.type);
            }
        }


        /**
         * This function is invoked immediately after a component is mounted.
         * This is a good place to load data from a remote endpoint and to perform
         * network requests.
         *
         * On this function we try to extract all the natural patrimony data that
         * corresponds to the first page
         */
        dispatch(GeneralObjectsActions.getAllDatafromNaturalPatrimony(mappings));
    }


    renderTabsContents() {
        const { natural_patrimony } = this.props;

        return (
            <div className="tab-content">
                <GeneralObjectTab
                    tabID={'#first_tab'}
                    subtitle={"Património Natural"}
                    active={this.state.activeTab === Constants.NATURAL_PATRIMONY.BROOKS}
                    data={natural_patrimony.data[Constants.NATURAL_PATRIMONY.BROOKS].objects.objects_data} />

                <GeneralObjectTab
                    tabID={'#second_tab'}
                    subtitle={"Património Natural"}
                    active={this.state.activeTab === Constants.NATURAL_PATRIMONY.RIVERS}
                    data={natural_patrimony.data[Constants.NATURAL_PATRIMONY.RIVERS].objects.objects_data} />

                <GeneralObjectTab
                    tabID={'#third_tab'}
                    subtitle={"Património Natural"}
                    active={this.state.activeTab === Constants.NATURAL_PATRIMONY.MOUNTAINS}
                    data={natural_patrimony.data[Constants.NATURAL_PATRIMONY.MOUNTAINS].objects.objects_data} />

                <div className="control-buttons">
                    <div className="prev-button" onClick={() => this.getPreviousPageContent()}/>
                    <div className="next-button" onClick={() => this.getNextPageContent()}/>
                </div>
            </div>
        );
    }


    getPreviousPageContent() {
        const { dispatch } = this.props;
        let obj = this.nameAndPageMappings[this.currentName];
        let currentPage = obj.page;

        if(currentPage > 1) {
            obj.page -= 1;

            dispatch(GeneralObjectsActions.getDataByPageNaturalPatrimony(this.currentName,
                obj.mapping, obj.page));
        }
    }


    getNextPageContent() {
        const { natural_patrimony, dispatch } = this.props;
        let obj = this.nameAndPageMappings[this.currentName];
        let currentPage = obj.page;
        let naturalPatrimonyMapping = natural_patrimony.data[obj.mapping];

        if(currentPage < naturalPatrimonyMapping.objects.max_pages) {
            obj.page += 1;

            dispatch(GeneralObjectsActions.getDataByPageNaturalPatrimony(this.currentName,
                obj.mapping, obj.page));
        }
    }


    renderUpperSection() {
        return (
            <section id="patrimonio_natural_data">
                <div className="g-pt-40">
                    <div className="text-center g-mb-30">
                        <div className="g-mb-30">
                            <h2><span className="g-color-default">Património Natural</span></h2>
                        </div>
                        <p className="g-page-title">Nam sed erat aliquet libero aliquet commodo.
                            Donec euismod augue non quam finibus, nec iaculis tellus gravida. Integer <br /> efficitur eros ut dui laoreet, ut blandit turpis tincidunt.</p>
                    </div>


                    <div className="search_on_list g-mb-30 text-center font-main">
                        <input type="text" placeholder="Pesquisar no património natural&#8230;" />
                    </div>

                    <div className="tab-v7">
                        <ul className="tab-v7-nav" role="tablist">
                            <li role="presentation"
                                className={isActiveTab(Constants.NATURAL_PATRIMONY.BROOKS) ? "active" : ""}>
                                <Link to={"#first_tab"}
                                      onClick={() =>
                                          this.updateCurrentName(Constants.NATURAL_PATRIMONY.BROOKS)}
                                      role="tab" data-toggle="tab">{Constants.NATURAL_PATRIMONY_TEXT.BROOKS}</Link>
                            </li>
                            <li role="presentation"
                                className={isActiveTab(Constants.NATURAL_PATRIMONY.RIVERS) ? "active" : ""}>
                                <Link to={"#first_tab"}
                                      onClick={() =>
                                          this.updateCurrentName(Constants.NATURAL_PATRIMONY.RIVERS)}
                                      role="tab" data-toggle="tab">{Constants.NATURAL_PATRIMONY_TEXT.RIVERS}</Link>
                            </li>
                            <li role="presentation"
                                className={isActiveTab(Constants.NATURAL_PATRIMONY.MOUNTAINS) ? "active" : ""}>
                                <Link to={"#first_tab"}
                                      onClick={() =>
                                          this.updateCurrentName(Constants.NATURAL_PATRIMONY.MOUNTAINS)}
                                      role="tab" data-toggle="tab">{Constants.NATURAL_PATRIMONY_TEXT.MOUNTAINS}</Link>
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
                    <HeaderLinks />

                    <Footer />
                </main>
            </div>
        );
    }
}



const mapStateToProps = (state) => ({
    natural_patrimony: state.natural_patrimony
});

export default connect(mapStateToProps)(NaturalPatrimonyView);