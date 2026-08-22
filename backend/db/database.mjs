import { MongoClient } from 'mongodb';

let db = null;
let client = null;

// Connect to the database
async function connectDB() {
    if (db) {
        return {
            db: db,
            client: client
        };
    }

    let dsn = process.env.MONGODB_URI;

    // Uses a local database for testing
    if (process.env.NODE_ENV === 'test') {
        dsn = `mongodb://localhost:27017/test`;
    }

    client = await MongoClient.connect(dsn);
    db = client.db();

    const originalClose = client.close.bind(client);
    client.close = async (...args) => {
        db = null;
        client = null;
        return originalClose(...args);
    };

    console.log('Connected to the database');

    return {
        db: db,
        client: client
    };
}

// Get the collection you want from the database
async function getCollection(collectionName) {
    const database = await connectDB();
    const collection = database.db.collection(collectionName);
    // return database.collection(collectionName);
    return {
        collection: collection,
        client: database.client
    };
}

export default { connectDB, getCollection };
