import React                                from 'react';
import { connect }                          from 'react-redux';


class HomeIndexView extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <p>React está a funcionar!!</p>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(HomeIndexView);
