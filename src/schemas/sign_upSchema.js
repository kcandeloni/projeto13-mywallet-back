import joi from "joi";

const sign_upSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(4).required()
});

export default sign_upSchema;