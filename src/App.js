import React, { Component } from 'react';
import PrefCheckBox from './prefCheckBox';

class App extends Component {
  state = {
    prefectures: []
  };

  componentDidMount() {
    const apiKey = '1BfAD2LffrkVfvNOTw58XNmDNr426kx180ub8XeD';
    const url = 'https://opendata.resas-portal.go.jp/api/v1/prefectures';

    fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        'X-API-KEY': apiKey
      }
    })
      .then(response => response.json())
      .then(res => {
        this.setState({ prefectures: res.result })
      });
  }

  render() {
    console.log(this.state.prefectures);
    return (
      <div className="wrap">
        <header>
          <h1>都道府県別の総人口推移グラフ</h1>
        </header>
        <main>
          <ul className="prefecturesList">
            <PrefCheckBox data={this.state.prefectures} />
          </ul>
        </main>
      </div>
    );
  }
}

export default App;
