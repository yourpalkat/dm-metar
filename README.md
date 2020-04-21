# dm-metar-reports

## To run:
- download or clone this repo locally
- npm install to get dependencies (it's a standard create-react-app, nothing else added, nothing fancy)
- npm test to run test suite, if you like
- npm start to launch app at http://localhost:3000/

### Tech test for Weever Apps
A METAR report is a loose international semi-standard used by airports for reporting information about wind speeds, humidity, and weather conditions. We’re going to write a program that parses a subset of these reports from a stream and keeps some running aggregates.

### Requirements
At minimum we require an interface that lets us:

- parse a METAR format record as described above
  - the returned data structure should normalize speeds to MPS
  - you can normalize a speed value in KT by dividing the value by 2
- Read a stream of records, one per line
  - and keep a running average wind speed per airport seen
  - and the current wind speed of each airport seen

Write a script to generate a few hundred thousand random reports one per line. Your program should be able to read the entire stream without failure and be able to either:

- display the running tally
- print a final report after reading the entire stream


### Assumptions:
- Report stream is a single string, inside which individual reports are separated by a newline
- We recieve the report stream one string at a time, as though it's what is returned after hitting an API endpoint
- Data within each report is space-delimited (there is one space between each data point, eg 'YYZ 122201Z 12023MPS')
- Each of the three data points (Airport code, timestamp, wind info) are always present
- Timestamp provides day of month, hours and minutes suffixed with a Z; for date parsing purposes, assume the Z indicates Zulu time (ie, GMT) and that all records in stream are for the same month

### Steps:
- Break report stream into an array of individual report strings
- For each report string:
  - Break report string into three on the space (Airport code, Timestamp, Wind info)
  - Parse string and build an object for each record:
    ```{ 
      icaoCode: airport code string
      timestampDay/Hour/Minute: parse timestamp string into integers for day, hour, minute, based on assumptions above
      windSpeed: parse from Wind info string into an integer, normalize to MPS if it's in KT
      windDirection: parse from Wind info into a string
      windGust: parse from Wind info string into an integer, can be 0, normalize to MPS if it's in KT
    }```
  - Push object to allRecords array 
  - For each icao code in the allRecords array, check against an object of unique airports. If this icao code is not a key in that 'uniques' object, add a new key/value:
    ```icaoCode: {
      latestWindSpeed: parsed windspeed from record object above
      latestWindGust: from record object above
      latestWindDirection: from record object above
      latestTimestamp day/hour/minute: parsed time data from record object above
      averageWindSpeed: same as latestWindSpeed, since there's only one record
      sumWindspeed: same as latestWinsSpeed, since there's only one record
      totalReports: 1, since there's only one record
    }```
  - If the icao code IS a key in the uniques object, replace that record with this one:
    ```icaoCode: {
      latestWindSpeed: parsed windspeed from record object above IF new timestamp is more recent than latestTimestamp
      latestWindGust: windGust from record object above IF new timestamp is more recent than latestTimestamp
      latestWindDirection: windDirection from record object above IF new timestamp is more recent than latestTimestamp
      latestTimestamp day/hour/minute: parsed time data from record object above IF new timestamp is more recent than latestTimestamp
      averageWindSpeed: sumWindspeed  / totalReports
      sumWindspeed: sumWindspeed + latestWinsSpeed
      totalReports: totalReports ++
    }```
- Draw our display: 
  - Show total number of reports (allRecords.length)
  - For each record in unique airports object, display:
    Airport Code: latestWindSpeed (gusting to latestWindGust, if applicable) from latestWindDirection, as of latestTimestamp
    averageWindSpeed this month - number of reports: totalReports