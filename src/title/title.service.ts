import { Injectable } from '@nestjs/common';
import { TitleRepository } from './title.repository';
import { CreateTitleInput } from './inputs/create-title.input';
import { UpdateTitleInput } from './inputs/update-title.input';
import { DeleteTitleInput } from './inputs/delete-title.input';
import { Pagination } from '../shared/utils/pagination.input';

@Injectable()
export class TitleService {
  constructor(private titleRepository: TitleRepository) {}
  createTitle(input: CreateTitleInput) {
    return this.titleRepository.createTitle(input);
  }

  updateTitle(input: UpdateTitleInput) {
    return this.titleRepository.updateTitle(input);
  }

  deleteTitle(input: DeleteTitleInput) {
    return this.titleRepository.deleteTitle(input);
  }

  getTitlesList(input: Pagination) {
    return this.titleRepository.getTitlesList(input);
  }
}
