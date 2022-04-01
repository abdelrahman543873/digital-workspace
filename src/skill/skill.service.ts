import { Injectable } from '@nestjs/common';
import { CreateSkillInput } from './inputs/create-skill.input';
import { UpdateSkillInput } from './inputs/update-skill.input';
import { DeleteSkillInput } from './inputs/delete-skill.input';
import { Pagination } from '../shared/utils/pagination.input';
import { SkillRepository } from './skill.repository';

@Injectable()
export class SkillService {
  constructor(private skillRepository: SkillRepository) {}
  createSkill(input: CreateSkillInput) {
    return this.skillRepository.createSkill(input);
  }

  updateSkill(input: UpdateSkillInput) {
    return this.skillRepository.updateSkill(input);
  }

  deleteSkill(input: DeleteSkillInput) {
    return this.skillRepository.deleteSkill(input);
  }

  getSkillList(input: Pagination) {
    return this.skillRepository.getSkillsList(input);
  }
}
