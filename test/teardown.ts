import mongoose from 'mongoose';
export default async function (): Promise<void> {
  await mongoose.disconnect();
  await global['__MONGOD__'].stop();
}
