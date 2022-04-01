import { SkillRepository } from '../../src/skill/skill.repository';

export const skillTestRepo = (): SkillRepository => global.skillRepository;
