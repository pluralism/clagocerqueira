import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Footer from '../../components/common/footer';
import { GeneralObjectTab } from '../../components/common/generalObjectTab';
import Constants from '../../constants/index';
import GeneralObjectsActions from '../../actions/generalObjects';


class PressView extends React.Component {
  constructor(props) {
    super(props);


    this.currentName = Constants.PRESS.MAGAZINES;
    this.nameAndPageMappings = {
      [Constants.PRESS.JOURNALS]: {
        mapping: Constants.PRESS.JOURNALS,
        page: 1
      },
      [Constants.PRESS.MAGAZINES]: {
        mapping: Constants.PRESS.MAGAZINES,
        page: 1
      },
      [Constants.PRESS.ONLINE_JOURNALS]: {
        mapping: Constants.PRESS.ONLINE_JOURNALS,
        page: 1
      },
      [Constants.PRESS.ONLINE_RADIOS]: {
        mapping: Constants.PRESS.ONLINE_RADIOS,
        page: 1
      },
      [Constants.PRESS.RADIOS]: {
        mapping: Constants.PRESS.RADIOS,
        page: 1
      },
      [Constants.PRESS.TELEVISIONS]: {
        mapping: Constants.PRESS.TELEVISIONS,
        page: 1
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
      [Constants.PRESS.JOURNALS, Constants.PRESS.JOURNALS],
      [Constants.PRESS.MAGAZINES, Constants.PRESS.MAGAZINES],
      [Constants.PRESS.ONLINE_JOURNALS, Constants.PRESS.ONLINE_JOURNALS],
      [Constants.PRESS.ONLINE_RADIOS, Constants.PRESS.ONLINE_RADIOS],
      [Constants.PRESS.RADIOS, Constants.PRESS.RADIOS],
      [Constants.PRESS.TELEVISIONS, Constants.PRESS.TELEVISIONS]];


    /**
      * This function is invoked immediately after a component is mounted.
      * This is a good place to load data from a remote endpoint and to perform
      * network requests.
      *
      * On this function we try to extract the press from all possible types
      * on this page the component is always called with the first page
    */
    dispatch(GeneralObjectsActions.getAllDataFromPress(mappings));
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


  updateCurrentName(value, activeTab) {
    const { dispatch } = this.props;

    /**
     * Update the currentName variable and keep the page
     * as the old one. This allow us to mantain consistency
     * with the lists of press data
    */
    this.currentName = value;

    // Update the active tab!
    this.setState({
      activeTab: activeTab
    });
  }


  renderUpperSection() {
    return (
      <section id="associacoes_data">
        <div className="g-pt-40">
          <div className="text-center g-mb-30">
            <div className="g-mb-30">
              <h2><span className="g-color-default">Imprensa</span></h2>
            </div>
            <p className="g-page-title">Nam sed erat aliquet libero aliquet commodo.
              Donec euismod augue non quam finibus, nec iaculis tellus gravida. Integer <br /> efficitur eros ut dui laoreet, ut blandit turpis tincidunt.</p>
          </div>


          <div className="search_on_list g-mb-30 text-center font-main">
            <input type="text" placeholder="Pesquisar na imprensa&#8230;" />
          </div>


          <div className="tab-v7">
            <ul className="tab-v7-nav" role="tablist">
              <li role="presentation" className="active">
                <Link to={"#first_tab"}
                  onClick={() => this.updateCurrentName(Constants.PRESS.MAGAZINES, 1)}
                  role="tab" data-toggle="tab">{Constants.PRESS_TEXT.MAGAZINES}</Link>
              </li>
              <li role="presentation">
                <Link to={"#second_tab"}
                  onClick={() => this.updateCurrentName(Constants.PRESS.JOURNALS, 2)}
                  role="tab" data-toggle="tab">{Constants.PRESS_TEXT.JOURNALS}</Link>
              </li>
              <li role="presentation">
                <Link to={"#third_tab"}
                  onClick={() => this.updateCurrentName(Constants.PRESS.ONLINE_JOURNALS, 3)}
                  role="tab" data-toggle="tab">{Constants.PRESS_TEXT.ONLINE_JOURNALS}</Link>
              </li>
              <li role="presentation">
                <Link to={"#fourth_tab"}
                  onClick={() => this.updateCurrentName(Constants.PRESS.RADIOS, 4)}
                  role="tab" data-toggle="tab">{Constants.PRESS_TEXT.RADIOS}</Link>
              </li>
              <li role="presentation">
                <Link to={"#fifth_tab"}
                  onClick={() => this.updateCurrentName(Constants.PRESS.ONLINE_RADIOS, 5)}
                  role="tab" data-toggle="tab">{Constants.PRESS_TEXT.ONLINE_RADIOS}</Link>
              </li>
              <li role="presentation">
                <Link to={"#sixth_tab"}
                  onClick={() => this.updateCurrentName(Constants.PRESS.TELEVISIONS, 6)}
                  role="tab" data-toggle="tab">{Constants.PRESS_TEXT.TELEVISIONS}</Link>
              </li>
            </ul>


            {this.renderTabsContents()}
          </div>
        </div>
      </section>
    );
  }


  renderTabsContents() {
    const { press } = this.props;


    return (
      <div className="tab-content">
        <GeneralObjectTab
          tabID={'#first_tab'}
          subtitle={"Imprensa"}
          active={this.state.activeTab == 1}
          data={press.data[Constants.PRESS.MAGAZINES].objects.objects_data} />

        <GeneralObjectTab
          tabID={'#second_tab'}
          subtitle={"Imprensa"}
          active={this.state.activeTab == 2}
          data={press.data[Constants.PRESS.JOURNALS].objects.objects_data} />

        <GeneralObjectTab
          tabID={'#third_tab'}
          subtitle={"Imprensa"}
          active={this.state.activeTab == 3}
          data={press.data[Constants.PRESS.ONLINE_JOURNALS].objects.objects_data} />

        <GeneralObjectTab
          tabID={'#fourth_tab'}
          subtitle={"Imprensa"}
          active={this.state.activeTab == 4}
          data={press.data[Constants.PRESS.RADIOS].objects.objects_data} />

        <GeneralObjectTab
          tabID={'#fifth_tab'}
          subtitle={"Imprensa"}
          active={this.state.activeTab == 5}
          data={press.data[Constants.PRESS.ONLINE_RADIOS].objects.objects_data} />

        <GeneralObjectTab
          tabID={'#fifth_tab'}
          subtitle={"Imprensa"}
          active={this.state.activeTab == 6}
          data={press.data[Constants.PRESS.TELEVISIONS].objects.objects_data} />


        <div className="control-buttons">
          <div className="prev-button" onClick={() => this.getPreviousPageContent()}></div>
          <div className="next-button" onClick={() => this.getNextPageContent()}></div>
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

      dispatch(GeneralObjectsActions.getDataByPagePress(this.currentName,
        obj.mapping, obj.page));
    }
  }


  getNextPageContent() {
    const { press, dispatch } = this.props;
    let obj = this.nameAndPageMappings[this.currentName];
    let currentPage = obj.page;
    let pressMapping = press.data[obj.mapping];

    if(currentPage < pressMapping.objects.max_pages) {
      obj.page += 1;

      dispatch(GeneralObjectsActions.getDataByPagePress(this.currentName,
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
  press: state.press
});


export default connect(mapStateToProps)(PressView);
