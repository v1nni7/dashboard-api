import Joi, { ObjectSchema } from "joi";

const signUpSchema: ObjectSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.number().required(),
});

const signInSchema: ObjectSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export { signUpSchema, signInSchema };
