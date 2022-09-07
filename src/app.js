import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import joi from 'joi';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
mongoClient.connect(() => {
    db = mongoClient.db('myWallet');
});

const app = express();
app.use(express.json());
app.use(cors());

const sign_upSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required()//.min(8)
});

const sign_inSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required()
});

app.post("/sign-up", async (req, res) => {
    const { name, email, password } = req.body;
    const validation = sign_upSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        console.log(validation.error.details.map(err => err.message))
        res.sendStatus(422);
        return;
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    await db.collection('users').insertOne({ name, email, password: passwordHash })

    res.sendStatus(201);
});

app.post("/sign-in", async (req, res) => {
    const { email, password } = req.body;
    const validation = sign_inSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        console.log(validation.error.details.map(err => err.message))
        res.sendStatus(422);
        return;
    }

    const user = await db.collection('users').findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = uuid();
        await db.collection("sessions").insertOne({
        userId: user._id,
        token
        })

        res.send(token);

    } else {
        res.sendStatus(401);
    }
});

app.get("/meus-dados", async (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if(!token) return res.sendStatus(401);

    try {
        const session = await db.collection("sessions").findOne({ token });
                
    if (!session) {
        return res.sendStatus(401);
    }

        const user = await db.collection("users").findOne({ 
            _id: session.userId 
        })

    if(user) {
            delete user.password;

            res.send(user);
    } else {
        res.sendStatus(401);
    }

    } catch (error) {
        console.log(error);
        res.sendStatus(500);  
    }
});

app.listen(5000, () => {
    console.log('Server is listening on port 5000.');
});