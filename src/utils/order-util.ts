import {BookingEvent} from '../entities/BookingEvent';
import {
  BookingEventOrderByInput,
  BookingEventOrderField,
} from '../resolvers/types/BookingEventOrderByInput';
import {OrderDirection} from '../resolvers/types/OrderDirection';

export function order(events: BookingEvent[], orderBy: BookingEventOrderByInput) {
  return events.slice().sort((first, second) => {
    switch (orderBy.field) {
      case BookingEventOrderField.SUMMARY:
      case BookingEventOrderField.CREATOR:
        return compareStrings(first[orderBy.field] as string,
            second[orderBy.field] as string, orderBy.direction);
      case BookingEventOrderField.CREATED:
      case BookingEventOrderField.UPDATED:
      case BookingEventOrderField.START:
      case BookingEventOrderField.END:
        return compareDates(first[orderBy.field] as Date,
            second[orderBy.field] as Date, orderBy.direction);
      default:
        return compareNumbers(first[orderBy.field] as number,
            second[orderBy.field] as number, orderBy.direction);
    }
  },
  );
}

function compareStrings(first: string, second:string, direction: OrderDirection): number {
  return direction === OrderDirection.DESC ?
      second.localeCompare(first) : first.localeCompare(second);
}

function compareNumbers(first: number, second: number, direction: OrderDirection):
    number {
  return direction === OrderDirection.DESC ?
      second - first : first - second;
}

function compareDates(first: Date, second: Date, direction: OrderDirection):
    number {
  return direction === OrderDirection.DESC ?
      second.valueOf() - first.valueOf() : first.valueOf() - second.valueOf();
}
