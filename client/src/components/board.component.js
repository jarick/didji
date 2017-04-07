
import React, {Component, PropTypes} from 'react';
import Cell from './cell.component';
import Loader from './loader.component';
import Button from './button.component';

export default class Board extends Component {

  static propTypes = {
    load: PropTypes.bool.isRequired,
    save: PropTypes.bool.isRequired,
    points: PropTypes.array.isRequired,
    onCellClick: PropTypes.func.isRequired,
    onRecalculate: PropTypes.func.isRequired,
    onLoadClick: PropTypes.func.isRequired,
    onSaveClick: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.interval = null;
  }

  componentDidMount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(() => {
      if (!this.props.save && !this.props.load) {
        const save = this.props.points
          .map(point => ({
            ...point,
            opacity: point.opacity - 25
          }))
          .filter(point => point.opacity > 0);
        this.props.onRecalculate(save);
      }
    }, 1000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  render() {
    let matrix = {};
    [1,2,3,4,5].forEach(y => {
      [1,2,3,4,5].forEach(x => {
        const find = this.props.points.filter(point => point.x === x && point.y === y);
        if (find.length > 0) {
          matrix[`${x}-${y}`] = find[0].opacity;
        } else {
          matrix[`${x}-${y}`] = 0;
        }
      });
    });
    return (
      <div className="content">
        <Loader save={this.props.save} load={this.props.load} />
        <div className="board">
          {[1,2,3,4,5].map(y => (
            <div key={`row-${y}`} className="board__row">
              {[1,2,3,4,5].map(x => (
                <Cell key={`cell-${x}-${y}`} x={x} y={y} opacity={matrix[`${x}-${y}`]}
                      onClick={this.props.onCellClick}/>
              ))}
            </div>
          ))}
        </div>
        <div className="buttons">
          <Button onClick={this.props.onLoadClick} name="Load"/>
          <Button onClick={() => this.props.onSaveClick(this.props.points)} name="Save"/>
        </div>
      </div>
    );
  }
}