import React from 'react';
import { SearchItem } from './searchItem';
import classNames from 'classnames';


export class SearchTab extends React.Component {
    constructor(props) {
        super(props);
    }


    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.active || nextProps.active === !this.props.active;
    }


    render() {
        const { data } = this.props;

        return (
            <div id={this.props.tabID} role="tabpanel" className={classNames({
                "tab-pane": true,
                "active": this.props.active,
                "fade": true,
                "in": true
            })}>

                <ul className="listing-list">
                    {data.length > 0 ? data.map((obj, i) => {
                        return <SearchItem key={`${this.props.tabID}-${i}`} object={obj} />
                    }) : ''}
                </ul>
            </div>
        );
    }
}
