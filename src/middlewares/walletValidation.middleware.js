import new_walletSchema from '../schemas/new_walletSchema.js';

async function validaWallet(req, res, next) {
	const validation = new_walletSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        console.log(validation.error.details.map(err => err.message))
        res.sendStatus(422);
        return;
    }

    next();
}

export default validaWallet;