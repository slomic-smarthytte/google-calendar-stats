import {Arg, Query, Resolver} from 'type-graphql';
import {BookingEvent} from '../entities/BookingEvent';
import {createBookingEventSamples} from '../testdata/booking-event-samples';
import {BookingEventOrderByInput, BookingEventOrderField} from './types/BookingEventOrderByInput';
import {order} from '../utils/order-util';
import {OrderDirection} from './types/OrderDirection';
import {BookingEventFilterByInput} from './types/BookingEventFilterByInput';
import {filter} from '../utils/filter-util';

@Resolver(() => BookingEvent)
export class BookingEventResolver {
  private readonly bookingEvents: BookingEvent[] = createBookingEventSamples();

  @Query(() => BookingEvent,
      {nullable: true, description: 'Get single booking event by id'})
  async event(@Arg('id') id: string): Promise<BookingEvent | undefined> {
    return this.bookingEvents.find((event) => event.id === id);
  }

  @Query(() => [BookingEvent],
      {description: 'Query list of booking events'})
  async events(
      @Arg(
          'orderBy',
          {
            nullable: true,
            defaultValue: {
              field: BookingEventOrderField.START,
              direction: OrderDirection.DESC,
            },
          },
      ) orderBy?:BookingEventOrderByInput,
      @Arg(
          'filterBy',
          {nullable: true},
      ) filterBy?:BookingEventFilterByInput,
  ) {
    let events: BookingEvent[] = this.bookingEvents;

    if (filterBy) {
      events = filter(events, filterBy);
    }

    if (orderBy) {
      return order(events, orderBy);
    } else {
      return events;
    }
  }
}
