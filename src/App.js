import React, { Component } from 'react';
import './App.css';
import ShowReports from './components/ShowReports';
import generateFakeData from './functions/generateFakeData';
import * as reportParser from './functions/reportParser';

class App extends Component {

  constructor() {
    super();
    this.state = {
      allReports: [],
      uniqueAirports: [],
      loading: false,
    };
  }

  handleLoadData = () => {
    const rawReportString = generateFakeData();
    const rawReportArray = reportParser.splitReports(rawReportString);
    const allReports = reportParser.parseReports(rawReportArray);
    console.log(allReports);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            METAR Reports
          </h1>
        </header>
        <main>
          {this.state.loading ? <p>Processing reports...</p> : (
            <ShowReports total={this.state.allReports.length} uniqueAirports={this.state.uniqueAirports} />
          )}
          <button type='button' onClick={this.handleLoadData}>Load new reports</button>
        </main>
      </div>
    );
  }
}

export default App;
