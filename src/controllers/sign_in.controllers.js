import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import conection from '../db/db.js';

let db = await conection();

async function login (req, res) {
    const { email, password } = req.body;

    const user = await db.collection('users').findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
        
        await db.collection('sessions').deleteOne({ userId: user._id })
        
        const token = uuid();
        await db.collection('sessions').insertOne({
        userId: user._id,
        token,
        dateLogin: Date.now(),
        })

        res.send(token);

    } else {
        res.sendStatus(401);
    }
}

export default login;