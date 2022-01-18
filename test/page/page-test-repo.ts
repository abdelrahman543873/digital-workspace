import { PageRepository } from '../../src/page/page.repository';

export const PageRepo = (): PageRepository => global.pageRepository;
