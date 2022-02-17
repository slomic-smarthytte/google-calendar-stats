import {BookingEvent} from '../entities/BookingEvent';
import {add, sub} from 'date-fns';
import calendarEventList from './calendar-event-list.js';

export function createBookingEventSamples() : BookingEvent[] {
  const bookingEvents = calendarEventList.map((calendarEvent) => {
    return createBookingEvent({
      id: calendarEvent.id,
      created: new Date(calendarEvent.created),
      updated: new Date(calendarEvent.updated),
      summary: calendarEvent.summary,
      description: calendarEvent.description,
      start: new Date(calendarEvent.start.dateTime || calendarEvent.start.date),
      end: new Date(calendarEvent.end.dateTime || calendarEvent.end.date),
      creator: calendarEvent.creator.email,
    });
  });

  // Running
  bookingEvents.push(createBookingEvent({
    id: '_7or32d1g61330b9o8go34b9k6t2j8ba17123gba58d2j8d256gp4acpg7k',
    created: sub(new Date(), {days: 2}),
    updated: sub(new Date(), {days: 2}),
    summary: 'Ismar med familien',
    start: sub(new Date(), {days: 1}),
    end: add(new Date(), {days: 1}),
    creator: 'smarthytte@slomic.no',
  }),
  // Upcoming
  createBookingEvent({
    id: '_6or32d1g61330b9o8go34b9k6t2j8ba17123gba58d2j8d256gp4acpg6k',
    created: sub(new Date(), {days: 2}),
    updated: sub(new Date(), {days: 2}),
    summary: 'Ismar med familien',
    start: add(new Date(), {days: 7}),
    end: add(new Date(), {days: 9}),
    creator: 'smarthytte@slomic.no',
  }),
  );

  return bookingEvents;
}

function createBookingEvent(eventData: Partial<BookingEvent>) {
  return Object.assign(new BookingEvent(), eventData);
}
