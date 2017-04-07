
import React, {Component, PropTypes} from 'react';

export default class Load extends Component {

  static propTypes = {
    save: PropTypes.bool.isRequired,
    load: PropTypes.bool.isRequired
  };

  get show() {
    return this.props.save || this.props.load;
  }

  render() {
    return (
      <div className="modal" style={{display: (this.show) ? 'block' : 'none'}}>
        <div className="modal-content">
          <p>
            {(this.show) ? 'Load ...' : ''}
          </p>
        </div>
      </div>
    );
  }
}