import { moduleRef } from '../before-test-run';
import { PageRepository } from '../../src/page/page.repository';

export const PageRepo = async (): Promise<PageRepository> =>
  (await moduleRef()).get<PageRepository>(PageRepository);
