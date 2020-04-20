import React from 'react';

const IndividualReport = ({ report }) => {
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
    <li>
      <div>{report.icaoCode}</div>
      <div>{report.latestWindDirection}&deg; {report.latestWindSpeed} MPS {report.latestWindGust > 0 && `G: ${report.latestWindGust}`}</div>
      <div>{report.latestTimeDate}{suffix}, {report.latestTimeHour < 10 && '0'}{report.latestTimeHour}{report.latestTimeMinute < 10 && '0'}{report.latestTimeMinute} GMT</div>
      <div>{report.averageWindSpeed} MPS</div>
      <div>{report.totalReports}</div>
    </li>
  );
}

export default IndividualReport;
