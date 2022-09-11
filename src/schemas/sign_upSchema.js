import joi from "joi";

const sign_upSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required()//.min(8)
});

export default sign_upSchema;