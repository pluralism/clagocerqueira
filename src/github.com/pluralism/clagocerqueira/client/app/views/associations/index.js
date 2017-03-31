import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Footer from '../../components/common/footer';
import { GeneralObjectTab } from '../../components/common/generalObjectTab';
import classNames from 'classnames';
import Constants from '../../constants/index';
import GeneralObjectsActions from '../../actions/generalObjects';


class AssociationsView extends React.Component {
  constructor(props) {
    super(props);


    this.currentName = Constants.ASSOCIATIONS.CULTURAL;
    this.nameAndPageMappings = {
      [Constants.ASSOCIATIONS.CIVIC]: {
        mapping: Constants.ASSOCIATIONS.CIVIC,
        page: 1
      },
      [Constants.ASSOCIATIONS.CULTURAL]: {
        mapping: Constants.ASSOCIATIONS.CULTURAL,
        page: 1
      },
      [Constants.ASSOCIATIONS.RECREATIONAL]: {
        mapping: Constants.ASSOCIATIONS.RECREATIONAL,
        page: 1
      },
      [Constants.ASSOCIATIONS.RELIGIOUS]: {
        mapping: Constants.ASSOCIATIONS.RELIGIOUS,
        page: 1
      },
      [Constants.ASSOCIATIONS.SOCIAL]: {
        mapping: Constants.ASSOCIATIONS.SOCIAL,
        page: 1
      },
      [Constants.ASSOCIATIONS.SPORTS]: {
        mapping: Constants.ASSOCIATIONS.SPORTS,
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
      [Constants.ASSOCIATIONS.CIVIC, Constants.ASSOCIATIONS.CIVIC],
      [Constants.ASSOCIATIONS.CULTURAL, Constants.ASSOCIATIONS.CULTURAL],
      [Constants.ASSOCIATIONS.RECREATIONAL, Constants.ASSOCIATIONS.RECREATIONAL],
      [Constants.ASSOCIATIONS.RELIGIOUS, Constants.ASSOCIATIONS.RELIGIOUS],
      [Constants.ASSOCIATIONS.SOCIAL, Constants.ASSOCIATIONS.SOCIAL],
      [Constants.ASSOCIATIONS.SPORTS, Constants.ASSOCIATIONS.SPORTS]];


    /**
      * This function is invoked immediately after a component is mounted.
      * This is a good place to load data from a remote endpoint and to perform
      * network requests.
      *
      * On this function we try to extract the councilmen from all possible dates
      * on this page the component is always called with the first page
    */
    dispatch(GeneralObjectsActions.getAllDataFromAssociations(mappings));
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
     * with the lists of associations
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
              <h2><span className="g-color-default">Associações</span></h2>
            </div>
            <p className="g-page-title">Nam sed erat aliquet libero aliquet commodo.
              Donec euismod augue non quam finibus, nec iaculis tellus gravida. Integer <br /> efficitur eros ut dui laoreet, ut blandit turpis tincidunt.</p>
          </div>


          <div className="search_on_list g-mb-30 text-center font-main">
            <input type="text" placeholder="Pesquisar associações&#8230;" />
          </div>


          <div className="tab-v7">
            <ul className="tab-v7-nav" role="tablist">
              <li role="presentation" className="active">
                <Link to={"#first_tab"}
                  onClick={() => this.updateCurrentName(Constants.ASSOCIATIONS.CULTURAL, 1)}
                  role="tab" data-toggle="tab">{Constants.ASSOCIATIONS_TEXT.CULTURAL}</Link>
              </li>
              <li role="presentation">
                <Link to={"#second_tab"}
                  onClick={() => this.updateCurrentName(Constants.ASSOCIATIONS.CIVIC, 2)}
                  role="tab" data-toggle="tab">{Constants.ASSOCIATIONS_TEXT.CIVIC}</Link>
              </li>
              <li role="presentation">
                <Link to={"#third_tab"}
                  onClick={() => this.updateCurrentName(Constants.ASSOCIATIONS.SPORTS, 3)}
                  role="tab" data-toggle="tab">{Constants.ASSOCIATIONS_TEXT.SPORTS}</Link>
              </li>
              <li role="presentation">
                <Link to={"#fourth_tab"}
                  onClick={() => this.updateCurrentName(Constants.ASSOCIATIONS.RELIGIOUS, 4)}
                  role="tab" data-toggle="tab">{Constants.ASSOCIATIONS_TEXT.RELIGIOUS}</Link>
              </li>
              <li role="presentation">
                <Link to={"#fifth_tab"}
                  onClick={() => this.updateCurrentName(Constants.ASSOCIATIONS.SOCIAL, 5)}
                  role="tab" data-toggle="tab">{Constants.ASSOCIATIONS_TEXT.SOCIAL}</Link>
              </li>
              <li role="presentation">
                <Link to={"#sixth_tab"}
                  onClick={() => this.updateCurrentName(Constants.ASSOCIATIONS.RECREATIONAL, 6)}
                  role="tab" data-toggle="tab">{Constants.ASSOCIATIONS_TEXT.RECREATIONAL}</Link>
              </li>
            </ul>


            {this.renderTabsContents()}
          </div>
        </div>
      </section>
    );
  }


