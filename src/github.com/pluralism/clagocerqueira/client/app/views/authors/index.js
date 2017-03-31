import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Footer from '../../components/common/footer';
import { GeneralObjectTab } from '../../components/common/generalObjectTab';
import classNames from 'classnames';
import Constants from '../../constants/index';
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
      activeTab: 1,
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
    if(e.keyCode == 37 && this.state.canSwitchPage) {
      // Left arrow was pressed
      this.getPreviousPageContent();
      // Prevent the user from pressing the button too fast (wait 0.5s)
      this.canUseSwitchPage();
    } else if(e.keyCode == 39 && this.state.canSwitchPage) {
      // Right arrow was pressed
      this.getNextPageContent();
      // Prevent the user from pressing the button too fast (wait 0.5s)
      this.canUseSwitchPage();
    }
  }


  componentDidMount() {
    const { dispatch } = this.props;



    const mappings = [
      [Constants.MAPPINGS.d1400_1500, Constants.DATES.d1400_1500],
      [Constants.MAPPINGS.d1501_1600, Constants.DATES.d1501_1600],
      [Constants.MAPPINGS.d1601_1700, Constants.DATES.d1601_1700],
      [Constants.MAPPINGS.d1701_1800, Constants.DATES.d1701_1800],
      [Constants.MAPPINGS.d1801_1900, Constants.DATES.d1801_1900],
      [Constants.MAPPINGS.d1901_2000, Constants.DATES.d1901_2000]];


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


  renderHeader() {
    return (
      <nav className="clc-header one-page-header navbar navbar-default navbar-fixed-top navbar-toggleable-sm" data-role="navigation">
        <div className="navbar-header">
          <div className="menu-container page-scroll">
            <button type="button" className="navbar-toggle" data-toggle="collapse"
              data-target=".clc-collapse">
              <span className="sr-only">Toggle Navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
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


  updateCurrentDate(value, activeTab) {
    const { dispatch } = this.props;

    /**
     * Update the currentDate variable and keep the page
     * as the old one. This allow us to mantain consistency
     * with the lists of authors
    */
    this.currentDate = value;

    // Update the active tab!
    this.setState({
      activeTab: activeTab
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
              <li role="presentation" className="active">
                <Link to={"#first_tab"}
                  onClick={() => this.updateCurrentDate(Constants.DATES.d1400_1500, 1)}
                  role="tab" data-toggle="tab">{Constants.DATES.d1400_1500}</Link>
              </li>
              <li role="presentation">
                <Link to={"#second_tab"}
                  onClick={() => this.updateCurrentDate(Constants.DATES.d1501_1600, 2)}
                  role="tab" data-toggle="tab">{Constants.DATES.d1501_1600}</Link>
              </li>
              <li role="presentation">
                <Link to={"#third_tab"}
                  onClick={() => this.updateCurrentDate(Constants.DATES.d1601_1700, 3)}
                  role="tab" data-toggle="tab">{Constants.DATES.d1601_1700}</Link>
              </li>
              <li role="presentation">
                <Link to={"#fourth_tab"}
                  onClick={() => this.updateCurrentDate(Constants.DATES.d1701_1800, 4)}
                  role="tab" data-toggle="tab">{Constants.DATES.d1701_1800}</Link>
              </li>
              <li role="presentation">
                <Link to={"#fifth_tab"}
                  onClick={() => this.updateCurrentDate(Constants.DATES.d1801_1900, 5)}
                  role="tab" data-toggle="tab">{Constants.DATES.d1801_1900}</Link>
              </li>
              <li role="presentation">
                <Link to={"#sixth_tab"}
                  onClick={() => this.updateCurrentDate(Constants.DATES.d1901_2000, 6)}
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
          active={this.state.activeTab == 1}
          dateMapping={Constants.MAPPINGS.d1400_1500}
          data={authors.data[Constants.MAPPINGS.d1400_1500].objects.objects_data} />

        <GeneralObjectTab
          tabID={'#second_tab'}
          subtitle={"Autores"}
          active={this.state.activeTab == 2}
          dateMapping={Constants.MAPPINGS.d1501_1600}
          data={authors.data[Constants.MAPPINGS.d1501_1600].objects.objects_data} />

        <GeneralObjectTab
          tabID={'#third_tab'}
          subtitle={"Autores"}
          active={this.state.activeTab == 3}
          dateMapping={Constants.MAPPINGS.d1601_1700}
          data={authors.data[Constants.MAPPINGS.d1601_1700].objects.objects_data} />

        <GeneralObjectTab
          tabID={'#fourth_tab'}
          subtitle={"Autores"}
          active={this.state.activeTab == 4}
          dateMapping={Constants.MAPPINGS.d1701_1800}
          data={authors.data[Constants.MAPPINGS.d1701_1800].objects.objects_data} />

        <GeneralObjectTab
          tabID={'#fifth_tab'}
          subtitle={"Autores"}
          active={this.state.activeTab == 5}
          dateMapping={Constants.MAPPINGS.d1801_1900}
          data={authors.data[Constants.MAPPINGS.d1801_1900].objects.objects_data} />

        <GeneralObjectTab
          tabID={'#fifth_tab'}
          subtitle={"Autores"}
          active={this.state.activeTab == 6}
          dateMapping={Constants.MAPPINGS.d1901_2000}
          data={authors.data[Constants.MAPPINGS.d1901_2000].objects.objects_data} />


        <div className="control-buttons">
          <div className="prev-button" onClick={() => this.getPreviousPageContent()}></div>
          <div className="next-button" onClick={() => this.getNextPageContent()}></div>
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
          {this.renderHeader()}
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
