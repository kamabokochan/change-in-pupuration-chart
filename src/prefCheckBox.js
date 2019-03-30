import React, { Component } from 'react';

class PrefCheckBox extends Component {
  render() {
    return (
      this.props.data.map(item =>
        <li>
          <label>
            <input type="checkbox" />
            <p className="prefName">{item.prefName}</p>
          </label>
        </li>
      )
    );
  }
}

export default PrefCheckBox;
