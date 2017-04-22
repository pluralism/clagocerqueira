import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { GeneralObjectTab } from '../../components/common/generalObjectTab';
import HeaderLinks from '../../components/common/headerLinks';
import Footer from '../../components/common/footer';
import PersonalitiesActions from '../../actions/personalities';
import { Constants } from '../../constants/index';



class PersonalitiesView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      canSwitchPage: true
    };


    /**
     * Add an event listener that is triggered whenever the user
     * presses a key in the keyboard
    */
    document.addEventListener("keydown", ::this.handleKeyDownEvent);
  }


  componentDidMount() {
    const { dispatch } = this.props;

    // Retrieve the initial data to the user (we always select page 1 in the first render)
    dispatch(PersonalitiesActions.getDataByPage(1));
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


  renderUpperSection() {
    return (
      <section id="personalidades_data">
        <div className="g-pt-40">
          <div className="text-center g-mb-30">
            <div className="g-mb-30">
              <h2><span className="g-color-default">{Constants.PERSONALITIES_STRING}</span></h2>
            </div>
            <p className="g-page-title">Nam sed erat aliquet libero aliquet commodo.
              Donec euismod augue non quam finibus, nec iaculis tellus gravida. Integer <br /> efficitur eros ut dui laoreet, ut blandit turpis tincidunt.</p>
          </div>


          <div className="search_on_list g-mb-30 text-center font-main">
            <input type="text" placeholder="Pesquisar personalidades&#8230;" />
          </div>


          <div className="tab-v7">
            <ul className="tab-v7-nav" role="tablist">
              <li role="presentation" className="active">
                <Link to={"#first_tab"}
                  role="tab" data-toggle="tab">{Constants.PERSONALITIES_STRING}</Link>
              </li>
            </ul>


            {this.renderTabContents()}
          </div>
        </div>
      </section>
    );
  }


  getNextPageContent() {
    const { personalities, dispatch } = this.props;
    let currentPage = this.state.page;


    if(currentPage < personalities.max_pages) {
      this.setState({
        page: currentPage + 1
      }, () => {
        dispatch(PersonalitiesActions.getDataByPage(this.state.page));
      });
    }
  }


  getPreviousPageContent() {
    const { dispatch } = this.props;
    let currentPage = this.state.page;

    if(currentPage > 1) {
      this.setState({
        page: currentPage - 1
      }, () => {
        dispatch(PersonalitiesActions.getDataByPage(this.state.page));
      });
    }
  }


  renderTabContents() {
    const { personalities } = this.props;

    return (
      <div className="tab-content">
        <GeneralObjectTab
          tabID={'#first_tab'}
          subtitle={Constants.PERSONALITIES_STRING}
          active={true}
          data={personalities.objects_data} />


        <div className="control-buttons">
          <div className="prev-button" onClick={() => this.getPreviousPageContent()}/>
          <div className="next-button" onClick={() => this.getNextPageContent()}/>
        </div>
      </div>
    );
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
  personalities: state.personalities,
});


export default connect(mapStateToProps)(PersonalitiesView);
