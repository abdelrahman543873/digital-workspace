import { CommentService } from './comment.service';
import { Body, Controller, Post, UseGuards, Put, Delete } from '@nestjs/common';
import { PostCommentInput } from './inputs/post-comment.input';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../shared/guards/auth.guard';
import { ManageLikeCommentInput } from './inputs/manage-like-comment.input';
import { DeleteCommentInput } from './inputs/delete-comment.input';
import { ActiveUserGuard } from '../shared/guards/active-user.guard';
@UseGuards(ActiveUserGuard)
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

  @ApiTags('comment')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put('manageLike')
  async manageLikeComment(@Body() input: ManageLikeCommentInput) {
    return await this.commentService.manageLikeComment(input);
  }

  @ApiTags('comment')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete('delete')
  async deleteComment(@Body() input: DeleteCommentInput) {
    return await this.commentService.deleteComment(input);
  }
}
