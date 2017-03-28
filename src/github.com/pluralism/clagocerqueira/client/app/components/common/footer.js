import React from 'react';
import { Link } from 'react-router';


class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section id="footer" className="row">
        <div className="informations container-fluid page-scroll">
          <div className="vertical-center">
            <ul className="list-inline footer-list">
              <li><Link to={'#'}><i className="fa fa-twitter"></i></Link></li>
              <li><Link to={'#'}><i className="fa fa-facebook"></i></Link></li>
              <li><Link to={'#'}><i className="fa fa-instagram"></i></Link></li>
              <li><Link to={'#'}><i className="fa fa-youtube"></i></Link></li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

export default Footer;
