import React from 'react';
import IndividualReport from './IndividualReport';

const ShowReports = ({ total, uniqueAirports }) => {
  return (
    <article className='report'>
      <h2>Final Report</h2>
        <p>Processed {total} METAR records.</p>
        <ul>
          <li className='header-row'>
            <div>ICAO Code</div>
            <div>Latest Wind dir/speed</div>
            <div>Latest as of</div>
            <div>Average Windspeed</div>
            <div>No. of records</div>
          </li>
          {uniqueAirports.map(report => <IndividualReport report={report} key={report.icaoCode} />)}
        </ul>
    </article>
  )
}

export default ShowReports;
