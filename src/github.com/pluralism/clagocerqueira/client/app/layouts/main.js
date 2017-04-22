import React from 'react';


export default class MainLayout extends React.Component {
  constructor() {
    super()
  }


  componentDidMount() {
    $(function() {
      let headerHomepage = $('.header-homepage').offset();
      if(headerHomepage !== undefined && headerHomepage.top > 150) {
        $('.navbar-fixed-top').addClass('top-nav-collapse');
      }


      $(window).scroll(() => {
        let headerHomepage = $('.header-homepage').offset();
        if(headerHomepage !== undefined && headerHomepage.top > 150) {
          $('.navbar-fixed-top').addClass('top-nav-collapse');
        } else {
          $('.navbar-fixed-top').removeClass('top-nav-collapse');
        }
      });
    });
  }


  render() {
    return (
      <div id="body" className="font-main web-padding-top">
        {this.props.children}
      </div>
    );
  }
}
