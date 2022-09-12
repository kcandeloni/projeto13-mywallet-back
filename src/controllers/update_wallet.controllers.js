import conection from '../db/db.js';

let db = await conection();

async function update_wallet (req, res) {
    const user = res.locals.user;
    const wallet = req.body;
    try{
        await db.collection('users').updateOne({
            _id: user._id
        }, {
            $set: wallet
        });
  
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export default update_wallet;