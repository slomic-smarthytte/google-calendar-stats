import express from 'express';
import fs from 'fs';
import {BookingEvent} from './types';

const app = express();
const port = 3000;
const testDataFile = __dirname + '/testdata/data.json';
let testData: BookingEvent[] = [];

function readData() {
  try {
    const fileData = fs.readFileSync(testDataFile, 'utf8');
    testData = JSON.parse(fileData);
  } catch (err) {
    console.error(err);
  }
}

function groupBy(events: BookingEvent[], key: string): BookingEvent[] {
  return events.reduce((storage, curr) => {
    if (Object.keys(storage).includes(curr[key])) return storage;

    storage[curr[key]] = events.filter((element) => element[key] === curr[key]);
    return storage;
  }, []);
}

function filterBy(events: BookingEvent[], value: number): BookingEvent[] {
  return events.filter((event) => {
    const year = new Date(event.start).getFullYear();
    return year === value;
  });
}


readData();

app.get('/calendar/stats', (req, res) => {
  res.send(testData);
});

app.get('/calendar/stats/summary', (req, res) => {
  const yearFilter = req.query.year;
  let data = testData;

  if (yearFilter) {
    const yearAsInt = parseInt(yearFilter[0]);
    data = filterBy(data, yearAsInt);
  }

  const summary = groupBy(data, 'summary');

  res.send(summary);
});

app.listen(port, () => {
  console.log(`Started Google Calendar Stats at http://localhost:${port}`);
});
