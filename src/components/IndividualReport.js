import React from 'react';

const IndividualReport = ({ report, code }) => {
  let suffix = '';
  const date = report.latestTimeDate.toString();
  switch (date[date.length - 1]) {
    case '1':
      suffix = 'st';
      break;
    case '2':
      suffix = 'nd';
      break;
    case '3':
      suffix = 'rd';
      break;
    default:
      suffix = 'th';
  }


  return (
    <>
    <li className='visually-hidden'>
        ICAO Code: {code}. Latest wind speed as of {report.latestTimeHour < 10 && '0'}{report.latestTimeHour}{report.latestTimeMinute < 10 && '0'}{report.latestTimeMinute} Greenwich Mean Time on day {report.latestTimeDate}: {report.latestWindSpeed} metres per second {report.latestWindGust > 0 && `, with gusts of ${report.latestWindGust}`}, heading {report.latestWindDirection} degrees. Average wind speed {report.averageWindSpeed} metres per second based on {report.totalReports} reports this month.
    </li>
    <li aria-hidden='true'>
      <div>{code}</div>
      <div>{report.latestWindDirection}&deg; {report.latestWindSpeed}&nbsp;MPS {report.latestWindGust > 0 && `G: ${report.latestWindGust}`}</div>
      <div>{report.latestTimeDate}{suffix}, {report.latestTimeHour < 10 && '0'}{report.latestTimeHour}{report.latestTimeMinute < 10 && '0'}{report.latestTimeMinute}&nbsp;GMT</div>
      <div>{report.averageWindSpeed}&nbsp;MPS</div>
      <div>{report.totalReports}</div>
    </li>
    </>
  );
}

export default IndividualReport;
