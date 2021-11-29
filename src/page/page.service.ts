import { Pagination } from './../shared/utils/pagination.input';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { RequestContext } from 'src/shared/request.interface';
import { CreatePageInput } from './inputs/create-page.input';
import { ManageLikePageInput } from './inputs/manage-like-page.input';
import { PageRepository } from './page.repository';
import { LikedPagesInput } from './inputs/liked-pages.input';
import { DeletePageInput } from './inputs/delete-page.input';

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

  async createPage(input: CreatePageInput, logo: Express.Multer.File) {
    return await this.pageRepository.createPage(
      this.request.currentUser._id,
      input,
      logo,
    );
  }

  async getLikedPages(input: LikedPagesInput) {
    return await this.pageRepository.getLikedPages(
      this.request.currentUser._id,
      input,
    );
  }

  async getPages(pagination: Pagination) {
    return await this.pageRepository.getPages(pagination);
  }

  async deletePage(input: DeletePageInput) {
    return await this.pageRepository.deletePage(
      this.request.currentUser._id,
      input,
    );
  }
}
