import React from 'react';
import { Link, browserHistory } from 'react-router';


class HeaderLinks extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="clc-header one-page-header navbar navbar-default navbar-fixed-top navbar-toggleable-sm" data-role="navigation">
                <div className="navbar-header">
                    <div className="menu-container page-scroll">
                        <button type="button" className="navbar-toggle" data-toggle="collapse"
                                data-target=".clc-collapse">
                            <span className="sr-only">Toggle Navigation</span>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                        </button>


                        <Link onClick={::this.logoClickHandler} target={"_blank"}
                              className="navbar-brand main-font">
                            <img src={require('../../static/img/logo.jpg')} alt="Logo"
                                 className="img-responsive" />
                        </Link>
                    </div>
                </div>

                <div className="collapse navbar-collapse clc-collapse">
                    <ul className="nav navbar-nav">
                        <li>
                            <Link to="/pt/">Início</Link>
                        </li>

                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle"
                                data-toggle="dropdown">Autores Amarantinos</a>

                            <ul className="dropdown-menu">
                                <li>
                                    <a href="/pt/autores/1400-1500">Séc. XV</a>
                                </li>
                                <li>
                                    <a href="/pt/autores/1501-1600">Séc. XVI</a>
                                </li>
                                <li>
                                    <a href="/pt/autores/1601-1700">Séc. XVII</a>
                                </li>
                                <li>
                                    <a href="/pt/autores/1701-1800">Séc. XVIII</a>
                                </li>
                                <li>
                                    <a href="/pt/autores/1801-1900">Séc. XIX</a>
                                </li>
                                <li>
                                    <a href="/pt/autores/1901-2000">Séc. XX</a>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <Link to={"/pt/#orgaos_autarquicos"} target="_blank">Órgãos Autárquicos</Link>
                        </li>

                        <li>
                            <Link to={"/pt/associacoes"}>Associações</Link>
                        </li>

                        <li>
                            <Link to={"/pt/festividades"}>Festividades</Link>
                        </li>

                        <li>
                            <Link to={"/pt/imprensa"}>Imprensa</Link>
                        </li>

                        <li>
                            <Link to={"/pt/personalidades"}>Personalidades</Link>
                        </li>

                        <li>
                            <Link to={"/pt/patrimonio_natural"}>Património Natural</Link>
                        </li>

                        <li>
                            <Link to={"/pt/#contacto"} target={"_blank"}>Contacto</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }


    logoClickHandler(e) {
        browserHistory.push('/pt/');
    }
}


export default HeaderLinks;