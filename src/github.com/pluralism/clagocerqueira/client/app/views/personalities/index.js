import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { GeneralObjectTab } from '../../components/common/generalObjectTab';
import { isActiveTab } from '../../utils/index';
import HeaderLinks from '../../components/common/headerLinks';
import Footer from '../../components/common/footer';
import { Constants } from '../../constants/index';
import GeneralObjectsActions from '../../actions/generalObjects';



class PersonalitiesView extends React.Component {
  constructor(props) {
    super(props);

    this.currentName = Constants.PERSONALITIES.ARTS_WRITING;
    this.nameAndPageMappings = {
      [Constants.PERSONALITIES.ARTS_WRITING]: {
        mapping: Constants.PERSONALITIES.ARTS_WRITING,
        page: 1
      },
      [Constants.PERSONALITIES.SPORTS]: {
          mapping: Constants.PERSONALITIES.SPORTS,
          page: 1
      },
      [Constants.PERSONALITIES.SOCIAL_ECONOMICAL]: {
          mapping: Constants.PERSONALITIES.SOCIAL_ECONOMICAL,
          page: 1
      },
      [Constants.PERSONALITIES.POLITICAL]: {
          mapping: Constants.PERSONALITIES.POLITICAL,
          page: 1
      },
    };


    this.state = {
      activeTab: Constants.PERSONALITIES.ARTS_WRITING,
      canSwitchPage: true
    };


    /**
     * Add an event listener that is triggered whenever the user
     * presses a key in the keyboard
    */
    document.addEventListener("keydown", ::this.handleKeyDownEvent);
  }


  updateCurrentName(value) {
      this.currentName = value;


      // Update the active tab!
      this.setState({
          activeTab: this.currentName
      });
  }


  componentDidMount() {
    const { dispatch, params } = this.props;

    const mappings = [
      [Constants.PERSONALITIES.ARTS_WRITING, Constants.PERSONALITIES.ARTS_WRITING],
      [Constants.PERSONALITIES.SPORTS, Constants.PERSONALITIES.SPORTS],
      [Constants.PERSONALITIES.SOCIAL_ECONOMICAL, Constants.PERSONALITIES.SOCIAL_ECONOMICAL],
      [Constants.PERSONALITIES.POLITICAL, Constants.PERSONALITIES.POLITICAL]];


    if(params.type !== undefined) {
      if(params.type === Constants.PERSONALITIES.ARTS_WRITING ||
          params.type === Constants.PERSONALITIES.SPORTS ||
          params.type === Constants.PERSONALITIES.SOCIAL_ECONOMICAL ||
          params.type === Constants.PERSONALITIES.POLITICAL) {
        this.updateCurrentName(params.type);
      }
    }


    dispatch(GeneralObjectsActions.getAllDataFromPersonalities(mappings));
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


  renderPageContent() {
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
              <li role="presentation"
                  className={isActiveTab(Constants.PERSONALITIES.ARTS_WRITING, this.state) ?
                      "active" : ""}>
                <Link to={"#first_tab"}
                  onClick={() =>
                    this.updateCurrentName(Constants.PERSONALITIES.ARTS_WRITING)}
                  role="tab" data-toggle="tab">{Constants.PERSONALITIES_TEXT.ARTS_WRITING}</Link>
              </li>

              <li role="presentation"
                  className={isActiveTab(Constants.PERSONALITIES.SPORTS, this.state) ?
                      "active" : ""}>
                <Link to={"#second_tab"}
                      onClick={() =>
                          this.updateCurrentName(Constants.PERSONALITIES.SPORTS)}
                      role="tab" data-toggle="tab">{Constants.PERSONALITIES_TEXT.SPORTS}</Link>
              </li>

              <li role="presentation"
                  className={isActiveTab(Constants.PERSONALITIES.SOCIAL_ECONOMICAL, this.state) ?
                      "active" : ""}>
                <Link to={"#third_tab"}
                      onClick={() =>
                          this.updateCurrentName(Constants.PERSONALITIES.SOCIAL_ECONOMICAL)}
                      role="tab" data-toggle="tab">{Constants.PERSONALITIES_TEXT.SOCIAL_ECONOMICAL}</Link>
              </li>

              <li role="presentation"
                  className={isActiveTab(Constants.PERSONALITIES.POLITICAL, this.state) ?
                      "active" : ""}>
                <Link to={"#fourth_tab"}
                      onClick={() =>
                          this.updateCurrentName(Constants.PERSONALITIES.POLITICAL)}
                      role="tab" data-toggle="tab">{Constants.PERSONALITIES_TEXT.POLITICAL}</Link>
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
    let obj = this.nameAndPageMappings[this.currentName];
    let currentPage = obj.page;
    let personalitiesMapping = personalities.data[obj.mapping];

    if(currentPage < personalitiesMapping.objects.max_pages) {
        obj.page += 1;

        dispatch(GeneralObjectsActions.getDataByPagePersonalities(this.currentName,
            obj.mapping, obj.page));
    }
  }


  getPreviousPageContent() {
    const { dispatch } = this.props;
    let obj = this.nameAndPageMappings[this.currentName];
    let currentPage = obj.page;

    if(currentPage > 1) {
        obj.page -= 1;

        dispatch(GeneralObjectsActions.getDataByPagePersonalities(this.currentName,
            obj.mapping, obj.page));
    }
  }


  renderTabContents() {
    const { personalities } = this.props;

    return (
      <div className="tab-content">
        <GeneralObjectTab
          tabID={'#first_tab'}
          subtitle={"Personalidades | Artes e Letras"}
          active={this.state.activeTab === Constants.PERSONALITIES.ARTS_WRITING}
          data={personalities.data[Constants.PERSONALITIES.ARTS_WRITING].objects.objects_data} />

        <GeneralObjectTab
          tabID={'#second_tab'}
          subtitle={"Personalidades | Desporto"}
          active={this.state.activeTab === Constants.PERSONALITIES.SPORTS}
          data={personalities.data[Constants.PERSONALITIES.SPORTS].objects.objects_data} />

        <GeneralObjectTab
          tabID={'#third_tab'}
          subtitle={"Personalidades | Social e Económico"}
          active={this.state.activeTab === Constants.PERSONALITIES.SOCIAL_ECONOMICAL}
          data={personalities.data[Constants.PERSONALITIES.SOCIAL_ECONOMICAL].objects.objects_data} />

        <GeneralObjectTab
            tabID={'#fourth_tab'}
            subtitle={"Personalidades | Político"}
            active={this.state.activeTab === Constants.PERSONALITIES.POLITICAL}
            data={personalities.data[Constants.PERSONALITIES.POLITICAL].objects.objects_data} />


        <div className="control-buttons">
          <div className="prev-button" onClick={() => this.getPreviousPageContent()}/>
          <div className="next-button" onClick={() => this.getNextPageContent()}/>
        </div>
      </div>
    );
  }



  render() {
    return (
        <main>
          <HeaderLinks />
            {this.renderPageContent()}
          <Footer />
        </main>
    );
  }
}


const mapStateToProps = (state) => ({
  personalities: state.personalities,
});


export default connect(mapStateToProps)(PersonalitiesView);
