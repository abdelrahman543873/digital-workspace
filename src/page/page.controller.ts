import { AuthGuard } from './../shared/guards/auth.guard';
import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ManageLikePageInput } from './inputs/manage-like-page.input';
import { PageService } from './page.service';

@Controller('page')
export class PageController {
  constructor(private pageService: PageService) {}

  @ApiBearerAuth()
  @ApiTags('page')
  @UseGuards(AuthGuard)
  @Put('manageLike')
  async manageLikePage(@Body() input: ManageLikePageInput) {
    return await this.pageService.manageLikePage(input);
  }
}
