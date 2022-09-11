import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

export default async function conection () {
    let db;
    try {
        db = await mongoClient.db('myWallet');
        return db;
    } catch (error) {
        console.error(error)
        return error;    
    }
}