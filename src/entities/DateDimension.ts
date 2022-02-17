import {Field, Int, ObjectType} from 'type-graphql';
import {
  endOfDay,
  getDayOfYear,
  getISODay,
  getISOWeek,
  getMonth,
  getYear,
  startOfDay,
} from 'date-fns';

@ObjectType({description: 'Details about an date', simpleResolvers: true})
export class DateDimension {
  @Field({description: 'The original date with time, example 2020-09-24T18:00:00.000Z.'})
    dateTime: Date;

  @Field({description: 'Date with time either at start or end of the day, example 2020-09-23T22:00:00.000Z.'})
  get date(): Date {
    if (this.setTimeToStartOfDay) {
      return startOfDay(this.dateTime);
    } else {
      return endOfDay(this.dateTime);
    }
  }

  @Field(() => Int, {description: 'ISO Week, example 39.'})
  get week(): number {
    return getISOWeek(this.dateTime);
  }

  @Field(() => Int, {description: 'Day of the ISO Week. 7 for Sunday, 1 for Monday, example 4.'})
  get dayOfWeek(): number {
    return getISODay(this.dateTime);
  }

  @Field(() => Int, {description: 'Day of the year, example 268.'})
  get dayOfYear(): number {
    return getDayOfYear(this.dateTime);
  }

  @Field(() => Int, {description: 'Month. 1 for January, 11 for December, example 8.'})
  get month(): number {
    return getMonth(this.dateTime);
  }

  @Field(() => Int, {description: 'Year, example 2020.'})
  get year(): number {
    return getYear(this.dateTime);
  }

  setTimeToStartOfDay = true;
}
