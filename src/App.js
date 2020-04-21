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
      uniqueCodes: {},
      loading: false,
    };
  }

  componentDidMount() {
    this.handleLoadData();
  }

  handleLoadData = () => {
    this.setState({
      allReports: [],
      uniqueCodes: {},
      loading: true,
    }, async () => {
      window.scrollTo(0, 0);
      const allReports = await fetchNewReports();
      const uniqueCodes = await processReports(allReports);
      this.setState({
        allReports,
        uniqueCodes,
        loading: false,
      });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="wrapper">
            <h1>
              METAR Reports
            </h1>
          </div>
        </header>
        <main>
          <div className="wrapper">
            {this.state.loading && <p>Processing reports...</p>}
            {Object.keys(this.state.uniqueCodes).length > 0 && <ShowReports total={this.state.allReports.length} uniqueCodes={this.state.uniqueCodes} />}
            <button type="button" onClick={this.handleLoadData} className="load-button">Load new reports</button>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
