import {Field, InputType, registerEnumType} from 'type-graphql';

@InputType({description: 'Define how to filter list of booking events'})
export class BookingEventFilterByInput {
  @Field(() => BookingStatus)
    bookingStatus: BookingStatus;
}

export enum BookingStatus {
  FINISHED = 'finished',
  RUNNING = 'running',
  UPCOMING = 'upcoming',
}

registerEnumType(BookingStatus, {
  name: 'FilterByBookingStatus',
  description: 'Booking statuses to filter by',
});
