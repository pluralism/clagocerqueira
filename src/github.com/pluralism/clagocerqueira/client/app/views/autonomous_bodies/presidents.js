import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import HeaderLinks from '../../components/common/headerLinks';
import Footer from '../../components/common/footer';
import { GeneralObjectTab } from '../../components/common/generalObjectTab';
import { Constants } from '../../constants/index';
import { isActiveTab } from '../../utils/index';
import GeneralObjectsActions from '../../actions/generalObjects';


class PresidentsView extends React.Component {
  constructor(props) {
    super(props);


    this.currentDate = Constants.DATES.d1836_1910;
    this.dateAndPageMappings = {
      [Constants.DATES.d1836_1910]: {
        mapping: 'data1836_1910',
        page: 1,
      },
      [Constants.DATES.d1910_1926]: {
        mapping: 'data1910_1926',
        page: 1,
      },
      [Constants.DATES.d1926_1974]: {
        mapping: 'data1926_1974',
        page: 1,
      },
      [Constants.DATES.d1974_1976]: {
        mapping: 'data1974_1976',
        page: 1,
      },
      [Constants.DATES.d1976_2013]: {
        mapping: 'data1976_2013',
        page: 1,
      },
    };


    this.state = {
      activeTab: Constants.DATES.d1836_1910,
      canSwitchPage: true,
    };


    document.addEventListener("keydown", ::this.handleKeyDownEvent);
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


  componentDidMount() {
    const { dispatch, params } = this.props;

    const mappings = [
      [Constants.DATE_MAPPINGS.d1836_1910, Constants.DATES.d1836_1910],
      [Constants.DATE_MAPPINGS.d1910_1926, Constants.DATES.d1910_1926],
      [Constants.DATE_MAPPINGS.d1926_1974, Constants.DATES.d1926_1974],
      [Constants.DATE_MAPPINGS.d1974_1976, Constants.DATES.d1974_1976],
      [Constants.DATE_MAPPINGS.d1976_2013, Constants.DATES.d1976_2013]];


    if(params.type !== undefined) {
      if(params.type === Constants.DATES.d1836_1910 ||
          params.type === Constants.DATES.d1910_1926 ||
          params.type === Constants.DATES.d1926_1974 ||
          params.type === Constants.DATES.d1974_1976 ||
          params.type === Constants.DATES.d1976_2013) {
        this.updateCurrentDate(params.type);
      }
    }

    /**
     * This function is invoked immediately after a component is mounted.
     * This is a good place to load data from a remote endpoint and to perform
     * network requests.
     *
     * On this function we try to extract the presidents from all possible dates
     * on this page the component is always called with the first page
    */
    dispatch(GeneralObjectsActions.getAllDataFromPresidents(mappings));
  }



  updateCurrentDate(value) {
    /**
     * Update the currentDate variable and keep the page
     * as the old one. This allow us to keep consistency
     * with the lists of presidents
    */
    this.currentDate = value;

    // Update the active tab!
    this.setState({
      activeTab: this.currentDate
    });
  }


  renderUpperSection() {
    return (
      <section id="presidentes_data">
        <div className="g-pt-40">
          <div className="text-center g-mb-30">
            <div className="g-mb-30">
              <h2><span className="g-color-default">Presidentes</span></h2>
            </div>
            <p className="g-page-title">
              Tenha acesso aos nomes dos presidentes de Amarante desde o ano <strong>1836</strong>.
            </p>
            <p className="g-page-title">
              Se preferir, pode pesquisar pelo nome do presidente que pretende encontrar.
            </p>
          </div>


          <div className="search_on_list g-mb-30 text-center font-main">
            <form target={"_blank"} action={"/pt/pesquisa"} method={"get"}>
              <input type="text" name="value" placeholder="Pesquisar presidentes&#8230;" autoFocus />
              <input type="hidden" name="type" defaultValue={"president"} />
            </form>
          </div>


          <div className="tab-v7">
            <ul className="tab-v7-nav" role="tablist">
              <li role="presentation"
                  className={isActiveTab(Constants.DATES.d1836_1910, this.state) ? "active" : ""}>
                <Link to={"#first_tab"}
                  onClick={() => this.updateCurrentDate(Constants.DATES.d1836_1910)}
                  role="tab" data-toggle="tab">{Constants.DATES.d1836_1910}</Link>
              </li>
              <li role="presentation"
                  className={isActiveTab(Constants.DATES.d1910_1926, this.state) ? "active" : ""}>
                <Link to={"#second_tab"}
                  onClick={() => this.updateCurrentDate(Constants.DATES.d1910_1926)}
                  role="tab" data-toggle="tab">{Constants.DATES.d1910_1926}</Link>
              </li>
              <li role="presentation"
                  className={isActiveTab(Constants.DATES.d1926_1974, this.state) ? "active" : ""}>
                <Link to={"#third_tab"}
                  onClick={() => this.updateCurrentDate(Constants.DATES.d1926_1974)}
                  role="tab" data-toggle="tab">{Constants.DATES.d1926_1974}</Link>
              </li>
              <li role="presentation"
                  className={isActiveTab(Constants.DATES.d1974_1976, this.state) ? "active" : ""}>
                <Link to={"#fourth_tab"}
                  onClick={() => this.updateCurrentDate(Constants.DATES.d1974_1976)}
                  role="tab" data-toggle="tab">{Constants.DATES.d1974_1976}</Link>
              </li>
              <li role="presentation"
                  className={isActiveTab(Constants.DATES.d1976_2013, this.state) ? "active" : ""}>
                <Link to={"#fifth_tab"}
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
    const { presidents } = this.props;

    return (
      <div className="tab-content">
        <GeneralObjectTab
          tabID={'#first_tab'}
          subtitle={"Presidentes"}
          active={this.state.activeTab === Constants.DATES.d1836_1910}
          data={presidents.data[Constants.DATE_MAPPINGS.d1836_1910].objects.objects_data} />

        <GeneralObjectTab
          tabID={'#second_tab'}
          subtitle={"Presidentes"}
          active={this.state.activeTab === Constants.DATES.d1910_1926}
          data={presidents.data[Constants.DATE_MAPPINGS.d1910_1926].objects.objects_data} />

        <GeneralObjectTab
          tabID={'#third_tab'}
          subtitle={"Presidentes"}
          active={this.state.activeTab === Constants.DATES.d1926_1974}
          data={presidents.data[Constants.DATE_MAPPINGS.d1926_1974].objects.objects_data} />

        <GeneralObjectTab
          tabID={'#fourth_tab'}
          subtitle={"Presidentes"}
          active={this.state.activeTab === Constants.DATES.d1974_1976}
          data={presidents.data[Constants.DATE_MAPPINGS.d1974_1976].objects.objects_data} />

        <GeneralObjectTab
          tabID={'#fifth_tab'}
          subtitle={"Presidentes"}
          active={this.state.activeTab === Constants.DATES.d1976_2013}
          data={presidents.data[Constants.DATE_MAPPINGS.d1976_2013].objects.objects_data} />


        <div className="control-buttons">
          <div className="prev-button" onClick={() => this.getPreviousPageContent()}/>
          <div className="next-button" onClick={() => this.getNextPageContent()}/>
        </div>
      </div>
    );
  }


  getPreviousPageContent() {
    const { dispatch } = this.props;
    let obj = this.dateAndPageMappings[this.currentDate];
    let currentPage = obj.page;

    if(currentPage > 1) {
      obj.page -= 1;

      dispatch(GeneralObjectsActions.getDataByPagePresidents(this.currentDate,
        obj.mapping, obj.page));
    }
  }


  getNextPageContent() {
    const { presidents, dispatch } = this.props;
    let obj = this.dateAndPageMappings[this.currentDate];
    let currentPage = obj.page;
    let presidentMapping = presidents.data[obj.mapping];

    if(currentPage < presidentMapping.objects.max_pages) {
      obj.page += 1;

      dispatch(GeneralObjectsActions.getDataByPagePresidents(this.currentDate,
        obj.mapping, obj.page));
    }
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
  presidents: state.generalObjects
});


export default connect(mapStateToProps)(PresidentsView);
