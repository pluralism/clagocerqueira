import React from 'react';
import { Link } from 'react-router';


export class GeneralObjectItem extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <li className="clearfix g-pb-50">
        <Link to={"#"} className="listing-list-item">
          <div className="listing-list-center-wrap">
            <div className="listing-list-media-wrap listing-list-center">
              <div className="listing-list-media">
                <img className="listing-list-media-img" src={this.props.imgURL}
                alt={this.props.altText !== undefined ? altText : "Presidente"} />
              </div>
            </div>

            <div className="listing-list-body listing-list-center">
              <span className="listing-list-media-subtitle">{this.props.subtitle}</span>
              <h3 className="listing-list-media-title">{this.props.title}</h3>
              <p className="listing-list-item-text">{this.props.text}</p>
            </div>
          </div>
        </Link>
      </li>
    );
  }
}
