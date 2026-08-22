import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod;

export const mochaHooks = {
    async beforeAll() {
        mongod = await MongoMemoryServer.create({ instance: { port: 27017 } });
    },
    async afterAll() {
        if (mongod) await mongod.stop();
    }
};
