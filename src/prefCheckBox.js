import React, { Component } from 'react';

class PrefCheckBox extends Component {
  render() {
    return (
      this.props.data.map((item, i) =>
        <li key={`pref_key${i}`}>
          <label>
            <input type="checkbox" onChange={(e) => this.props.getChangeInPopulationInfo(item.prefCode, item.prefName, e.target.checked)} />
            <p className="prefName">{item.prefName}</p>
          </label>
        </li>
      )
    );
  }
}

export default PrefCheckBox;
