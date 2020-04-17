import React from 'react';

const IndividualReport = ({ report }) => {
  return (
    <li>
      <p>ICAO Code: {report.icaoCode}</p>
      <p>Latest windspeed: {report.latestWindSpeed} MPS, {report.latestWindGust > 0 && `${report.latestWindGust} gusts`} bearing {report.latestWindDirection} as of day {report.latestTimeDate}, {report.latestTimeHour}:{report.latestTimeMinute} Zulu</p>
      <p>Average windspeed: {report.averageWindSpeed} MPS</p>
      <p>{report.totalReports} reports from this location</p>
    </li>
  );
}

export default IndividualReport;