  getPreviousPageContent() {
    const { dispatch } = this.props;
    let obj = this.nameAndPageMappings[this.currentName];
    let currentPage = obj.page;

    if(currentPage > 1) {
      obj.page -= 1;

      dispatch(GeneralObjectsActions.getDataByPageAssociations(this.currentName,
        obj.mapping, obj.page));
    }
  }


  getNextPageContent() {
    const { associations, dispatch } = this.props;
    let obj = this.nameAndPageMappings[this.currentName];
    let currentPage = obj.page;
    let associationsMapping = associations.data[obj.mapping];

    if(currentPage < associationsMapping.objects.max_pages) {
      obj.page += 1;

      dispatch(GeneralObjectsActions.getDataByPageAssociations(this.currentName,
        obj.mapping, obj.page));
    }
  }


  renderTabsContents() {
    const { associations } = this.props;


    return (
      <div className="tab-content">
        <GeneralObjectTab
          tabID={'#first_tab'}
          subtitle={"Associações"}
          active={this.state.activeTab == 1}
          data={associations.data[Constants.ASSOCIATIONS.CULTURAL].objects.objects_data} />

        <GeneralObjectTab
          tabID={'#second_tab'}
          subtitle={"Associações"}
          active={this.state.activeTab == 2}
          data={associations.data[Constants.ASSOCIATIONS.CIVIC].objects.objects_data} />

        <GeneralObjectTab
          tabID={'#third_tab'}
          subtitle={"Associações"}
          active={this.state.activeTab == 3}
          data={associations.data[Constants.ASSOCIATIONS.SPORTS].objects.objects_data} />

        <GeneralObjectTab
          tabID={'#fourth_tab'}
          subtitle={"Associações"}
          active={this.state.activeTab == 4}
          data={associations.data[Constants.ASSOCIATIONS.RELIGIOUS].objects.objects_data} />

        <GeneralObjectTab
          tabID={'#fifth_tab'}
          subtitle={"Associações"}
          active={this.state.activeTab == 5}
          data={associations.data[Constants.ASSOCIATIONS.SOCIAL].objects.objects_data} />

        <GeneralObjectTab
          tabID={'#fifth_tab'}
          subtitle={"Associações"}
          active={this.state.activeTab == 6}
          data={associations.data[Constants.ASSOCIATIONS.RECREATIONAL].objects.objects_data} />


        <div className="control-buttons">
          <div className="prev-button" onClick={() => this.getPreviousPageContent()}></div>
          <div className="next-button" onClick={() => this.getNextPageContent()}></div>
        </div>
      </div>
    );
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
  associations: state.associations
});


export default connect(mapStateToProps)(AssociationsView);
