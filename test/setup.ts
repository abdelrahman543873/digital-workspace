import path from 'path';
import fs from 'fs';
import { MongoMemoryServer } from 'mongodb-memory-server';
const globalConfigPath = path.join(__dirname, 'globalConfig.json');

const mongod = new MongoMemoryServer({ binary: { version: '4.2.8' } });
module.exports = async (): Promise<void> => {
  await mongod.start();
  const mongoConfig = {
    mongoDBName: 'jest',
    mongoUri: await mongod.getUri(),
  };
  // Write global config to disk because all tests run in different contexts.
  fs.writeFileSync(globalConfigPath, JSON.stringify(mongoConfig));
  // Set reference to mongod in order to close the server during teardown.
  global['__MONGOD__'] = mongod;
};
