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


  render() {
    return (
      <div>
        <p>top</p>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  authors: state.authors
});


export default connect(mapStateToProps)(AuthorsView);
