import conection from '../db/db.js'

let db = await conection();

async function unique_email (req, res, next) {
    const { email } = req.body;
	const validation = await db
        .collection('users')
        .findOne({ email: email });
    if (!!validation) {
        res.sendStatus(422);
        return;
    }
    
    next();
}

export default unique_email;