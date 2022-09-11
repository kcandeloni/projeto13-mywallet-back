import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import router from './routes/index.js';
import conection from './db/db.js';
import validaSign_up from './middlewares/sign_upValidationMiddleware.js';
import validaSign_in from './middlewares/sign_inValidationMiddleware.js';

let db = await conection();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/sign-up", validaSign_up,async (req, res) => {
    const { name, email, password} = res.locals.user;

    const passwordHash = bcrypt.hashSync(password, 10);

    await db.collection('users').insertOne({ name, email, password: passwordHash })

    res.sendStatus(201);
});

app.post("/sign-in", validaSign_in, async (req, res) => {
    const { email, password } = res.locals.user;

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
app.use(router);

app.listen(5000, () => {
    console.log('Server is listening on port 5000.');
});