
import React, {Component, PropTypes} from 'react';

export default class Button extends Component {

  static propTypes = {
    onClick: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
  };

  onClick = () => (event) => {
    this.props.onClick();
    event.preventDefault();
  };

  render() {
    return (
      <div className="buttons__btn">
        <input type="button" value={this.props.name} onClick={this.onClick()}/>
      </div>
    );
  }
}