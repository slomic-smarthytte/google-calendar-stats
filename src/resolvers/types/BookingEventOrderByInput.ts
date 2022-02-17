import {Field, InputType, registerEnumType} from 'type-graphql';
import {OrderDirection} from './OrderDirection';

@InputType({description: 'Define how to order list of booking events'})
export class BookingEventOrderByInput {
  @Field(() => BookingEventOrderField)
    field: BookingEventOrderField;
  @Field(() => OrderDirection)
    direction: OrderDirection;
}

export enum BookingEventOrderField {
  CREATED = 'created',
  UPDATED = 'updated',
  SUMMARY = 'summary',
  START = 'start',
  END = 'end',
  OCCUPANCY = 'occupancy',
  CREATOR = 'creator',
}

registerEnumType(BookingEventOrderField, {
  name: 'BookingEventOrderField',
  description: 'Booking event field name to order by',
});
