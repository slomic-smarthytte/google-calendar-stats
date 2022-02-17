import {BookingEvent} from '../entities/BookingEvent';
import {BookingEventFilterByInput} from '../resolvers/types/BookingEventFilterByInput';
import {BookingStatus} from '../entities/BookingStatus';

export function filter(events: BookingEvent[], filterBy: BookingEventFilterByInput) {
  switch (filterBy.bookingStatus) {
    case BookingStatus.FINISHED:
      return events.filter((event) => event.bookingStatus == BookingStatus.FINISHED);
    case BookingStatus.RUNNING:
      return events.filter((event) => event.bookingStatus == BookingStatus.RUNNING);
    case BookingStatus.UPCOMING:
      return events.filter((event) => event.bookingStatus == BookingStatus.UPCOMING);
  }
}
