/* eslint-disable @typescript-eslint/no-var-requires */
const NodeEnvironment = require('jest-environment-node');
const fileSystem = require('fs');
const pathSystem = require('path');

const globalConfigPathData = pathSystem.join(__dirname, 'globalConfig.json');

class MongoEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    const globalConfig = JSON.parse(
      fileSystem.readFileSync(globalConfigPathData, 'utf-8'),
    );
    this.global.__MONGO_URI__ = globalConfig.mongoUri;
    this.global.__MONGO_DB_NAME__ = globalConfig.mongoDBName;
    await super.setup();
  }

  async teardown() {
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}
module.exports = MongoEnvironment;
