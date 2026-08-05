
import dotenv from 'dotenv';
dotenv.config();

import { MongoClient } from "mongodb";

// Connect to the database
async function connectDB() {
    let dsn = process.env.MONGODB_URI;

    // Uses a local database for testing
    if (process.env.NODE_ENV === "test") {
        dsn = `mongodb://localhost:27017/test`;
    }

    const client = await MongoClient.connect(dsn);
    const db = client.db();

    return {
        db: db,
        client: client
    };
}

// Get the collection object itself you want from the database
async function getCollection(collectionName) {
    const database = await connectDB();
    const collection = database.db.collection(collectionName);
    return {
        collection: collection,
        client: database.client
    };
}

// Fetches all documents or records from a collection.
async function getAll(collectionName) {
    try {
        const db = await getCollection(collectionName);
        const result = await db.collection.find({}).toArray();

        await db.client.close();
        return result;
    } catch (error) {
        console.error(`Error fetching data from collection "${collectionName}":`, error);
        throw new Error(`Failed to fetch data from collection "${collectionName}"`);
    }
}


// Fetches all documents and then performs a bulkWrite operation, logging the scooters before and after the update
async function updateAll(collectionName, operations) {
    try {
        // Retrieve the collection
        const { collection, client } = await getCollection(collectionName);

        // Perform the bulkWrite operations (e.g., update, delete, insert)
        const result = await collection.bulkWrite(operations);
        await client.close();

        return result;
    } catch (error) {
        console.error(`Error performing update on collection "${collectionName}":`, error);
        throw new Error(`Failed to perform update on collection "${collectionName}"`);
    }
}

async function dropAll(collectionName) {
    try {
        const { collection, client } = await getCollection(collectionName);

        const result = await collection.deleteMany({});

        await client.close();

        return result;
    } catch (error) {
        console.error('Failed to remove all from database:', error);
        throw new Error('Database removal failed: ' + error.message);
    }
}

// List all collections in the database
async function listCollections() {
    const database = await connectDB();
    try {
        const collections = await database.db.listCollections().toArray();
        console.log("Collections:", collections.map(collection => collection.name));
    } catch (err) {
        console.error("Error listing collections:", err);
    } finally {
        await database.client.close();
    }
}

async function countItems(collectionName) {
    try {
        const { collection, client } = await getCollection(collectionName);

        const count = await collection.countDocuments();

        await client.close();

        return count;
    } catch (error) {
        console.error('Error counting items:', error);
        throw new Error('Failed to count items');
    }
}

export default {
    connectDB, 
    getCollection,
    getAll,
    updateAll,
    dropAll,
    listCollections,
    countItems
}