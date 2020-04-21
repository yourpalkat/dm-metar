import processReports from './processReports';

const testInputArray = [
  {
    icaoCode: 'YYZ',
    timestampDate: 1,
    timestampHour: 10,
    timestampMinute: 15,
    windSpeedInMps: 10,
    windDirection: '090',
    windGust: 0,
  },
  {
    icaoCode: 'YYZ',
    timestampDate: 3,
    timestampHour: 14,
    timestampMinute: 30,
    windSpeedInMps: 10,
    windDirection: '240',
    windGust: 0,
  },
  {
    icaoCode: 'PDX',
    timestampDate: 4,
    timestampHour: 9,
    timestampMinute: 0,
    windSpeedInMps: 20,
    windDirection: '045',
    windGust: 10,
  },
  {
    icaoCode: 'YYZ',
    timestampDate: 2,
    timestampHour: 12,
    timestampMinute: 20,
    windSpeedInMps: 10,
    windDirection: '180',
    windGust: 20,
  },
];

const testOutputObject = {
  YYZ: {
    latestWindSpeed: 10,
    latestWindGust: 0,
    latestWindDirection: '240',
    latestTimeDate: 3,
    latestTimeHour: 14,
    latestTimeMinute: 30,
    averageWindSpeed: 10,
    sumWindspeed: 30,
    totalReports: 3,
  },
  PDX: {
    latestWindSpeed: 20,
    latestWindGust: 10,
    latestWindDirection: '045',
    latestTimeDate: 4,
    latestTimeHour: 9,
    latestTimeMinute: 0,
    averageWindSpeed: 20,
    sumWindspeed: 20,
    totalReports: 1,
  },
};

it('takes an array of objects and returns one object with one key per unique icao code', () => {
  expect(processReports(testInputArray)).toEqual(testOutputObject);
})