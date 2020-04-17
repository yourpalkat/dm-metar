import generateFakeData from './generateFakeData';
import * as reportParser from './reportParser';

export default function fetchNewReports() {
  const rawReportString = generateFakeData();
  const rawReportArray = reportParser.splitReports(rawReportString);
  const allParsedReports = reportParser.parseReports(rawReportArray);

  return allParsedReports;
}