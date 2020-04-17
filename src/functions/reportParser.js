export function splitReports(reportString) {
  // Expects a single long string of reports where each report is on a new line
  // Returns an array of strings, one string per report
  const reportArray = reportString.split('\n');
  return reportArray;
}

export function parseReports(rawReportArray) {
  // Expects an array of report strings
  // Returns an array of parsed report objects
  const allParsedReports = [];

  rawReportArray.forEach(report => {
    const parsedReport = {
      icaoCode: '',
      timestampDate: 1,
      timestampHour: 0,
      timestampMinute: 0,
      windSpeedInMps: 0,
      windDirection: '',
      windGust: 0,
    };

    // Each item in the report is separated by a space
    const reportArray = report.split(' ');

    // The first item is the ICAO code
    parsedReport.icaoCode = reportArray[0];

    // The second item is the timestamp
    const timeInfo = parseTime(reportArray[1]);
    parsedReport.timestampDate = timeInfo.dayOfMonth;
    parsedReport.timestampHour = timeInfo.hour;
    parsedReport.timestampMinute = timeInfo.minute;

    // The third item is the wind information
    const windInfo = parseWind(reportArray[2]);
    parsedReport.windSpeedInMps = windInfo.speed;
    parsedReport.windDirection = windInfo.direction;
    parsedReport.windGust = windInfo.gust;

    allParsedReports.push(parsedReport);
  });

  return allParsedReports;
}

function parseTime (timeString) {
  // Expects a string of DDHHMMZ: day, hour, minute, 'Z'
  // Returns an object containing date, hour and minute as integers
  const dayOfMonth = timeString.slice(0, 2);
  const hour = timeString.slice(2, 4);
  const minute = timeString.slice(4, 6);
  const timeObject = {
    dayOfMonth: parseInt(dayOfMonth, 10),
    hour: parseInt(hour, 10),
    minute: parseInt(minute, 10)
  };
  return timeObject;
}

function parseWind (windString) {
  // Expects a string of <direction><speed><gusts?><unit>
  // Dir is 3 digits, speed is 2-3 digits, min 00, gusts is 2 digits prefixed with G and is optional, unit is KT or MPS
  // Returns an object direction as a string, speed and gusts as integers, normalized to MPS

  const windArray = windString.split('');

  // Remove first 3 digits, which are always windspeed
  const direction = windArray.splice(0,3).join('');
  let gust = 0;
  if (windArray.indexOf('G') !== -1) {
    // If there's gust data present, pull it out, convert it to an integer
    const gustArray = windArray.splice(windArray.indexOf('G'), 3);
    gust = parseInt(gustArray.splice(1, 2).join(''), 10);
  }
  let unit = '';
  if (windArray.indexOf('K') !== -1) {
    // If units are knots, remove the last two characters
    unit = windArray.splice(windArray.length - 2, 2).join('');
  } else {
    // Otherwise, units are MPS, so remove the last three characters
    unit = windArray.splice(windArray.length - 3, 3).join('');
  }
  let speed = parseInt(windArray.join(''), 10);
  // Normalize speed so it's always in MPS
  if (unit === 'KT') speed = Math.round(speed / 2);

  const windObject = {
    direction: direction,
    gust: gust,
    speed: speed,
  };

  return windObject;
}