import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import HeaderLinks from '../../components/common/headerLinks';
import Footer from '../../components/common/footer';
import { GeneralObjectTab } from '../../components/common/generalObjectTab';
import { Constants } from '../../constants/index';
import { isActiveTab } from '../../utils/index';
import GeneralObjectsActions from '../../actions/generalObjects';



class AuthorsView extends React.Component {
  constructor(props) {
    super(props);

    this.currentDate = Constants.DATES.d1400_1500;
    this.dateAndPageMappings = {
      [Constants.DATES.d1400_1500]: {
        mapping: 'data1400_1500',
        page: 1,
      },
      [Constants.DATES.d1501_1600]: {
        mapping: 'data1501_1600',
        page: 1,
      },
      [Constants.DATES.d1601_1700]: {
        mapping: 'data1601_1700',
        page: 1,
      },
      [Constants.DATES.d1701_1800]: {
        mapping: 'data1701_1800',
        page: 1,
      },
      [Constants.DATES.d1801_1900]: {
        mapping: 'data1801_1900',
        page: 1,
      },
      [Constants.DATES.d1901_2000]: {
        mapping: 'data1901_2000',
        page: 1,
      },
    };


    this.state = {
      activeTab: Constants.DATES.d1400_1500,
      canSwitchPage: true,
    };


    document.addEventListener("keydown", (event) => this.handleKeyDownEvent(event));
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
      [Constants.DATE_MAPPINGS.d1400_1500, Constants.DATES.d1400_1500],
      [Constants.DATE_MAPPINGS.d1501_1600, Constants.DATES.d1501_1600],
      [Constants.DATE_MAPPINGS.d1601_1700, Constants.DATES.d1601_1700],
      [Constants.DATE_MAPPINGS.d1701_1800, Constants.DATES.d1701_1800],
      [Constants.DATE_MAPPINGS.d1801_1900, Constants.DATES.d1801_1900],
      [Constants.DATE_MAPPINGS.d1901_2000, Constants.DATES.d1901_2000]];


    if(params.type !== undefined) {
      if(params.type === Constants.DATES.d1400_1500 ||
          params.type === Constants.DATES.d1501_1600 ||
          params.type === Constants.DATES.d1601_1700 ||
          params.type === Constants.DATES.d1701_1800 ||
          params.type === Constants.DATES.d1801_1900 ||
          params.type === Constants.DATES.d1901_2000) {
        this.updateCurrentDate(params.type);
      }
    }


