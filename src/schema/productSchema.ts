import Joi, { ObjectSchema } from "joi";

const createProductSchema: ObjectSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  category: Joi.string().required(),
  brand: Joi.string().required(),
});

export { createProductSchema };
