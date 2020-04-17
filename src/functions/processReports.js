export default function processReports (allReports) {
  // Expects an array of report objects, each containing icaoCode, timestamp, windspeed, wind direction, wind gust
  // Returns an array of objects, one for each unique icaoCode
  const uniqueAirports = [];

  allReports.forEach(report => {
    // Has this ICAO code been added to our unique array already?
    const index = uniqueAirports.findIndex(uniqueAirport => uniqueAirport.icaoCode === report.icaoCode);

    // If this code is not in our array, add a new record
    if (index === -1) {
      const newUniqueAirport = {
        icaoCode: report.icaoCode,
        latestWindSpeed: report.windSpeedInMps, // latest is the same as report
        latestWindGust: report.windGust,
        latestWindDirection: report.windDirection,
        latestTimeDate: report.timestampDate,
        latestTimeHour: report.timestampHour,
        latestTimeMinute: report.timestampMinute,
        averageWindSpeed: report.windSpeedInMps, // same as latestWindSpeed, since there's only one record
        sumWindspeed: report.windSpeedInMps, // same as latestWinsSpeed, since there's only one record
        totalReports: 1, // this is the first record
      };
      uniqueAirports.push(newUniqueAirport);
    } else {
      // If the code is in our array already, then update that record
      // Copy old unique record so we're not directly mutating it
      const updatedUniqueAirport = {...uniqueAirports[index]};

      // Update total reports and average windspeed
      const newTotal = updatedUniqueAirport.totalReports + 1;
      const newSumWindspeed = updatedUniqueAirport.sumWindspeed + report.windSpeedInMps;
      const newAverageWindspeed = Math.round(newSumWindspeed / newTotal);
      updatedUniqueAirport.totalReports = newTotal;
      updatedUniqueAirport.sumWindspeed = newSumWindspeed;
      updatedUniqueAirport.averageWindSpeed = newAverageWindspeed;

      // Is this record newer than the 'latest' in the file? If so, replace latest wind information & time
      if (
        (report.timestampDate > updatedUniqueAirport.latestTimeDate) || 
        (report.timestampDate === updatedUniqueAirport.latestTimeDate && report.timestampHour > updatedUniqueAirport.latestTimeHour) || 
        (report.timestampDate === updatedUniqueAirport.latestTimeDate && report.timestampHour === updatedUniqueAirport.latestTimeHour)) {
          updatedUniqueAirport.latestTimeDate = report.timestampDate;
          updatedUniqueAirport.latestTimeHour = report.timestampHour;
          updatedUniqueAirport.latestTimeMinute = report.timestampMinute;
          updatedUniqueAirport.latestWindDirection = report.windDirection;
          updatedUniqueAirport.latestWindSpeed = report.windSpeedInMps;
          updatedUniqueAirport.latestWindGust = report.windGust;
      }

      // Replace the old record in our unique array with the new updated one
      uniqueAirports.splice(index, 1, updatedUniqueAirport);
    }
  });

  return uniqueAirports;
}