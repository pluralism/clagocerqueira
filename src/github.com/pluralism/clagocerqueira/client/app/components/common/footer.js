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
              <li><Link to={'#'}><i className="fa fa-twitter" /></Link></li>
              <li><Link to={'https://www.facebook.com/lagocerqueiracirculo'}><i className="fa fa-facebook" /></Link></li>
              <li><Link to={'#'}><i className="fa fa-instagram" /></Link></li>
              <li><Link to={'https://www.youtube.com/user/clagocerqueira'}><i className="fa fa-youtube" /></Link></li>
            </ul>
          </div>

          <div className="vertical-center links">
            <ul className="list-inline">
              <li><Link to={'estatutos'} target="_blank">Estatutos da Associação</Link></li>
              <li><Link to={'lago_cerqueira'} target="_blank">António do Lago Cerqueira</Link></li>
              <li><Link to={'orgaos_sociais'} target="_blank">Órgãos Sociais</Link></li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

export default Footer;
