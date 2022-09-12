import bcrypt from 'bcrypt';
import conection from '../db/db.js';

let db = await conection();

async function createUser (req, res) {
    const { name, email, password} = req.body;

    const passwordHash = bcrypt.hashSync(password, 10);

    await db.collection('users').insertOne({ name, email, password: passwordHash })

    res.sendStatus(201);
}

export default createUser;