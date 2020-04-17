import React from 'react';

const IndividualReport = ({ report }) => {
  return (
    <li>Airport Code: {report.icaoCode}</li>
  );
}

export default IndividualReport;