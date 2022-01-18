import { unlink } from 'fs';
import mongoose from 'mongoose';

export default async function (): Promise<void> {
  await global.app.close();
  await mongoose.disconnect();
  await global.__MONGOD__.stop();
  await unlink('globalConfig.json', () => {
    // removing global config file
  });
}
