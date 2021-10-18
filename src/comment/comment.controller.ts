import { CommentService } from './comment.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PostCommentInput } from './inputs/post-comment.input';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../shared/guards/auth.guard';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @ApiTags('comment')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('post')
  async postComment(@Body() input: PostCommentInput) {
    return await this.commentService.postComment(input);
  }
}
