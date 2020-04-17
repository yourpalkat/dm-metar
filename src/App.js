import React, { Component } from 'react';
import './App.css';
import ShowReports from './components/ShowReports';
import fetchNewReports from './functions/fetchNewReports';
import processReports from './functions/processReports';

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
    this.setState({
      allReports: [],
      uniqueAirports: [],
      loading: true,
    }, async () => {
      const allReports = await fetchNewReports();
      const uniqueAirports = await processReports(allReports);
      this.setState({
        allReports,
        uniqueAirports,
        loading: false,
      });
    });
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
          {this.state.loading && <p>Processing reports...</p>}
          {this.state.uniqueAirports.length > 0 && <ShowReports total={this.state.allReports.length} uniqueAirports={this.state.uniqueAirports} />}
          <button type='button' onClick={this.handleLoadData}>Load new reports</button>
        </main>
      </div>
    );
  }
}

export default App;
