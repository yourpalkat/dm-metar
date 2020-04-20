import * as reportParser from './reportParser';

it('splits raw report string into an array', () => {
  expect(reportParser.splitReports('YYZ 122201Z 12023MPS\nAA 010101Z 18020KT')).toEqual(['YYZ 122201Z 12023MPS', 'AA 010101Z 18020KT']);
});

it('parses a string into an object with values for day hour and minute', () => {
  expect(reportParser.parseTime('122201Z')).toEqual({ dayOfMonth: 12, hour: 22, minute: 1 });
  expect(reportParser.parseTime('010213Z')).toEqual({ dayOfMonth: 1, hour: 2, minute: 13 });
});

it('parses a string into an object with values for wind speed, direction and gusts', () => {
  expect(reportParser.parseWind('12023MPS')).toEqual({ speed: 23, direction: '120', gust: 0 });
  expect(reportParser.parseWind('00060KT')).toEqual({ speed: 30, direction: '000', gust: 0 });
  expect(reportParser.parseWind('18080G20KT')).toEqual({ speed: 40, direction: '180', gust: 10 });
  expect(reportParser.parseWind('04530G40MPS')).toEqual({ speed: 30, direction: '045', gust: 40 });
});

const testString1 = 'YYZ 122201Z 12023MPS';
const testObject1 = {
  icaoCode: 'YYZ',
  timestampDate: 12,
  timestampHour: 22,
  timestampMinute: 1,
  windSpeedInMps: 23,
  windDirection: '120',
  windGust: 0,
};
const testString2 = 'AA 010213Z 18020G12KT';
const testObject2 = {
  icaoCode: 'AA',
  timestampDate: 1,
  timestampHour: 2,
  timestampMinute: 13,
  windSpeedInMps: 10,
  windDirection: '180',
  windGust: 6,
};
const testString3 = 'P 311001Z 000120G30MPS';
const testObject3 = {
  icaoCode: 'P',
  timestampDate: 31,
  timestampHour: 10,
  timestampMinute: 1,
  windSpeedInMps: 120,
  windDirection: '000',
  windGust: 30,
};

it('turns an array of strings into an array of objects', () => {
  expect(reportParser.parseReports([ testString1, testString2 ])).toEqual([ testObject1, testObject2 ]);
  expect(reportParser.parseReports([ testString3 ])).toEqual([ testObject3 ]);
});