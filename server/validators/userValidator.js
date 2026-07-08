import joi from "joi";

const userValidationSchema = joi.object({
  fullname: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

export default userValidationSchema;