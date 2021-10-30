import { WIDGETS } from '../../app.const';
import { ArrayUnique, IsArray, IsIn } from 'class-validator';

export class AddFavWidgetInput {
  @IsArray()
  @ArrayUnique()
  @IsIn(WIDGETS, { each: true })
  widgets: string[];
}
