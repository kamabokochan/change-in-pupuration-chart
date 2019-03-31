import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PrefCheckBox from './prefCheckBox';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import './css/style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      prefectures: [],
      perYear: []
    };

    this.apiKey = '1BfAD2LffrkVfvNOTw58XNmDNr426kx180ub8XeD';
    this.getprefecturesInfo();
  }

  getprefecturesInfo() {
    const prefUrl = 'https://opendata.resas-portal.go.jp/api/v1/prefectures';

    fetch(prefUrl, {
      method: "GET",
      headers: {
        'X-API-KEY': this.apiKey
      }
    })
      .then(response => response.json())
      .then(res => {
        this.setState({ prefectures: res.result })
      });
  }

  getChangeInPopulationInfo(code, name, isChecked) {
    if (!isChecked) {
      const newPerYear = this.state.perYear.filter((item) => item.code !== code);
      this.setState({ perYear: newPerYear });
      return;
    }

    const perYearUrl = `https://opendata.resas-portal.go.jp/api/v1/population/sum/perYear?prefCode=${code}`;

    fetch(perYearUrl, {
      method: "GET",
      headers: {
        'X-API-KEY': this.apiKey
      }
    })
      .then(response => response.json())
      .then(res => {
        this.setState({
          perYear: [...this.state.perYear, {
            code: code,
            name: name,
            year: res.result.line.data.map(val => val.year),
            data: res.result.line.data.map(val => val.value)
          }]
        })
      });
  }

  render() {
    const options = {
      title: {
        text: '各都道府県の人口増減'
      },
      xAxis: {
        title: {
          text: '年'
        }
      },
      yAxis: {
        title: {
          text: '%'
        }
      },
      plotOptions: {
        series: {
          pointInterval: 5,
          pointStart: 1965
        }
      },
      series: this.state.perYear
    };

    return (
      <div className="wrap">
        <header>
          <h1>都道府県別の総人口推移グラフ</h1>
        </header>
        <main>
          <ul className="prefecturesList">
            <PrefCheckBox data={this.state.prefectures} getChangeInPopulationInfo={(code, name, isChecked) => this.getChangeInPopulationInfo(code, name, isChecked)} />
          </ul>
          <div className="chartWrap">
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
        </main>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
