import {Field, InputType} from 'type-graphql';
import {IsDate, Length} from 'class-validator';
import {BookingEvent} from '../../entities/BookingEvent';

@InputType()
export class AddBookingEventInput implements Partial<BookingEvent> {
  @Field()
  @Length(1, 255)
    summary: string;

  @Field()
  @IsDate()
    start: Date;

  @Field()
  @IsDate()
    end: Date;

  @Field()
    occupancy: number;

  @Field()
    creator: string;
}
