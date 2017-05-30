import React from 'react';
import { Link } from 'react-router';
import { Constants } from '../../constants/index';


export class SearchItem extends React.Component {
    constructor(props) {
        super(props);

        this.object = this.props.object;
        console.log(this.object);
    }


    render() {
        return (
            <li className="clearfix g-pb-50">
                <Link to={"#"} className="listing-list-item">
                    <div className="listing-list-center-wrap">
                        <div className="listing-list-media-wrap listing-list-center">
                            <div className="listing-list-media">
                                <img className="listing-list-media-img" src={this.object.objects.objects_data.image}
                                     alt={Constants.SEARCH_TEXT.MAPPINGS[this.object._type]} />
                            </div>
                        </div>

                        <div className="listing-list-body listing-list-center">
                            <span className="listing-list-media-subtitle">{Constants.SEARCH_TEXT.MAPPINGS[this.object._type]}</span>
                            <h3 className="listing-list-media-title">{this.object.objects.objects_data.name}</h3>
                            <p className="listing-list-item-text">{this.object.objects.objects_data.name !== null ?
                                this.object.objects.objects_data.name : "Descrição Indisponível"}</p>
                        </div>
                    </div>
                </Link>
            </li>
        );
    }
}
