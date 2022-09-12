import sign_inSchema from '../schemas/sign_inSchema.js';

async function validaSign_in(req, res, next) {
	const validation = sign_inSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        console.log(validation.error.details.map(err => err.message))
        res.sendStatus(422);
        return;
    }
    
    next();
}

export default validaSign_in;