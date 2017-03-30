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
      [Constants.d1901_2000]: {
        mapping: 'data1901_2000',
        page: 1,
      },
    };


    this.state = {
      activeTab: 1,
      canSwitchPage: true,
    };
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
     * On this function we try to extract the presidents from all possible dates
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


  render() {
    return (
      <div>
        <main className="container-fluid">
          {this.renderHeader()}
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
