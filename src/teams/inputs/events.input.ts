import { IsDateString, IsOptional } from 'class-validator';

export class EventsInput {
  @IsOptional()
  @IsDateString()
  date?: string;
}
