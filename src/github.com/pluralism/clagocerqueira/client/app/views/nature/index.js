import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { isActiveTab } from '../../utils/index';
import { GeneralObjectTab } from '../../components/common/generalObjectTab';
import HeaderLinks from '../../components/common/headerLinks';
import Footer from '../../components/common/footer';
import { Constants } from '../../constants/index';
import GeneralObjectsActions from '../../actions/generalObjects';




class NatureView extends React.Component {
    constructor(props) {
        super(props);

        this.currentName = Constants.NATURE.BROOKS;
        this.nameAndPageMappings = {
            [Constants.NATURE.BROOKS]: {
                mapping: Constants.NATURE.BROOKS,
                page: 1
            },
            [Constants.NATURE.RIVERS]: {
                mapping: Constants.NATURE.RIVERS,
                page: 1
            },
            [Constants.NATURE.MOUNTAINS]: {
                mapping: Constants.NATURE.MOUNTAINS,
                page: 1
            },
        };

        this.state = {
            activeTab: Constants.NATURE.BROOKS,
            canSwitchPage: true,
        };


        document.addEventListener("keydown", (event) => this.handleKeyDownEvent(event));
    }


    componentDidMount() {
        const mappings = [
            [Constants.NATURE.BROOKS, Constants.NATURE.BROOKS],
            [Constants.NATURE.RIVERS, Constants.NATURE.RIVERS],
            [Constants.NATURE.MOUNTAINS, Constants.NATURE.MOUNTAINS]
        ];


        const { dispatch, params } = this.props;


        if(params.type !== undefined) {
            if(params.type === Constants.NATURE.BROOKS ||
                params.type === Constants.NATURE.RIVERS ||
                params.type === Constants.NATURE.MOUNTAINS) {
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
        dispatch(GeneralObjectsActions.getAllDatafromNature(mappings));
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


    updateCurrentName(value) {
        this.currentName = value;


        this.setState({
            activeTab: this.currentName
        });
    }


    renderTabsContents() {
        const { nature } = this.props;


        return (
            <div className="tab-content">
                <GeneralObjectTab
                    tabID={'#first_tab'}
                    subtitle={"Natureza"}
                    active={this.state.activeTab === Constants.NATURE.BROOKS}
                    data={nature.data[Constants.NATURE.BROOKS].objects.objects_data} />

                <GeneralObjectTab
                    tabID={'#second_tab'}
                    subtitle={"Natureza"}
                    active={this.state.activeTab === Constants.NATURE.RIVERS}
                    data={nature.data[Constants.NATURE.RIVERS].objects.objects_data} />

                <GeneralObjectTab
                    tabID={'#third_tab'}
                    subtitle={"Natureza"}
                    active={this.state.activeTab === Constants.NATURE.MOUNTAINS}
                    data={nature.data[Constants.NATURE.MOUNTAINS].objects.objects_data} />



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

            dispatch(GeneralObjectsActions.getDataByPageNature(this.currentName,
                obj.mapping, obj.page));
        }
    }


    getNextPageContent() {
        const { nature, dispatch } = this.props;
        let obj = this.nameAndPageMappings[this.currentName];
        let currentPage = obj.page;
        let natureMapping = nature.data[obj.mapping];

        if(currentPage < natureMapping.objects.max_pages) {
            obj.page += 1;

            dispatch(GeneralObjectsActions.getDataByPageNature(this.currentName,
                obj.mapping, obj.page));
        }
    }


    renderUpperSection() {
        return (
            <section id="natureza_data">
                <div className="g-pt-40">
                    <div className="text-center g-mb-30">
                        <div className="g-mb-30">
                            <h2><span className="g-color-default">Natureza</span></h2>
                        </div>
                        <p className="g-page-title">Nam sed erat aliquet libero aliquet commodo.
                            Donec euismod augue non quam finibus, nec iaculis tellus gravida. Integer <br /> efficitur eros ut dui laoreet, ut blandit turpis tincidunt.</p>
                    </div>


                    <div className="search_on_list g-mb-30 text-center font-main">
                        <input type="text" placeholder="Pesquisar na natureza&#8230;" />
                    </div>

                    <div className="tab-v7">
                        <ul className="tab-v7-nav" role="tablist">
                            <li role="presentation"
                                className={isActiveTab(Constants.NATURE.BROOKS, this.state) ? "active" : ""}>
                                <Link to={"#first_tab"}
                                      onClick={() =>
                                          this.updateCurrentName(Constants.NATURE.BROOKS)}
                                      role="tab" data-toggle="tab">{Constants.NATURE_TEXT.BROOKS}</Link>
                            </li>

                            <li role="presentation"
                                className={isActiveTab(Constants.NATURE.RIVERS, this.state) ? "active" : ""}>
                                <Link to={"#first_tab"}
                                      onClick={() =>
                                          this.updateCurrentName(Constants.NATURE.RIVERS)}
                                      role="tab" data-toggle="tab">{Constants.NATURE_TEXT.RIVERS}</Link>
                            </li>

                            <li role="presentation"
                                className={isActiveTab(Constants.NATURE.MOUNTAINS, this.state) ? "active" : ""}>
                                <Link to={"#first_tab"}
                                      onClick={() =>
                                          this.updateCurrentName(Constants.NATURE.MOUNTAINS)}
                                      role="tab" data-toggle="tab">{Constants.NATURE_TEXT.MOUNTAINS}</Link>
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
            <main>
                <HeaderLinks />
                {this.renderUpperSection()}
                <Footer />
            </main>
        );
    }
}



const mapStateToProps = (state) => ({
    nature: state.nature
});

export default connect(mapStateToProps)(NatureView);