import { ObjectId } from 'mongoose';
import { userFactory } from '../user/user.factory';
import { Page } from './schema/page.schema';
import { PageRepo } from '../../test/page/page-test-repo';
import { name } from 'faker';

interface PageType {
  admin?: ObjectId;
  name?: string;
  likes?: ObjectId[];
  logo?: string;
}

export const buildPageParams = async (obj: PageType = {}): Promise<Page> => {
  const userId = (await userFactory())._id;
  return {
    name: obj.name || name.title(),
    admin: obj.admin || userId,
    likes: obj.likes || [userId],
    logo: obj.logo || `${process.env.HOST}/defaults/avatar.jpg`,
  };
};

export const pagesFactory = async (
  count = 10,
  obj: PageType = {},
): Promise<Page[]> => {
  const pages: Page[] = [];
  for (let i = 0; i < count; i++) {
    pages.push(await buildPageParams(obj));
  }
  return await PageRepo().addMany(pages);
};

export const pageFactory = async (obj: PageType = {}): Promise<Page> => {
  const params: Page = await buildPageParams(obj);
  return await PageRepo().add(params);
};
