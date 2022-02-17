import {Field, ID, Int, ObjectType} from 'type-graphql';
import {addDays, differenceInHours} from 'date-fns';
import {DateDimension} from './DateDimension';
import {BookingStatus} from './BookingStatus';

@ObjectType({description: 'The booking event model', simpleResolvers: true})
export class BookingEvent {
  @Field(() => ID)
    id: string;

  @Field()
    created: Date;

  @Field()
    updated: Date;

  @Field()
    summary: string;

  @Field({nullable: true})
    description?: string;

  @Field()
    creator: string;

  start: Date;
  end: Date;

  @Field(() => BookingStatus)
  get bookingStatus(): BookingStatus {
    if (this.isFinished()) {
      return BookingStatus.FINISHED;
    } else if (this.isRunning()) {
      return BookingStatus.RUNNING;
    } else if (this.isUpcoming()) {
      return BookingStatus.UPCOMING;
    }
  }

  @Field(() => DateDimension)
  get startDate(): DateDimension {
    const data: Partial<DateDimension> = {
      dateTime: this.start,
    };

    return Object.assign(new DateDimension(), data);
  }

  @Field(() => DateDimension)
  get endDate(): DateDimension {
    const data: Partial<DateDimension> = {
      dateTime: this.end,
      setTimeToStartOfDay: false,
    };

    return Object.assign(new DateDimension(), data);
  }

  @Field(() => [DateDimension], {description: 'List of dates between startDate and endDate.'})
  get occupancyDates(): DateDimension[] {
    const dates: DateDimension[] = [];

    for (let daysToAdd = 0; daysToAdd < this.occupancy; daysToAdd++) {

      const data: Partial<DateDimension> = {
        dateTime: addDays(this.startDate.date, daysToAdd),
        setTimeToStartOfDay: false,
      };

      const dateDimension = Object.assign(new DateDimension(), data);
      dates.push(dateDimension);
    }

    return dates;
  }

  /**
   * Calculates occupancy by days between start and end.
   * Example:
   * - start: new Date("2020-12-18T20:00:00+01:00")
   * - end: new Date("2020-12-30T15:00:00+01:00")
   * returns 13 days
   *
   * @return {number} difference in days
   */
  @Field(() => Int, {description: 'Number of days this event is occupying the cabin.'})
  get occupancy(): number {
    const diffInHours = differenceInHours(
        this.endDate.date,
        this.startDate.date,
        {roundingMethod: 'ceil'},
    );

    return Math.ceil(diffInHours / 24);
  }

  private isFinished(): boolean {
    const end = this.endDate.date;
    const now = new Date();
    return now > end;
  }

  private isRunning(): boolean {
    const end = this.endDate.date;
    const start = this.startDate.date;
    const now = new Date();
    return now >= start && now <= end;
  }

  private isUpcoming(): boolean {
    const start = this.startDate.date;
    const now = new Date();
    return now < start;
  }
}
