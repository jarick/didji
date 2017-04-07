import React, {Component, PropTypes} from 'react';

export default class Cell extends Component {

  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    opacity: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  onClick = () => (event) => {
    this.props.onClick(this.props.x, this.props.y);
    event.preventDefault();
  };

  render() {
    return (
      <div className="board__cell" onClick={this.onClick()}>
        {this.props.opacity}
      </div>
    );
  }
}