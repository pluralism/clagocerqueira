import React from 'react';


export default class MainLayout extends React.Component {
  constructor() {
    super()
  }


  componentDidMount() {
    $(function() {
      if($('.navbar').offset().top > 150) {
        $('.navbar-fixed-top').addClass('top-nav-collapse');
      }


      $(window).scroll(() => {
        if($('.navbar').offset().top > 150) {
          $('.navbar-fixed-top').addClass('top-nav-collapse');
        } else {
          $('.navbar-fixed-top').removeClass('top-nav-collapse');
        }
      });


      // Initialize smooth scroll
      $('.page-scroll > a').click((e) => {
        e.preventDefault();
        let link = e.currentTarget;
        $.smoothScroll({
          scrollTarget: link.hash
        });
      });
    });
  }


  render() {
    return (
      <div id="body" data-spy="scroll" className="font-main web-padding-top">
        {this.props.children}
      </div>
    );
  }
}
