import sign_upSchema from '../schemas/sign_upSchema.js';

async function validaSign_up(req, res, next) {
	const validation = sign_upSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        console.log(validation.error.details.map(err => err.message))
        res.sendStatus(422);
        return;
    }
    
    next();
}

export default validaSign_up;