import React from 'react';
import IndividualReport from './IndividualReport';

const ShowReports = ({ total, uniqueCodes }) => {
  const keys = Object.keys(uniqueCodes);
  
  return (
    <article className='report'>
      <h2>Final Report</h2>
        <p>Processed {total} METAR records. Showing reports for {keys.length} unique ICAO codes.</p>
        <ul>
          <li className='header-row' aria-hidden='true'>
            <div>ICAO Code</div>
            <div>Latest Wind dir/speed</div>
            <div>Latest as of</div>
            <div>Average Windspeed</div>
            <div>No. of records</div>
          </li>
          {keys.map(icaoCode => <IndividualReport report={uniqueCodes[icaoCode]} key={icaoCode} code={icaoCode} />)}
        </ul>
    </article>
  )
}

export default ShowReports;
