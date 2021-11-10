import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { RequestContext } from 'src/shared/request.interface';
import { ManageLikePageInput } from './inputs/manage-like-page.input';
import { PageRepository } from './page.repository';

@Injectable()
export class PageService {
  constructor(
    private pageRepository: PageRepository,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {}
  async manageLikePage(input: ManageLikePageInput) {
    return await this.pageRepository.manageLikePage(
      this.request.currentUser._id,
      input,
    );
  }
}
