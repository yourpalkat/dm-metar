function generateFakeData () {
  const NUMBER_OF_REPORTS = 200000;
  const NUMBER_OF_ICAO_CODES = 200;
  
  let metarReports = [];

  // ICAO codes are chosen from an array of possible codes, instead of making a random string on the fly
  // This way we can be assured of each code being used many times, ensuring the 'average' windspeed will be a meaningful number
  const possibleIcaoCodes = [];

  for (let i=0; i < NUMBER_OF_ICAO_CODES; i++) {
    // Each code is between 1 and 4 characters
    const codeLength = Math.floor((Math.random() * 4)) + 1;
    let icaoCode = '';
    for (let j=0; j < codeLength; j++) {
      // Pick a random ascii value between 65 and 90 [A-Z]
      const charCode = Math.floor((Math.random() * 25) + 65);
      icaoCode += String.fromCharCode(charCode);
    }
    possibleIcaoCodes.push(icaoCode);
  }

  // Generate and add x number of records to our report string
  for (let i=0; i < NUMBER_OF_REPORTS; i++) {
    // Pick an ICAO code
    let report = possibleIcaoCodes[Math.floor((Math.random() * NUMBER_OF_ICAO_CODES))];
    report += ' ';

    // Timestamp: DDHHMM + Z
    const day = (Math.floor(Math.random() * 30) + 1).toString();
    const hour = Math.floor(Math.random() * 23).toString();
    const minute = Math.floor(Math.random() * 59).toString();
    // minimum 2 characters
    if (day.length === 1) report += '0';
    report += day;
    if (hour.length === 1) report += '0';
    report += hour;
    if (minute.length === 1) report += '0';
    report += minute;
    report += 'Z ';

    // Wind Info
    const direction = Math.floor(Math.random() * 359).toString();
    // direction is always three characters
    if (direction.length === 1) {
      report += '00'; 
    } else if (direction.length === 2) { 
      report += '0';
    }
    report += direction;

    const speed = Math.floor(Math.random() * 120).toString();
    if (speed.length === 1) report += '0';
    report += speed;

    // Optional wind gusts - 1 in 5 chance
    if (Math.floor(Math.random() * 100) % 5 === 0) {
      report += 'G';
      const gust = Math.floor(Math.random() * 30).toString();
      if (gust.length === 1) report += '0';
      report += gust;
    }
    
    // Pick a unit, fifty-fifty if it's knots or m/s
    if (Math.floor(Math.random() * 100) % 2) {
      report += 'KT';
    } else {
      report += 'MPS';
    }

    // Add our finished report string to the array
    metarReports.push(report);
  }

  // Turn our array into one big string, each report separated by a new line
  const metarReportString = metarReports.join('\n');
  return metarReportString;
}

export default generateFakeData;