    /**
     * This function is invoked immediately after a component is mounted.
     * This is a good place to load data from a remote endpoint and to perform
     * network requests.
     *
     * On this function we try to extract the authors from all possible dates
     * on this page the component is always called with the first page
    */
    dispatch(GeneralObjectsActions.getAllDataFromAuthors(mappings));
  }



  updateCurrentDate(value) {
    /**
     * Update the currentDate variable and keep the page
     * as the old one. This allow us to mantain consistency
     * with the lists of authors
    */
    this.currentDate = value;

    // Update the active tab!
    this.setState({
      activeTab: this.currentDate
    });
  }



  renderUpperSection() {
    return (
      <section id="autores_data">
        <div className="g-pt-40">
          <div className="text-center g-mb-30">
            <div className="g-mb-30">
              <h2><span className="g-color-default">Autores Amarantinos</span></h2>
            </div>
            <p className="g-page-title">Nam sed erat aliquet libero aliquet commodo.
              Donec euismod augue non quam finibus, nec iaculis tellus gravida. Integer <br /> efficitur eros ut dui laoreet, ut blandit turpis tincidunt.</p>
          </div>


          <div className="search_on_list g-mb-30 text-center font-main">
            <input type="text" placeholder="Pesquisar autores&#8230;" />
          </div>


          <div className="tab-v7">
            <ul className="tab-v7-nav" role="tablist">
              <li role="presentation"
                  className={isActiveTab(Constants.DATES.d1400_1500, this.state)}>
                <Link to={"#first_tab"}
                  onClick={() => this.updateCurrentDate(Constants.DATES.d1400_1500)}
                  role="tab" data-toggle="tab">{Constants.DATES.d1400_1500}</Link>
              </li>
              <li role="presentation"
                  className={isActiveTab(Constants.DATES.d1501_1600, this.state)}>
                <Link to={"#second_tab"}
                  onClick={() => this.updateCurrentDate(Constants.DATES.d1501_1600)}
                  role="tab" data-toggle="tab">{Constants.DATES.d1501_1600}</Link>
              </li>
              <li role="presentation"
                  className={isActiveTab(Constants.DATES.d1601_1700, this.state)}>
                <Link to={"#third_tab"}
                  onClick={() => this.updateCurrentDate(Constants.DATES.d1601_1700)}
                  role="tab" data-toggle="tab">{Constants.DATES.d1601_1700}</Link>
              </li>
              <li role="presentation"
                  className={isActiveTab(Constants.DATES.d1701_1800, this.state)}>
                <Link to={"#fourth_tab"}
                  onClick={() => this.updateCurrentDate(Constants.DATES.d1701_1800)}
                  role="tab" data-toggle="tab">{Constants.DATES.d1701_1800}</Link>
              </li>
              <li role="presentation"
                  className={isActiveTab(Constants.DATES.d1801_1900, this.state)}>
                <Link to={"#fifth_tab"}
                  onClick={() => this.updateCurrentDate(Constants.DATES.d1801_1900)}
                  role="tab" data-toggle="tab">{Constants.DATES.d1801_1900}</Link>
              </li>
              <li role="presentation"
                  className={isActiveTab(Constants.DATES.d1901_2000, this.state)}>
                <Link to={"#sixth_tab"}
                  onClick={() => this.updateCurrentDate(Constants.DATES.d1901_2000)}
                  role="tab" data-toggle="tab">{Constants.DATES.d1901_2000}</Link>
              </li>
            </ul>


            {this.renderTabsContents()}
          </div>
        </div>
      </section>
    );
  }


  renderTabsContents() {
    const { authors } = this.props;

    return (
      <div className="tab-content">
        <GeneralObjectTab
          tabID={'#first_tab'}
          subtitle={"Autores"}
          active={this.state.activeTab === Constants.DATES.d1400_1500}
          dateMapping={Constants.DATE_MAPPINGS.d1400_1500}
          data={authors.data[Constants.DATE_MAPPINGS.d1400_1500].objects.objects_data} />

        <GeneralObjectTab
          tabID={'#second_tab'}
          subtitle={"Autores"}
          active={this.state.activeTab === Constants.DATES.d1501_1600}
          dateMapping={Constants.DATE_MAPPINGS.d1501_1600}
          data={authors.data[Constants.DATE_MAPPINGS.d1501_1600].objects.objects_data} />

        <GeneralObjectTab
          tabID={'#third_tab'}
          subtitle={"Autores"}
          active={this.state.activeTab === Constants.DATES.d1601_1700}
          dateMapping={Constants.DATE_MAPPINGS.d1601_1700}
          data={authors.data[Constants.DATE_MAPPINGS.d1601_1700].objects.objects_data} />

        <GeneralObjectTab
          tabID={'#fourth_tab'}
          subtitle={"Autores"}
          active={this.state.activeTab === Constants.DATES.d1701_1800}
          dateMapping={Constants.DATE_MAPPINGS.d1701_1800}
          data={authors.data[Constants.DATE_MAPPINGS.d1701_1800].objects.objects_data} />

        <GeneralObjectTab
          tabID={'#fifth_tab'}
          subtitle={"Autores"}
          active={this.state.activeTab === Constants.DATES.d1801_1900}
          dateMapping={Constants.DATE_MAPPINGS.d1801_1900}
          data={authors.data[Constants.DATE_MAPPINGS.d1801_1900].objects.objects_data} />

        <GeneralObjectTab
          tabID={'#fifth_tab'}
          subtitle={"Autores"}
          active={this.state.activeTab === Constants.DATES.d1901_2000}
          dateMapping={Constants.DATE_MAPPINGS.d1901_2000}
          data={authors.data[Constants.DATE_MAPPINGS.d1901_2000].objects.objects_data} />


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

      dispatch(GeneralObjectsActions.getDataByPageAuthors(this.currentDate,
        obj.mapping, obj.page));
    }
  }


  getNextPageContent() {
    const { authors, dispatch } = this.props;
    let obj = this.dateAndPageMappings[this.currentDate];
    let currentPage = obj.page;
    let authorsMapping = authors.data[obj.mapping];

    if(currentPage < authorsMapping.objects.max_pages) {
      obj.page += 1;

      dispatch(GeneralObjectsActions.getDataByPageAuthors(this.currentDate,
        obj.mapping, obj.page));
    }
  }


  render() {
    return (
      <div>
        <main className="container-fluid">
          <HeaderLinks />
          {this.renderUpperSection()}
          <Footer />
        </main>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  authors: state.authors
});


export default connect(mapStateToProps)(AuthorsView);
