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
              <li><a href={'#'}><i className="fa fa-twitter" /></a></li>
              <li><a href={'https://www.facebook.com/lagocerqueiracirculo'} target="_blank"><i className="fa fa-facebook" /></a></li>
              <li><a href={'#'}><i className="fa fa-instagram" /></a></li>
              <li><a href={'https://www.youtube.com/user/clagocerqueira'} target="_blank"><i className="fa fa-youtube" /></a></li>
            </ul>
          </div>

          <div className="vertical-center links">
            <ul className="list-inline">
              <li><Link to={'/pt/estatutos'} target="_blank">Estatutos da Associação</Link></li>
              <li><Link to={'/pt/lago_cerqueira'} target="_blank">António do Lago Cerqueira</Link></li>
              <li><Link to={'/pt/orgaos_sociais'} target="_blank">Órgãos Sociais</Link></li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

export default Footer;
