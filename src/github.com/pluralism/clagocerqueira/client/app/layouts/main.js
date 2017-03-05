import React from 'react';


export default class MainLayout extends React.Component {
  constructor() {
    super()
  }


  render() {
    return (
      <div id="body" data-spy="scroll" className="font-main web-padding-top">
        {this.props.children}
      </div>
    );
  }
}
