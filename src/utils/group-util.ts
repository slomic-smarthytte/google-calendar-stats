import {BookingEvent} from '../types';

export function groupBy(events: BookingEvent[], key: string): BookingEvent[] {
  return events.reduce((storage, curr) => {
    if (Object.keys(storage).includes(curr[key])) return storage;

    storage[curr[key]] = events.filter((element) => element[key] === curr[key]);
    return storage;
  }, []);
}
