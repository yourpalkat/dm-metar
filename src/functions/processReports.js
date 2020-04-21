export default function processReports (allReports) {
  // Expects an array of report objects, each containing icaoCode, timestamp, windspeed, wind direction, wind gust
  // Returns one object containting one key per unique icaoCode, the value for each key is an object with average & latest data
  const uniqueCodes = {};

  allReports.forEach(report => {
    // If this code is not in our object, add a new record
    if (!uniqueCodes[report.icaoCode]) {
      uniqueCodes[report.icaoCode] = {
        latestWindSpeed: report.windSpeedInMps, // first record, so it's automatically the latest
        latestWindGust: report.windGust,
        latestWindDirection: report.windDirection,
        latestTimeDate: report.timestampDate,
        latestTimeHour: report.timestampHour,
        latestTimeMinute: report.timestampMinute,
        averageWindSpeed: report.windSpeedInMps, // same as latestWindSpeed, since there's only one record
        sumWindspeed: report.windSpeedInMps, // same as latestWinsSpeed, since there's only one record
        totalReports: 1, // this is the first record
      };
    } else {
      // If the code is in our uniques object already, then update that record
      // Copy old unique record so we're not directly mutating it
      const updatedUniqueRecord = {...uniqueCodes[report.icaoCode]};

      // Update total reports and average windspeed
      const newTotal = updatedUniqueRecord.totalReports + 1;
      const newSumWindspeed = updatedUniqueRecord.sumWindspeed + report.windSpeedInMps;
      const newAverageWindspeed = Math.round(newSumWindspeed / newTotal);
      updatedUniqueRecord.totalReports = newTotal;
      updatedUniqueRecord.sumWindspeed = newSumWindspeed;
      updatedUniqueRecord.averageWindSpeed = newAverageWindspeed;

      // Is this record newer than the 'latest' in the file? If so, replace latest wind information & time
      if (
        (report.timestampDate > updatedUniqueRecord.latestTimeDate) || 
        (report.timestampDate === updatedUniqueRecord.latestTimeDate && report.timestampHour > updatedUniqueRecord.latestTimeHour) || 
        (report.timestampDate === updatedUniqueRecord.latestTimeDate && report.timestampHour === updatedUniqueRecord.latestTimeHour)) {
          updatedUniqueRecord.latestTimeDate = report.timestampDate;
          updatedUniqueRecord.latestTimeHour = report.timestampHour;
          updatedUniqueRecord.latestTimeMinute = report.timestampMinute;
          updatedUniqueRecord.latestWindDirection = report.windDirection;
          updatedUniqueRecord.latestWindSpeed = report.windSpeedInMps;
          updatedUniqueRecord.latestWindGust = report.windGust;
      }

      // Replace the old record in our unique array with the new updated one
      uniqueCodes[report.icaoCode] = {...updatedUniqueRecord};
    }
  });

  return uniqueCodes;
}