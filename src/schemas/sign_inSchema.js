import joi from "joi";

const sign_inSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required()
});

export default sign_inSchema;