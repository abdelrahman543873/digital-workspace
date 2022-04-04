import { Injectable } from '@nestjs/common';
import { InterestRepository } from './interest.repository';
import { CreateInterestInput } from './inputs/create-interest.input';
import { UpdateInterestInput } from './inputs/update-interest.input';
import { DeleteInterestInput } from './inputs/delete-interest.input';
import { Pagination } from '../shared/utils/pagination.input';

@Injectable()
export class InterestService {
  constructor(private interestRepository: InterestRepository) {}
  createInterest(input: CreateInterestInput) {
    return this.interestRepository.createInterest(input);
  }

  updateInterest(input: UpdateInterestInput) {
    return this.interestRepository.updateInterest(input);
  }

  deleteInterest(input: DeleteInterestInput) {
    return this.interestRepository.deleteInterest(input);
  }

  getInterestsList(input: Pagination) {
    return this.interestRepository.getInterestsList(input);
  }
}
