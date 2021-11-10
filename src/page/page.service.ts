import { Pagination } from './../shared/utils/pagination.input';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { RequestContext } from 'src/shared/request.interface';
import { CreatePageInput } from './inputs/create-page.input';
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

  async createPage(input: CreatePageInput) {
    return await this.pageRepository.createPage(
      this.request.currentUser._id,
      input,
    );
  }

  async getLikedPages(pagination: Pagination) {
    return await this.pageRepository.getLikedPages(
      this.request.currentUser._id,
      pagination,
    );
  }
}
