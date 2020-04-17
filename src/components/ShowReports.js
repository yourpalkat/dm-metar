import React from 'react';
import IndividualReport from './IndividualReport';

const ShowReports = ({ total, uniqueAirports }) => {
  return (
    <div>
      <h2>Final Report</h2>
        <p>Processed {total} METAR records.</p>
        <ul>
          {uniqueAirports.map(report => <IndividualReport report={report} key={report.icaoCode} />)}
        </ul>
    </div>
  )
}

export default ShowReports;