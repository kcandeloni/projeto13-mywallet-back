import joi from "joi";

const new_wallet = joi.object({
    wallet: joi.array().required(),
});

export default new_wallet;