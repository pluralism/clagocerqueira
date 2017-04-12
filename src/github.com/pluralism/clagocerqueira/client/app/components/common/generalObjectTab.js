import React from 'react';
import { GeneralObjectItem } from './generalObjectItem';
import classNames from 'classnames';


export class GeneralObjectTab extends React.Component {
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
          {data.map((object) => {
            return <GeneralObjectItem key={object.name} imgURL={object.image}
              subtitle={this.props.subtitle} title={object.name}
              text={object.description !== null ?
                  object.description : 'Descrição indisponível'} />
          })}
        </ul>
      </div>
    );
  }
}
