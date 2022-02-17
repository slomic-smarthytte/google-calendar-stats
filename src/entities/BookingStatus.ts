import {registerEnumType} from 'type-graphql';

export enum BookingStatus {
  FINISHED = 'finished',
  RUNNING = 'running',
  UPCOMING = 'upcoming',
}

registerEnumType(BookingStatus, {
  name: 'BookingStatus',
  description: 'Booking status of the event',
});
